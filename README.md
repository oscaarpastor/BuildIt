# Build It

Creador de páginas web sin código (TFG). Cada usuario se registra, elige una de las 17 plantillas y la personaliza en un editor con vista previa en directo (en escritorio y en móvil). Después puede compartirla con un enlace público, ver sus visitas y clics, o descargarla como un único archivo HTML que funciona por sí solo.

Las plantillas salen de un estudio de lo que más piden pequeños negocios, autónomos y estudiantes en España: Restaurante, Peluquería y estética, Reformas, Clínica, Portfolio, Startup y app, Inmobiliaria, Gimnasio y entrenador, Despacho profesional, Terapia y bienestar, Fotografía, Casa rural y alojamiento, Boda y evento, Academia y cursos, Agencia y consultoría, Tienda y Blog. Cada una tiene su propia dirección de arte, se adapta a cualquier pantalla, funciona en modo oscuro y en inglés, y aguanta cualquier contenido: sin fotos, con textos largos o con cualquier color de marca (el contraste del texto se calcula solo). Cómo están hechas y cómo añadir más: [backend/src/views/README.md](backend/src/views/README.md).

La interfaz sigue el plan de diseño de [DISENO.md](DISENO.md), hecho con la skill `frontend-design` de Anthropic (en `.claude/skills/`).

| Parte | Tecnología |
|---|---|
| `frontend/` | React 19 + TypeScript + Vite 6 + Tailwind 4, bilingüe (es/en) con i18next |
| `backend/` | Node 24 + Express 5 + Mongoose 8. API REST con JWT; genera las webs con plantillas EJS |
| Base de datos | MongoDB 8 |
| `e2e/` | Test de extremo a extremo con Playwright |

```
Navegador ──▶ Frontend (Vite :5173 en desarrollo) ──/api──▶ Backend Express (:3000) ──▶ MongoDB (:27017)
                                                            └─ en producción sirve también el frontend compilado
```

## Requisitos

- **Node.js 24** (LTS) y npm 11
- **MongoDB 8** en marcha en `localhost:27017`
- **Google Chrome**, solo para el test E2E

