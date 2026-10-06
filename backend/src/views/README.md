# Plantillas de las webs generadas

Cada web de Build It es una sola página hecha de secciones apiladas. Una
plantilla decide **cómo se ven** esas secciones; el contenido lo escribe cada
persona en el editor. Esta guía explica cómo funcionan y el listón que tiene que
cumplir cualquier plantilla nueva.

## Cómo se pinta una web

```
Project/BaseTemplate.config ─▶ lib/render.ts ─▶ views/<view>.ejs ─▶ HTML de una pieza
                               (sanea, completa,    (dirección de arte de
                                resuelve tema,       la plantilla)
                                prepara ayudantes)
```

1. `render.ts` sanea el contenido (URLs inseguras fuera), lo completa con todos
   los campos (`lib/configShape.ts`), quita los elementos de lista vacíos y
   rellena las cabeceras de sección que falten con las de la plantilla.
2. Resuelve el tema: colores con **contraste automático** (`--on-primary`,
   `--primary-ink`…), letras de títulos y de texto, modo oscuro e idioma.
3. Pinta `views/<view>.ejs` con los ayudantes de abajo. El resultado es un HTML
   autónomo: CSS en línea, sin Tailwind ni frameworks, un único script pequeño
   (menú móvil) permitido por su hash en la CSP. Sirve igual para la vista previa,
   el enlace público y el HTML descargable.

Modos: `preview` (editor y miniaturas: sin estadísticas ni animación de entrada,
y los enlaces externos no navegan), `public` (enlace compartido, con
estadísticas) y `export` (descarga).

## Archivos de una plantilla

| Archivo | Qué contiene |
|---|---|
| `views/<view>.ejs` | Maquetación y CSS propio de la plantilla (en su `<style>`) |
| `templates/catalog/<nombre>.ts` | Definición: categoría, secciones en orden, nombres en es/en, textos fijos propios y contenido de ejemplo |
| `templates/index.ts` | Una línea por plantilla, en el orden de la galería |

El servidor copia el catálogo a MongoDB al arrancar (`templates/sync.ts`); `npm
run seed` hace lo mismo a mano. El contenido de ejemplo pasa por la misma
validación que el de los usuarios (`validation/schemas.ts`).

## Lo que recibe la vista

| Nombre | Qué es |
|---|---|
| `config` | Contenido completo y saneado. Todos los campos existen (texto vacío `""` o lista `[]`). |
| `theme` | `{ colorPrimary, colorSecondary, fontFamily, fontBody, darkMode, language }` ya validados |
| `lang` | `"es"` o `"en"`: idioma de los textos fijos |
| `mode`, `preview` | Modo de render; `preview` es `true` en editor y miniaturas |
| `htmlAttrs` | Atributos de `<html>` (idioma y clases `bi-dark`, `bi-preview`): `<html <%- htmlAttrs %>>` |
| `head` | Metas, título, favicon, fuentes y la hoja base. Va lo primero dentro de `<head>`. |
| `foot` | Botón de WhatsApp, script del menú y estadísticas. Va justo antes de `</body>`. |
| `madeWith` | Línea «Web creada con Build It» para el pie |
| `year` | Año actual |
| `copyright(nombre)` | «© 2026 Nombre. Todos los derechos reservados.» ya escapado, sin punto doble si el nombre acaba en punto (`<%- copyright(config.brand.name) %>`) |
| `show(key)` | `true` si la sección no está oculta **y tiene contenido**. Toda sección va dentro de `if (show("…"))`. |
| `heading(key)` | `{ eyebrow, title, subtitle }` de la cabecera de una sección. Lo vacío no se pinta. |
| `nav` | `[{ key, href, label }]` secciones visibles para el menú (sin portada, banner ni pie) |
| `navLinks({ limit, exclude, className })` | `<nav class="nav-links">` de escritorio con como mucho `limit` enlaces |
| `mobileMenu({ cta: { text, href, class } })` | Menú desplegable de móvil (`<details data-menu>`), con todos los enlaces |
| `sectionName(key)` | Nombre de la sección en esta plantilla y en el idioma de la web |
| `t(key)` | Texto fijo en el idioma de la web: los comunes (`lib/siteStrings.ts`) y los de `strings` de la plantilla |
| `icon(name, class)` | `<svg>` de la colección (`lib/siteIcons.ts`, trazos de Lucide). Si no es un nombre conocido (emoji de una web antigua), lo pinta como texto. |
| `img(src, alt, { class, sizes, eager, placeholder, width })` | `<img>` con `srcset` para Unsplash y carga diferida. **Sin URL devuelve un hueco decorado** (`.ph`) con la misma clase, así que nunca hay imágenes rotas. `eager: true` solo para lo que se ve al abrir; `placeholder: ""` deja el hueco sin icono (marcos decorativos). |
| `video(url, thumbnail, title)` | YouTube o Vimeo incrustado, `<video>` para .mp4/.webm, o enlace con portada |
| `paras(text, class)` | Texto largo en `<p>` (línea en blanco = párrafo, salto simple = `<br>`), ya escapado |
| `lines(text)` | Lista con una entrada por línea (ventajas de un plan, horario…) |
| `initials(name)` | Iniciales para avatares sin foto |
| `linkAttrs(href)` | `href="…"` seguro y, si sale de la web, `target="_blank" rel="noopener"`. Úsalo en **todos** los enlaces de contenido: `<a <%- linkAttrs(x) %>>` |
| `telHref`, `mailHref`, `mapsHref`, `waHref` | Enlaces `tel:`, `mailto:`, Google Maps y WhatsApp a partir del texto del contacto |
| `esc(x)` | Escapa texto para HTML (solo hace falta si construyes HTML en un ayudante propio) |

