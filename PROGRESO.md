# Progreso del arreglo de Build It

Rama: `arreglo-completo` (sin push). Etiquetas: **[Ejecutado]** comprobado ejecutándolo · **[Código]** visto en el código, sin ejecutar · **[Suposición]** deducción no verificada.

## Entorno instalado (1-oct-2026)

| Herramienta | Versión | Cómo |
|---|---|---|
| Homebrew | 7.0.7 | Instalador oficial (lo ejecutaste tú por la contraseña de administrador) |
| Node.js / npm | 24.21.0 / 11.19.0 | `brew install node@24`; PATH en `~/.zprofile` |
| MongoDB | 8.0.32 | `brew install mongodb/brew/mongodb-community@8.0`, servicio con `brew services` (arranca al iniciar sesión) |

Notas:
- Homebrew 7 exige marcar como confiables las tapas de terceros: se ejecutó `brew trust mongodb/brew` (tapa oficial de MongoDB).
- `mongosh` instala de paso Node 26 como dependencia de Homebrew; `node` sigue resolviendo a la 24 porque `node@24` va primero en el PATH. [Ejecutado]

## Fase 1: que arranque ✅

| Commit | Cambio |
|---|---|
| `docs: añade diagnóstico inicial` | `DIAGNOSTICO.md` |
| `chore: deja de versionar backend/node_modules` | Adelantado de la fase 2: `npm ci` reescribe la carpeta entera y ensuciaba cada diff |
| `fix(backend): ruta comodín compatible con Express 5 (E1)` | `"*"` → `"/{*splat}"` |
| `fix(backend): ruta de importación y tipos en seed.ts (E2)` | `../models` → `./models` |
| `fix(frontend): proxy /api hacia el backend en desarrollo (E4)` | Proxy de Vite a `localhost:3000`; se quita `allowedHosts: true` |
| `fix: crear proyectos usando las plantillas de la API (E3)` | Plantillas desde `/api/base-templates`, `icon`/`gradient` en el modelo, vista previa real, 400 ante ids no válidos, control de `res.ok` |

Pruebas:
- `npm ci` en backend y frontend; `tsc` del backend sin errores; `npm run build` y `npm run lint` del frontend sin errores. [Ejecutado]
- `npm run seed` carga las 6 plantillas en el MongoDB local. [Ejecutado]
- En el navegador, con `npm run dev` en ambos (5173 + 3000): registro, galería de plantillas desde la API, vista previa de plantilla, crear proyecto (`POST` 201), editor, autoguardado (`PUT` 200 y dato persistido), exportar HTML, vista pública, cerrar sesión e iniciar sesión. [Ejecutado]

Problemas nuevos detectados (se tratan en fases posteriores):
- La app no fija color de fondo: en un navegador en modo oscuro, algunas páginas salen con texto oscuro sobre fondo oscuro. [Ejecutado]
- Plantilla Startup: el título del hero es blanco sobre fondo claro cuando no hay imagen de fondo. [Ejecutado]

## Fase 2: seguridad y robustez ✅

| Commit | Cambio |
|---|---|
| `chore(deps): parches de seguridad...` | `npm update` + `npm audit fix` sin saltos de versión mayor: **0 vulnerabilidades** en backend (antes 8) y frontend (antes 26). Fuera `eta`, `ejs`/`react-intl` del frontend y tipos sin uso |
| `feat(backend)!: autenticación JWT...` | JWT, permisos por dueño, validación zod, URLs/colores/fuentes seguras, login genérico con tiempo constante, límite de intentos, helmet/CSP, CORS por `CORS_ORIGINS`, errores sin detalles, `publicId` aleatorio para compartir, API de plantillas de solo lectura, exportación con la vista del proyecto (E5a) |
| `build(backend): producción con JS compilado...` | `npm run build` copia las `.ejs` a `dist/views`; `npm start` = `node dist/index.js` (E5b); seed idempotente |
| `fix(frontend): fondo explícito...` | Arregla texto oscuro sobre fondo oscuro |
| `feat(frontend): API centralizada...` | `src/lib/api.ts` único punto de acceso; JWT; control de errores en todas las llamadas; cierre de sesión de Ajustes; cambio de contraseña; i18n completo; se elimina `axios` |
| `chore: .gitignore en la raíz...` | Fuera de git `.DS_Store` y `frontend/.env`; `frontend/.env.example` |
| `build: build de producción automatizado...` | `npm run build` / `npm start` en la raíz |
| `build(docker): imagen multietapa...` | Dockerfile en la raíz, `mongo:8.0`, frontend incluido, sin montar carpetas del Mac |

API resultante:

| Método y ruta | Acceso |
|---|---|
| `POST /api/auth/register`, `POST /api/auth/login` | Público, con límite de intentos |
| `GET /api/auth/me`, `PUT /api/users/me` | Usuario autenticado (solo su cuenta) |
| `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`, `GET /api/projects/:id/export` | Solo el dueño |
| `GET /api/base-templates`, `GET /api/base-templates/:id/preview` | Público, solo lectura |
| `GET /api/public/sites/:publicId` | Público por enlace (id aleatorio de 16 caracteres) |

