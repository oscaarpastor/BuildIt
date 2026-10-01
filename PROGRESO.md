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
- `npm run test:api`: **64/64** pasan (65 tras el cierre). Cubren autenticación, límite de intentos, permisos entre usuarios, CRUD, validación, web pública, secciones ocultas, modo oscuro, exportación (también sin plantilla base), estadísticas, cabeceras, errores y CORS. [Ejecutado]
- Mutación de control: quitando el filtro por dueño, el test de permisos falla. Restaurado el código, vuelve a pasar. [Ejecutado]
- `npm run test:e2e`: **2/2** pasan, en dos ejecuciones seguidas. Recorren el flujo principal y el aislamiento entre dos usuarios. [Ejecutado]
- `npm run lint`: el frontend no tiene errores ni avisos y el backend compila (`tsc --noEmit`). [Ejecutado]

Pendiente por decisión tuya (no implementado):
- Formulario de contacto en las webs generadas.
- Subida de imágenes (hoy solo se pegan URLs).

## Cierre ✅

| Commit | Cambio |
|---|---|
| `docs: README...` | README en la raíz: requisitos, desarrollo, producción, tests, variables, Docker, estructura y API. `.env.example` actualizados en `backend/`, `frontend/` y la raíz |
| `fix(plantillas): no pintar imágenes rotas...` | Detectado en la prueba final: 15 `<img>` salían rotas con la URL vacía. Corregido, con test nuevo (65 en total) |

### Prueba final desde cero [Ejecutado]

Se repitió entera **después** del último arreglo, sobre un clon nuevo de la rama (`git clone -b arreglo-completo`) y con todas las bases de datos borradas. Se siguió el README paso a paso:

| Paso del README | Resultado |
|---|---|
| Requisitos | `node -v` muestra v24.21.0; `db.version()` muestra 8.0.32 |
| 1. `npm run install:all` | OK, 0 vulnerabilidades en backend, frontend y e2e |
| 2. `cp backend/.env.example backend/.env` + clave JWT | OK |
| 3. `npm run seed` | 6 plantillas |
| 4. `npm run dev:backend` / `npm run dev:frontend` | Backend en :3000 y Vite en :5173 |
| 5. Navegador con dos usuarios | Ver abajo |
| Producción: `npm run build` y `npm start` | Build completo; app y API en :3000 (production), login correcto |
| Tests: `npm test` | **65/65** API y **2/2** E2E |

Flujo con dos usuarios en http://localhost:5173:
1. **Laura** se registra desde la portada, crea un proyecto Portfolio y cambia la marca a "Laura Studio": autoguardado y vista previa sin imágenes rotas.
2. Laura exporta (200, contiene "Laura Studio"), abre su web pública (1 visita en la tarjeta) y cierra sesión desde Ajustes.
3. **Marcos** se registra y ve su lista vacía. Al abrir la URL del editor de Laura obtiene "Proyecto no encontrado".
4. Con su propio token contra la API, Marcos recibe 404 al **ver, editar, exportar y borrar** el proyecto de Laura. Intentar crear un proyecto indicando otro dueño da 400.
5. En MongoDB el proyecto de Laura sigue intacto (marca "Laura Studio", dueña Laura) y las dos contraseñas están cifradas con bcrypt.
6. Laura vuelve a entrar y ve su proyecto con sus estadísticas.

### Resumen de verificación

| Qué | Cómo | Etiqueta |
|---|---|---|
| Arranque en desarrollo y producción siguiendo el README | Clon limpio | [Ejecutado] |
| Seguridad: JWT, permisos, validación, cabeceras, límite de intentos, errores | 65 tests de API, `curl` y navegador | [Ejecutado] |
| Flujo completo y aislamiento entre usuarios | 2 tests E2E y prueba manual con dos usuarios | [Ejecutado] |
| Dependencias sin vulnerabilidades conocidas | `npm audit` en backend, frontend y e2e | [Ejecutado] |
| Docker (`docker compose up`) | Solo se reprodujo la etapa final de la imagen | [Suposición] que funciona entero; **no probado** |
| Modo oscuro en las 6 plantillas | Restaurante revisado a ojo; el resto, solo por tests (clase y colores aplicados) | [Ejecutado] parcialmente |

## Pendiente y por qué

| Pendiente | Motivo |
|---|---|
| Formulario de contacto y subida de imágenes | Indicaste no implementarlos |
| Probar `docker compose` | Docker no está instalado en este Mac |
| Rotar la contraseña de MongoDB Atlas | La cambias tú; sigue en el historial de git, que no se ha reescrito (decisión tuya) |
| Tailwind por CDN en las webs generadas | No estaba en el alcance. El navegador avisa de que no es para producción y el HTML exportado necesita internet |
| `ts-node-dev` sin mantenimiento (arrastra `glob@7`, marcado obsoleto) | Solo afecta al desarrollo. Cambiarlo por otra herramienta no se pidió |
| Accesibilidad: los `<label>` del editor no están asociados a sus campos | Detectado al escribir el E2E; son unas 50 etiquetas en 14 componentes |
| Mensajes de validación del servidor solo en español | En la interfaz en inglés, el detalle del campo erróneo aparece en español |
| Límite de intentos guardado en memoria | Se reinicia al reiniciar el servidor y no se comparte entre varias instancias. Basta en local |
| Las visitas del propio dueño cuentan en las estadísticas | Decisión de simplicidad |
| JWT en `localStorage` | Ver decisiones de la fase 2 |
| El hero de Restaurante ignora los colores del tema | Su degradado está fijado en la plantilla |
| Avisos de npm 11 sobre "install scripts" (`bcrypt`, `esbuild`, `fsevents`...) | Informativos: todo funciona porque usan binarios precompilados. Se podrían aprobar con `npm install-scripts approve` |

## Problemas nuevos encontrados durante el trabajo

Todos corregidos salvo los marcados como pendientes.

- Fondo sin definir: texto oscuro sobre fondo oscuro en navegadores en modo oscuro (fase 1, corregido).
- Startup: título blanco sobre blanco sin imagen de fondo (fase 1, corregido).
- El botón "Cerrar sesión" de Ajustes también enviaba el formulario (fase 2, corregido).
- `.section-card` sin estilo por un `@apply` mal colocado (fase 3, corregido).
- `sanitizeFilter` rompía el `$in` del listado (fase 3, corregido).
- Imágenes rotas con la URL vacía (cierre, corregido).
- `<label>` sin asociar en el editor (pendiente).

## Estado del entorno

- MongoDB 8 queda como servicio de Homebrew y arranca al iniciar sesión (`brew services list`).
- `backend/.env` existe en tu copia de trabajo con un `JWT_SECRET` aleatorio. Está ignorado por git.
- La base de datos `buildit` contiene los usuarios de la prueba final (Laura y Marcos). Para vaciarla: `npm run db:reset` y después `npm run seed`.
- `~/.zprofile` tiene dos líneas nuevas: el `shellenv` de Homebrew y Node 24 en el PATH.
- Rama `arreglo-completo`: 25 commits sobre `059db4c`, **sin push**.