`<%= %>` escapa; `<%- %>` no. Usa `<%-` **solo** con `head`, `foot`, `madeWith`, `copyright()`,
`htmlAttrs` y lo que devuelvan los ayudantes (que ya escapan). Nunca con texto
de `config`.

### Contenido disponible

| Sección | Campos |
|---|---|
| `brand` | `name`, `logo` |
| `hero` | `eyebrow`, `title`, `subtitle`, `backgroundImage`, `ctaText`, `ctaLink`, `secondaryCtaText`, `secondaryCtaLink` |
| `about` | `heading` (título), `content` (varios párrafos), `image` |
| `features[]` | `icon` (nombre de icono), `title`, `description` |
| `products[]` | `title`, `description` (puede tener una ventaja por línea), `price`, `image`, `badge`, `link` |
| `gallery[]` | `image`, `caption` |
| `video` | `url`, `thumbnail` |
| `stats[]` | `value` («+250», «4,9», «15 años»), `label` |
| `steps[]` | `label` (opcional: hora, fechas…; si está vacía, numera la plantilla), `title`, `description` |
| `team[]` | `name`, `role`, `image` |
| `testimonials[]` | `name`, `role`, `quote`, `avatar` |
| `faqs[]` | `question`, `answer` |
| `cta` | `title`, `text`, `buttonText`, `buttonLink` |
| `contact` | `email`, `phone`, `address`, `hours` (una línea por tramo), `whatsapp` |
| `footer` | `text`, `links[]` (`label`, `url`) |
| `headings.<sección>` | `eyebrow`, `title`, `subtitle` para about (solo antetítulo y entradilla: el título es `about.heading`), features, products, gallery, video, stats, steps, team, testimonials, faqs y contact |

El antetítulo (`eyebrow`) también da nombre al enlace del menú si tiene 22
caracteres o menos.

## Base común (`partials/base.css`)

Va siempre antes del CSS de la plantilla. Aporta:

- **Tokens** que la plantilla redefine en su `:root` y en `html.bi-dark`:
  `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`, radios
  (`--radius-sm`, `--radius`, `--radius-lg`, `--radius-btn`), `--container`,
  `--gutter`, `--section-y`, `--header-h`, sombras y `--ease`.
- **Tema** (los pone el render): `--primary`, `--secondary`, `--on-primary` y
  `--on-secondary` (texto legible encima), `--primary-ink` y `--secondary-ink`
  (el color ajustado para leerse como texto sobre el fondo, también en modo
  oscuro), `--primary-on-light`, `--primary-on-dark`, `--font-heading`,
  `--font-body`, y tintes `--primary-soft`, `--primary-tint`, `--secondary-soft`.
- **Clases**: `.container`, `.section`, `.section-head(.center)`, `.eyebrow`,
  `.title`, `.lead`, `.prose`, `.auto-grid` (con `--min`), `.site-header`,
  `.nav`, `.brand`, `.nav-links`, `.nav-cta`, `.menu`/`.menu-panel`, `.btn`
  (`-primary`, `-secondary`, `-outline`, `-light`, `-ghost-light`, `-sm`,
  `-lg`), `.actions`, `.link-arrow`, `.icon`, `.cover`, `.ph`, `.avatar`,
  `.video-frame`, `.faq-item` (para `<details>`), `.checklist`, `.made-with`,
  `.sr-only`, `.skip-link`, y `.rise`, `.rise-2`, `.rise-3` (entrada suave de
  la portada, desactivada en la vista previa y con movimiento reducido).

Reglas de la cascada: la plantilla define sus colores en `:root { … }` y los
de modo oscuro en `html.bi-dark { … }`. Por debajo de 900 px la base oculta
`.nav-links` y `.nav-cta` y enseña `.menu`.

## Convenciones obligatorias

1. **Estructura**: `<!DOCTYPE html>`, `<html <%- htmlAttrs %>>`, `<%- head %>`
   primero en el `<head>` y después un único `<style>` propio; `<%- foot %>`
   antes de `</body>`. Enlace para saltar al contenido y `<main id="main">`.
2. **Secciones**: cada una en `if (show("clave"))` y con
   `id="clave" data-section="clave"` en su elemento raíz. La cabecera lleva
   `data-section="brand"`, el pie `id="footer" data-section="footer"`. El editor
   usa `data-section` para llevar la vista previa a la sección que se edita.
   El orden en la página es el de `sections` en la definición.
