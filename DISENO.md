# Rediseño de Build It

Plan de diseño de la interfaz, hecho con la skill `frontend-design` de Anthropic
(`.claude/skills/frontend-design`). Sirve de referencia para seguir
construyendo pantallas con el mismo criterio.

## El encargo

- **Qué es:** un creador de webs sin código. Eliges una plantilla, rellenas sus
  secciones y publicas la web con un enlace.
- **Para quién:** pequeños negocios, autónomos y estudiantes que quieren una web
  hoy, sin saber programar.
- **Trabajo principal de la interfaz:** llevar a alguien de cero a una web
  publicada, y que mientras edita sepa siempre qué parte de su web está tocando.

## La idea: una web se construye bloque a bloque

El logotipo ya lo dice: la «B» está hecha de piezas apiladas con una pequeña
junta entre ellas, unas en grafito y otras en azul. Una web de Build It es
exactamente eso, una pila de secciones (cabecera, portada, nosotros,
productos…, pie). El rediseño convierte esa pila en el elemento que se recuerda:

- **Bloque relleno** = sección construida y visible en la web.
- **Bloque hueco (borde discontinuo)** = sección oculta o hueco por llenar.
- **Bloque azul** = lo que tienes seleccionado ahora.

El mismo significado se usa en todas partes: la portada de bienvenida, la
columna de secciones del editor, el estado vacío de «Mis webs» y los botones de
«Añadir…» dentro de los formularios.

## Tokens

### Color

| Nombre | Hex | Uso |
| --- | --- | --- |
| Yeso | `#EDF0F3` | Fondo de la aplicación |
| Papel | `#FFFFFF` | Superficies de trabajo: formularios, campos |
| Grafito | `#252A32` | Texto principal y bloques construidos (la columna del logo) |
| Azul obra | `#2A5BD7` | Acciones y bloque seleccionado (la «B» del logo) |
| Andamio | `#5B6472` | Texto secundario |
| Junta | `#D2D8E0` | Bordes y separaciones |

Estados: rojo derribo `#B42318` para borrar y errores, verde `#1E7A4C` para
«Guardado».

### Tipografía

Una sola familia, **Archivo** (variable, autoalojada, ejes de anchura y peso).
La personalidad sale de la **anchura**:

- Titulares: Archivo **expandida** (`font-stretch: 125%`), peso 800, interlineado
  apretado. Recuerda a los rótulos de obra y al «BUILD IT» ancho del logo.
- Texto y controles: Archivo normal (100 %), 400 para lectura, 500–600 para
  etiquetas y botones.
- Escala (de *The Elements of Typographic Style*): 12 · 14 · 16 · 18 · 21 · 24 ·
  36 · 48 · 72 px. Cuerpo a 16/1.5, líneas de menos de 70 caracteres.
- Cifras tabulares en estadísticas y colores hexadecimales, sin monoespaciada.

### Forma

- Radio de 2 px en bloques (como las piezas del logo), 4 px en controles y 8 px
  en marcos de vista previa. Nada de radios grandes.
- Sin sombras ni degradados decorativos: la estructura la marcan las juntas
  (bordes de 1 px) y los huecos entre bloques.

## Maquetación

Todo alineado a la izquierda.

**Bienvenida**

```
[B] Build It                                        ES EN   Iniciar sesión
--------------------------------------------------------------------------
Tu web,                                  ┌───────────────────────────────┐
bloque a bloque.                         │ Cabecera                      │
                                         ├───────────────────────────────┤
Elige una plantilla, escribe tus textos  │ Portada                       │  ← la pila se monta
y publícala con un enlace. Sin código.   │                               │    al cargar (único
                                         ├───────────────────────────────┤    movimiento)
[Crear mi web]  Ya tengo cuenta          │ Productos                     │
                                         ├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
                                         ┆ Testimonios (oculta)          ┆
                                         ├───────────────────────────────┤
                                         │ Pie                           │
                                         └───────────────────────────────┘
--------------------------------------------------------------------------
Cómo funciona   1 Elige plantilla   2 Rellena las secciones   3 Publica
--------------------------------------------------------------------------
Plantillas      [miniatura real] [miniatura real] [miniatura real] …
```

**Editor** (la pantalla principal)

```
← Mis webs | Casa de Ana            ● Guardado      Ver web  Descargar HTML  Eliminar
---------------------------------------------------------------------------------------
Estilo de la web     │ Portada                          │ [Escritorio | Móvil]
                     │                                  │ ┌──────────────────────────┐
Secciones            │ Título principal                 │ │                          │
█ Cabecera           │ [_____________________________]  │ │   vista previa real,     │
█ Portada        👁  │ Subtítulo                        │ │   se desplaza sola a la  │
▓ Nosotros       👁  │ [_____________________________]  │ │   sección seleccionada   │
┆ Testimonios    ⊘   │ …                                │ │                          │
█ Contacto       👁  │                                  │ └──────────────────────────┘
```

La columna de secciones es la pila: un bloque por sección de la plantilla, en
el orden en el que aparecen en la web. Al pulsar un bloque se edita esa sección
y la vista previa salta a ella. El ojo la muestra u oculta en la web publicada.
En móvil, la pila pasa a ser una fila desplazable y la vista previa se abre con
una pestaña.

**Mis webs:** miniaturas reales de cada web en un marco sencillo, sin tarjetas
con sombra; debajo, nombre, visitas, clics y acciones.

## Principios

1. **La pila es la única extravagancia.** Todo lo demás es callado: fondos
   planos, juntas finas y tipografía.
2. **Estructura = información.** Relleno, hueco y azul significan siempre lo
   mismo. Solo se numeran cosas que son secuencia (los 3 pasos y el orden de
   los elementos de una lista).
3. **Un solo movimiento automático:** la pila de la bienvenida se monta al
   cargar. El resto del movimiento responde a lo que hace la persona (guardar,
   cambiar de sección) y se desactiva con `prefers-reduced-motion`.
4. **Palabras de usuario.** Se habla de «webs», no de «proyectos». Los botones
   dicen lo que pasa («Copiar enlace», «Descargar HTML»). Los errores dicen qué
   ha fallado y cómo arreglarlo.
5. **Suelo de calidad:** etiquetas visibles y asociadas a cada campo, foco de
   teclado visible, contraste AA, funciona desde 360 px de ancho.

## Revisión del plan frente a los tópicos

Antes de construir se comparó el plan con lo que saldría por defecto en
cualquier «creador de webs»:

- **Héroe con ilustración de stock y degradado.** Era lo que había. Se
  sustituye por la pila de secciones, que es literalmente cómo funciona el
  producto.
- **Tarjetas idénticas con sombra para plantillas y webs.** Se cambian por
  miniaturas reales de la plantilla o la web, sin sombra. Desaparecen los
  emojis y los degradados de las plantillas.
- **Paleta pizarra + azul de Tailwind.** El azul y el grafito vienen del logo,
  así que se quedan. Para que no parezca la paleta por defecto se ajustan a los
  tonos del logo y la identidad se apoya en la tipografía ancha y en la pila.
- **Etiquetas en mayúsculas, separadores con punto medio y flechas en
  botones.** Se eliminan: los datos se separan con espacio y jerarquía.
- **Banderas para el idioma.** Se sustituyen por «ES / EN» en texto: una
  bandera no es un idioma.
- **Fuentes.** Inter o Space Grotesk serían la opción por defecto. Se elige
  Archivo por su eje de anchura, que permite que el titular sea rótulo de obra
  sin añadir una segunda familia.