En macOS con [Homebrew](https://brew.sh):

```bash
brew install node@24
echo 'export PATH="/opt/homebrew/opt/node@24/bin:$PATH"' >> ~/.zprofile && source ~/.zprofile
brew tap mongodb/brew
brew install mongodb/brew/mongodb-community@8.0
brew services start mongodb/brew/mongodb-community@8.0
```

Homebrew 7 puede pedir que marques como confiable la tapa oficial de MongoDB. En ese caso ejecuta `brew trust mongodb/brew` y repite el `brew install`.

Comprueba las versiones con `node -v` (debe mostrar `v24.x`) y `mongosh --eval "db.version()"` (debe mostrar `8.0.x`).

## Puesta en marcha (desarrollo)

Ejecuta todos los comandos desde la raíz del repositorio.

1. **Instala las dependencias** de backend, frontend y e2e:

   ```bash
   npm run install:all
   ```

2. **Crea la configuración del backend** y genera una clave para los JWT:

   ```bash
   cp backend/.env.example backend/.env
   ```

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```

   Pega el resultado en `backend/.env`, en la línea `JWT_SECRET=`. Sin esa variable el backend no arranca.

3. **Carga las plantillas** en la base de datos. El servidor también lo hace solo cada vez que arranca; se puede repetir sin problema: actualiza las plantillas sin borrar nada.

   ```bash
   npm run seed
   ```

4. **Arranca los dos servidores**, cada uno en su propia terminal:

   ```bash
   npm run dev:backend
   ```

   ```bash
   npm run dev:frontend
   ```

5. Abre **http://localhost:5173**. Vite reenvía las llamadas `/api` al backend en `http://localhost:3000`.

## Producción (build y arranque)

```bash
npm run build
```

```bash
npm start
```

- `npm run build` compila el frontend, lo copia a `backend/public` y compila el backend a `backend/dist` junto con las plantillas `.ejs`.
- `npm start` ejecuta `node backend/dist/index.js` con `NODE_ENV=production`. La app completa queda en **http://localhost:3000**.
- Usa el mismo `backend/.env`. Si la base de datos de producción está vacía, carga las plantillas con `npm run seed:prod`.

## Tests

MongoDB tiene que estar en marcha. Los tests usan sus propias bases de datos (`buildit_test` y `buildit_e2e`) y no tocan `buildit`.

```bash
npm test
```

| Comando | Qué ejecuta |
|---|---|
| `npm run test:api` | 138 tests de la API (Vitest + Supertest): autenticación, permisos entre usuarios, CRUD de proyectos, validación, web pública, exportación, estadísticas, cabeceras de seguridad, IP del cliente detrás de un proxy y las 17 plantillas (contenido de ejemplo válido, todas las secciones en orden en cada variante y modo, textos escapados y contraste) |
| `npm run test:e2e` | Playwright: compila la app, la arranca en el puerto 3100 y recorre el flujo completo con dos usuarios en Google Chrome |
| `npm run lint` | ESLint del frontend y comprobación de tipos del backend |

Para revisar las plantillas a ojo, con el backend en marcha en desarrollo (`npm run dev:backend`), el script de capturas guarda hojas con cada plantilla recorrida de arriba abajo y un informe de problemas (desbordamientos, imágenes rotas, errores de consola):

```bash
cd e2e && node scripts/capturas-plantillas.mjs --out /tmp/capturas --widths 1440,768,390 --variants full,noimg,dark,long
```

Si no tienes Chrome, instala el Chromium de Playwright con `(cd e2e && npx playwright install chromium)` y lanza los tests con `PW_CHANNEL=chromium npm run test:e2e`.

## Variables de entorno

### `backend/.env`

Ver `backend/.env.example`.

| Variable | Obligatoria | Por defecto | Descripción |
|---|---|---|---|
| `JWT_SECRET` | **Sí** | — | Clave para firmar las sesiones, de al menos 32 caracteres aleatorios |
| `MONGODB_URI` | No | `mongodb://localhost:27017/buildit` | Conexión a MongoDB |
| `PORT` | No | `3000` | Puerto del backend |
| `NODE_ENV` | No | `development` | `npm start` lo fija a `production` |
| `JWT_EXPIRES_IN` | No | `7d` | Duración de la sesión |
| `CORS_ORIGINS` | No | vacío | Orígenes externos autorizados, separados por comas. Vacío = solo el mismo origen, que es lo normal |
| `AUTH_RATE_LIMIT_MAX` | No | `10` | Intentos de login y registro por IP en cada ventana |
| `AUTH_RATE_LIMIT_WINDOW_MS` | No | `900000` | Duración de esa ventana (15 minutos) |
| `TRUST_PROXY` | No | vacío | Proxies de confianza para leer la IP real de `X-Forwarded-For` (`trust proxy` de Express). Vacío o `false` = ninguno |

Detrás de un proxy inverso todas las peticiones llegan con la IP del proxy, así que los límites por IP tratarían a todos los usuarios como uno solo. En producción detrás de `cloudflared` pon en `TRUST_PROXY` la IP desde la que conecta el proxy, por ejemplo `TRUST_PROXY=10.10.10.1`. También admite `loopback`, varias IPs o subredes separadas por comas o un número de saltos (`1`). No uses `true`: confía en cualquier `X-Forwarded-For` y permite saltarse los límites.

### `frontend/.env` (opcional)

Ver `frontend/.env.example`.

| Variable | Por defecto | Descripción |
|---|---|---|
| `VITE_API_URL` | vacío | Solo hace falta si el frontend se sirve desde un dominio distinto al de la API |

### `.env` de la raíz

Solo lo usa Docker. Ver `.env.example`; necesita `JWT_SECRET`.

## Docker

```bash
cp .env.example .env
```

Rellena `JWT_SECRET` en ese `.env` y ejecuta:

```bash
docker compose up -d --build
```

```bash
docker compose run --rm app node dist/seed.js
```

Levanta MongoDB 8 y una única imagen con la API y el frontend en http://localhost:3000.

> **Sin probar:** se escribió en una máquina sin Docker. La etapa final de la imagen sí se reprodujo en local.

## Otros comandos

| Comando | Descripción |
|---|---|
| `npm run db:reset` | **Borra** la base de datos de `MONGODB_URI`. Después ejecuta `npm run seed` |
| `npm run seed:prod` | Seed usando el código compilado |

## Estructura

```
backend/
  src/
    app.ts            Express: seguridad (helmet/CSP, CORS), rutas y errores
    index.ts          Conexión a MongoDB y arranque
    config.ts         Variables de entorno
    controllers/      auth, user, project, baseTemplate, public
    middleware/       JWT (requireAuth) y manejo de errores
    models/           User, Project, BaseTemplate, Stat
    validation/       Esquemas zod de entrada
    lib/              safe.ts (URLs, colores y fuentes), render.ts (genera las webs), configShape.ts,
                      siteIcons.ts, siteStrings.ts y previewVariants.ts (variantes para revisar plantillas)
    templates/        Catálogo de plantillas: catalog/<plantilla>.ts (secciones, nombres y contenido
                      de ejemplo), index.ts (orden de la galería) y sync.ts (copia a MongoDB)
    views/            Vistas EJS de cada plantilla, partials/base.css (base común) y README.md (guía)
    routes/dev.ts     Solo en desarrollo: pinta cualquier plantilla desde el código con variantes
    seed.ts           Carga el catálogo en la base de datos
  scripts/            fotos-unsplash.py (buscar y revisar fotos para el contenido de ejemplo)
  tests/              Tests de la API
frontend/
  src/
    lib/api.ts        Único punto de acceso a la API
    lib/templates.ts  Categorías, secciones y nombres de las plantillas (vienen de la API)
    lib/siteIcons.ts  Iconos de las webs (copia de la del backend) y lib/fonts.ts (letras permitidas)
    context/          Sesión (AuthProvider, useAuth)
    pages/            Pantallas
    components/       editor/ (pila de secciones y formularios), layout/ y ui/
    index.css         Tokens de diseño: colores, escala tipográfica, fuente Archivo
  public/locales/     Traducciones es/en
e2e/                  Test de extremo a extremo (Playwright) y scripts/capturas-plantillas.mjs
                      (capturas de cada plantilla en varios anchos y variantes, con informe)
scripts/              copy-frontend.mjs (paso del build de producción)
.claude/skills/       Skill frontend-design de Anthropic
DISENO.md             Plan de diseño de la interfaz
```

## API

| Método y ruta | Acceso |
|---|---|
| `POST /api/auth/register` · `POST /api/auth/login` | Público, con límite de intentos |
| `GET /api/auth/me` · `PUT /api/users/me` | Usuario autenticado |
| `GET/POST /api/projects` · `GET/PUT/DELETE /api/projects/:id` · `GET /api/projects/:id/export` | Solo el dueño del proyecto |
| `GET /api/base-templates` · `GET /api/base-templates/:id/preview` | Público, solo lectura |
| `GET /api/public/sites/:publicId` · `POST /api/public/sites/:publicId/events` | Público: web compartida y estadísticas |
| `GET /api/dev/templates` · `GET /api/dev/preview/:view?variant=…` | Solo en desarrollo: revisar plantillas sin base de datos |

## Mejoras pendientes

- Formulario de contacto en las webs generadas.
- Subida de imágenes (hoy solo se pegan URLs).
- Formulario de reserva o presupuesto propio (hoy los botones enlazan a WhatsApp, teléfono, email o servicios externos).
- Asociar las etiquetas `<label>` de los formularios del editor con sus campos (accesibilidad).
- Guardar la sesión en una cookie `httpOnly` en lugar de `localStorage`.