3. **Todo es opcional**: cualquier campo puede estar vacío y cualquier lista
   puede tener de 1 a 12 elementos (o más). Nada de huecos raros, columnas
   descolgadas ni separadores sueltos. Sin imagen, `img()` da un hueco
   decorado; si eso queda mal en algún sitio, la plantilla decide otra cosa
   (iniciales en vez de avatar, ocultar la miniatura de todos los elementos si
   ninguno tiene foto, etc.).
4. **Cabecera y menú**: `navLinks()` + `.nav-cta` en escritorio y
   `mobileMenu()` en móvil. Si la cabecera va encima de la portada (texto
   blanco), tiene que pasar a fondo normal cuando la portada esté oculta
   (`show("hero")` falso).
5. **Color**: `--primary` y `--secondary` los elige la persona y pueden ser
   cualquiera (amarillo claro, negro…). Texto sobre un fondo de color: siempre
   `--on-primary`/`--on-secondary`. Texto de color sobre el fondo: siempre
   `--primary-ink`/`--secondary-ink`. Fondos oscuros fijos de la plantilla:
   mezclas que sigan siendo oscuras pase lo que pase, por ejemplo
   `color-mix(in srgb, var(--secondary) 55%, #0c0b0a)`.
6. **Modo oscuro**: redefine los tokens en `html.bi-dark` y revisa cada
   sección; nada de colores de fondo claros escritos a mano que se queden
   blancos.
7. **Idioma**: ningún texto fijo en el HTML. Todo con `t("…")` (comunes o los
   `strings` de la plantilla, en es y en). Las etiquetas «Email», «Horario»,
   «Cómo llegar»… ya existen.
8. **Responsive** de 320 a 1920 px: sin desplazamiento horizontal, tipografía
   con `clamp()`, rejillas que se reorganizan (`auto-fit`/`minmax`), botones de
   al menos 44 px de alto en móvil, textos que hacen salto de línea
   (`overflow-wrap` ya va en la base; emails y URLs largas con
   `overflow-wrap: anywhere`).
9. **Accesibilidad**: un solo `<h1>` (el título de la portada), los demás en
   orden; `alt` con sentido (o vacío si es decorativa); contraste AA; foco
   visible (lo da la base); `<details>` para preguntas.
10. **Sin dependencias**: nada de CDNs, frameworks ni JavaScript propio. Solo
    CSS. Las fuentes las carga el render según el tema.

## Contenido de ejemplo

Es lo primero que ve alguien al elegir plantilla: tiene que parecer una web real.

- En **español de España**, concreto y creíble: nombres de negocio, barrios y
  ciudades reales, precios en euros con el formato español («19 €», «desde
  45 €»), teléfonos con forma española («912 00 00 00», «600 00 00 00»),
  emails en `.es`. Nada de «Bienvenidos a nuestra web», «Lorem ipsum» ni cifras
  redondas inventadas a lo grande.
- Rellena todas las secciones de la plantilla y **todas sus cabeceras** en
  `headings`. Antetítulos cortos (también son el texto del menú).
- Pie con «Aviso legal» y «Privacidad» (obligatorios en España por la LSSI) y,
  si encaja, redes.
- Fotos de Unsplash **gratuitas** con `https://images.unsplash.com/<id>?auto=format&fit=crop&q=75`.
  Búscalas y revísalas con `python3 backend/scripts/fotos-unsplash.py`
  (`buscar` y `hoja`): cada foto se mira antes de usarla y tiene que encajar
  con su texto (el plato con su nombre, la persona con su cargo…). Nunca
  `premium_photo-…`. Mismo tratamiento de color en toda la plantilla.
- Tema: `fontFamily` (títulos) y `fontBody` (texto) del catálogo de
  `lib/safe.ts`; colores con buen contraste.

## Revisar una plantilla

Con el backend en modo desarrollo, la ruta `/api/dev/preview/<view>?variant=…`
pinta la plantilla desde el código, sin base de datos. Las capturas:

```bash
node e2e/scripts/capturas-plantillas.mjs --out /tmp/capturas --views templateRestaurante \
  --widths 1440,768,390 --variants full,noimg,dark,en,min,long,colors,nohero,bare
```

Revisa cada hoja a ojo y el `informe.txt` (desbordamientos, imágenes rotas,
errores). Una plantilla está terminada cuando pasa **todas** las variantes en
los tres anchos y además:

- [ ] Tiene personalidad propia (tipografía, composición y ritmo de fondos) y
      no parece una plantilla genérica.
- [ ] La portada funciona con y sin foto, con título largo y con un solo botón.
- [ ] Ninguna lista se descuadra con 1, 2, 3, 4, 5 u 8 elementos.
- [ ] Modo oscuro completo, inglés completo, colores extremos legibles.
- [ ] Sin portada, la cabecera se ve bien.
- [ ] `npm run typecheck --prefix backend` y `npm test --prefix backend` pasan.