Pruebas:
- [Ejecutado] Con `curl`/Python contra la API:
  - Registro válido, duplicado (409) e inválido (400 con detalle).
  - Login correcto, incorrecto y con email inexistente: mismo mensaje y mismo 401.
  - Inyección NoSQL en el login rechazada (400).
  - Token ausente, falso o con el id antiguo: 401.
  - Respuestas sin `password`.
  - Usuario B no puede ver, editar, borrar ni exportar el proyecto de A (404).
  - No se puede cambiar el dueño (400).
  - `javascript:` (también en mayúsculas), `data:`, CSS en URLs y colores, y fuentes fuera de la lista: rechazados (400). Enlaces `https`, `#ancla` y `mailto:` aceptados.
  - Datos maliciosos metidos a mano en MongoDB no llegan al HTML.
  - Límite de intentos: 429 tras 10 intentos.
  - JSON malformado: 400 sin detalles.
  - Cabeceras CSP, `X-Frame-Options` y `nosniff` presentes; sin `X-Powered-By`.
- [Ejecutado] En el navegador (modo desarrollo):
  - Portada con la descripción ya traducida.
  - Registro, crear proyecto, editor, error de validación visible y recuperación.
  - Autoguardado, exportación (200 con token y 401 sin él).
  - Cambio de contraseña con la actual incorrecta (error) y correcta (OK).
  - Cerrar sesión desde Ajustes, ruta privada que redirige a `/login`, login con la contraseña antigua rechazado y con la nueva aceptado.
- [Ejecutado] Modo producción (`npm run build` + `npm start`): app, editor y vistas previas sin violaciones de CSP.
- [Ejecutado] Linter del frontend sin errores ni avisos; todas las claves i18n usadas existen en `es` y `en`.
- [Ejecutado parcialmente] Docker: la etapa final de la imagen se reprodujo en local con `npm ci --omit=dev` y arranca. [Suposición] `docker compose up` funciona; **no se ha podido probar** porque Docker no está instalado.

Decisiones tomadas por mi cuenta:
- Se adelantó a la fase 1 dejar de versionar `backend/node_modules`.
- Contraseña mínima de 8 caracteres (antes 6) y máxima de 72 (límite de bcrypt).
- Las webs son públicas para quien tenga el enlace, como antes, pero el enlace usa un id aleatorio en lugar del `_id` de MongoDB, que es parcialmente predecible.
- El JWT se guarda en `localStorage`. Es habitual, pero un XSS en la app podría leerlo; la CSP estricta de la app reduce ese riesgo. La alternativa (cookie `httpOnly` + protección CSRF) queda como mejora.

## Fase 3: funciones a medias y tests ✅

| Commit | Cambio |
|---|---|
| `refactor: elimina código muerto...` | Fuera `tailwind.config.js`, `template.ejs`, la casilla del formulario de contacto (`contact.formEnabled`) y `BaseTemplate.previewImage` |
| `feat: ocultar secciones, modo oscuro y estadísticas...` | Ver detalle abajo |
| `fix(i18n): plurales en visitas y clics` | "1 visita" / "2 visitas" |
| `test(backend): 64 tests de API...` | Vitest + Supertest contra `buildit_test` |
| `test(e2e): flujo principal y aislamiento...` | Playwright contra el build de producción y `buildit_e2e` |

Funciones terminadas:
- **Ocultar secciones**: se guardan en el proyecto (`hiddenSections`) y desaparecen de la web generada, con sus enlaces del menú, en vista previa, enlace público y exportación. La marca no es ocultable porque va en la cabecera. [Ejecutado]
- **Modo oscuro**: interruptor en Tema. Un único render aplica los mismos colores en editor, enlace público y exportación, con una hoja de estilos que oscurece las clases claras de las plantillas. Revisado visualmente en Restaurante; en las demás plantillas solo por tests. [Ejecutado]
- **Estadísticas**: la web pública registra la visita al cargarse y cada clic en un enlace; las miniaturas, la vista previa y la exportación no cuentan. Visitas, clics y última visita aparecen en cada tarjeta. [Ejecutado]

Problemas nuevos encontrados y corregidos en esta fase:
- `.section-card` de Startup nunca tuvo estilo: el `@apply` estaba en un `<style>` normal, que el CDN de Tailwind no procesa. [Ejecutado]
- Con `sanitizeFilter` (protección anti-inyección de la fase 2), un `$in` propio rompía el listado de proyectos (500). Se marca con `mongoose.trusted`. [Ejecutado]
- La sección "Programa" aparecía como no vacía en Restaurante por sus objetos anidados. [Ejecutado]

Tests:
- `npm run test:api`: **64/64** pasan. Cubren autenticación, límite de intentos, permisos entre usuarios, CRUD, validación, web pública, secciones ocultas, modo oscuro, exportación (también sin plantilla base), estadísticas, cabeceras, errores y CORS. [Ejecutado]
- Mutación de control: quitando el filtro por dueño, el test de permisos falla. Restaurado el código, vuelve a pasar. [Ejecutado]
- `npm run test:e2e`: **2/2** pasan, en dos ejecuciones seguidas. Recorren el flujo principal y el aislamiento entre dos usuarios. [Ejecutado]
- `npm run lint`: el frontend no tiene errores ni avisos y el backend compila (`tsc --noEmit`). [Ejecutado]

Pendiente por decisión tuya (no implementado):
- Formulario de contacto en las webs generadas.
- Subida de imágenes (hoy solo se pegan URLs).
