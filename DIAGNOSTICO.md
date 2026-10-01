# Diagnóstico de Build It

**Fecha:** 1 de octubre de 2026
**Alcance:** solo investigación. No se ha modificado, borrado ni subido nada del proyecto. Todas las pruebas se hicieron sobre una **copia** en una carpeta temporal. Node y MongoDB se usaron en versión portátil, sin instalarlos en el sistema.

**Cómo leer las etiquetas de evidencia**

| Etiqueta | Significado |
|---|---|
| **[Ejecutado]** | Lo he reproducido: comando, petición a la API o navegador |
| **[Código]** | Lo he visto leyendo el código, pero no lo he ejecutado |
| **[Suposición]** | Es una deducción razonable que no he podido verificar |

---

## 1. Resumen

**Qué es.** Build It es un creador de páginas web sin código, hecho como TFG. La presentación del TFG está en `Buildit.pdf` (12 diapositivas). El flujo para el usuario es:

1. Se registra.
2. Elige una de 6 plantillas: Startup/SaaS, Portfolio, Tienda, Agencia, Blog o Restaurante.
3. Edita los textos, colores e imágenes en un editor de formularios con vista previa en directo y autoguardado.
4. Comparte un enlace público o descarga la web como un archivo HTML.

**Cómo está construida.** Tiene tres piezas:
- **Frontend:** una aplicación React que se ejecuta en el navegador.
- **Backend:** una API en Node/Express que guarda los datos y genera el HTML de cada web a partir de plantillas EJS.
- **Base de datos:** MongoDB.

**Veredicto:**
- **Hoy no arranca, por dos motivos que se suman:**
  1. A este ordenador le faltan todas las herramientas: no hay Node, npm, MongoDB, Docker ni Homebrew.
  2. El último commit (`059db4c`, 10-sep-2026) introdujo **tres errores**. Uno tumba el backend al arrancar, otro rompe la carga de plantillas y otro impide crear proyectos. El commit anterior, `846cead`, todavía no los tenía.
- **Los arreglos para que arranque son pequeños.** Con 3 cambios de una línea y un ajuste en la creación de proyectos, en la copia de prueba la app funcionó de punta a punta **[Ejecutado]**.
- **La seguridad es el problema de fondo:**
  - No hay autenticación real.
  - La API expone los hashes de las contraseñas.
  - Hay una contraseña de MongoDB Atlas en el historial de un repositorio **público** de GitHub.

> **Contexto que conviene saber.** El último commit (`059db4c`) está firmado por `PPaspel <pablo.pastorpellicer@gmail.com>`. Esa es también la identidad de git configurada en **este** ordenador, y ese commit ya está subido a GitHub. Todos los demás commits son de Oscar Pastor.

---

## 2. Estructura y cómo se conectan las piezas

```
                       ┌──────────────────────────────┐
  Navegador ──────────▶│ Frontend React (Vite)        │  desarrollo: http://localhost:5173
      │                │ frontend/                    │
      │  llamadas /api └──────────────────────────────┘
      ▼
  ┌──────────────────────────────────────────┐        ┌─────────────────────┐
  │ Backend Express  (puerto 3000)           │───────▶│ MongoDB (27017)     │
  │ backend/                                 │        │ base de datos       │
  │  · API REST  /api/...                    │        │ "buildit"           │
  │  · Genera el HTML de cada web (EJS)      │        └─────────────────────┘
  │  · Modo "producción": sirve también el   │
  │    frontend compilado desde backend/public│
  └──────────────────────────────────────────┘
```

| Carpeta / archivo | Qué es |
|---|---|
| `frontend/` | App React 19 + TypeScript + Vite 6 + Tailwind 4, bilingüe (es/en) con i18next |
| `frontend/src/pages/` | Pantallas: portada, login, registro, mis proyectos, nueva web, editor, ajustes, vista pública |
| `frontend/src/components/editors/` | 15 formularios del editor: tema, marca, hero, nosotros, características, productos, galería, vídeo, testimonios, documentación, FAQ, inspiración, programa, contacto y pie |
| `frontend/src/data/templates.ts` | Las 6 plantillas, **definidas también aquí** (duplicadas respecto al backend) |
| `frontend/public/locales/` | Traducciones `es.json` y `en.json` |
| `backend/src/index.ts` | Arranque del servidor, CORS, rutas y conexión a MongoDB |
| `backend/src/models/` | Modelos de datos: `User`, `Project`, `BaseTemplate` (plantilla) y `Stat` (estadísticas) |
| `backend/src/controllers/`, `routes/` | Lógica de la API: usuarios, proyectos, plantillas, estadísticas y exportación |
| `backend/src/views/*.ejs` | 7 plantillas HTML: las 6 del seed más una genérica antigua (`template.ejs`) |
| `backend/src/seed.ts` | Script que carga las 6 plantillas en la base de datos |
| `backend/node_modules/` | Dependencias del backend **subidas a git**: 2.842 archivos, 51 MB |
| `docker-compose.yml`, `backend/Dockerfile` | Levantan MongoDB 6 y el backend. **No incluyen el frontend** |
| `Buildit.pdf` | Presentación del TFG |

No hay README en la raíz. El de `frontend/` es el texto por defecto de la plantilla de Vite. Tampoco hay tests: el script `npm test` solo imprime un error.

---

## 3. Stack y versiones

### Herramientas del sistema

| Herramienta | Qué usa el proyecto | Instalado en este Mac | Actual (oct-2026) | Comentario |
|---|---|---|---|---|
| Node.js | `node:24` en el Dockerfile | **No instalado** [Ejecutado] | 24.21.0 LTS (también existe 26.10) | Para las pruebas usé Node 24.21.0 portátil. Es la versión recomendada |
| npm | — | **No instalado** | 11.19 (con Node 24); 12.2 la más reciente | npm 11 ya no ejecuta por defecto los scripts de instalación (avisa). No afectó a nada |
| MongoDB | `mongo:6` en docker-compose | **No instalado** | 8.0.32 / 9.0.2 | MongoDB 6.0 está fuera de soporte. Para las pruebas usé 8.0.32 portátil sin problemas |
| Docker | docker-compose | **No instalado** | — | Sin Docker no he podido probar `docker-compose` |
| Homebrew | — | **No instalado** | — | — |
| Git | — | 2.50.1 | — | OK |
| Python | no se usa | 3.9.6 | — | — |
| Sistema | — | macOS 26.6.2, Apple Silicon (arm64) | — | `bcrypt` trae binario para arm64 y funciona [Ejecutado] |

### Librerías principales

La columna "Recomendada" es la última versión compatible sin cambiar de versión mayor, o sea, la que se instala con `npm update`.

| Paquete | En el proyecto | Recomendada | Última | Estado |
|---|---|---|---|---|
| **Backend** | | | | |
| express | 5.1.0 | 5.2.1 | 5.2.1 | Actualización menor |
| mongoose | 8.14.1 | 8.24.4 | 9.10.3 | ⚠️ **Vulnerabilidad alta** (inyección NoSQL / prototype pollution) |
| bcrypt | 6.0.0 | 6.0.0 | 6.0.0 | OK |
| dotenv | 16.5.0 | 16.6.1 | 18.0.5 | Funciona |
| ejs | 3.1.10 | 3.1.10 | 6.0.1 | Funciona; hay versiones mayores nuevas |
| eta | 3.5.0 | — | 4.6.0 | **No se usa** (código muerto) |
| typescript | 5.9.3 | 5.9.3 | 7.0.2 | Funciona |
| ts-node / ts-node-dev | 10.9.2 / 2.0.0 | — | — | Sin versiones nuevas desde 2023 / 2022. Se usa para ejecutar en producción, cosa poco recomendable |
| **Frontend** | | | | |
| react / react-dom | 19.1.0 | 19.3.0 | 19.3.0 | OK |
| vite | 6.3.5 | 6.4.3 | 8.3.2 | ⚠️ Vulnerabilidades altas (solo afectan al servidor de desarrollo) |
| react-router-dom | 7.6.0 | 7.18.4 | 7.18.4 | ⚠️ Vulnerabilidad alta (XSS por redirecciones) |
| axios | 1.9.0 | 1.20.0 | 1.20.0 | ⚠️ Vulnerabilidades altas |
| tailwindcss | 4.1.7 | 4.3.3 | 4.3.3 | OK |
| i18next / react-i18next | 25.1 / 15.5 | 25.10 / 15.7 | 26.4 / 17.0 | i18next-http-backend tiene una vulnerabilidad moderada |
| typescript | 5.8.3 | 5.8.3 | 7.0.2 | Funciona |
| eslint | 9.26 | 9.39 | 10.11 | Funciona |
| ejs, react-intl, @types/ejs, @types/react-intl, @types/react-router-dom | — | — | — | **No se usan** en el frontend |

**Auditoría de seguridad (`npm audit`) [Ejecutado]:**
- **Backend:** 8 vulnerabilidades (5 altas, 2 moderadas, 1 baja).
- **Frontend:** 26 vulnerabilidades (2 críticas, 15 altas, 6 moderadas, 3 bajas).
- Todas tienen arreglo disponible.
- Las críticas (`tar`, `form-data`) llegan a través de herramientas de compilación o de Node, no del código que se ejecuta en el navegador.
- Las que sí afectan a la app en uso son las de **mongoose**, **axios** y **react-router**.

---

## 4. Por qué no arranca: errores encontrados

Están en el orden en que aparecen al intentar arrancar.

### E0. Faltan las herramientas básicas en este Mac — **bloqueante** [Ejecutado]
- **Qué pasa:** `node`, `npm`, `mongod`, `docker` y `brew` no existen. No hay gestor de versiones (nvm, fnm, volta) ni instalaciones fuera del PATH.
- **Causa:** el proyecto se desarrolló en otro ordenador y aquí nunca se instaló nada.
- **Arreglo:** instalar Node 24 LTS y MongoDB 8, o bien Docker. Ver decisiones en la sección 9.

### E1. El backend se cae nada más arrancar — **bloqueante** [Ejecutado]
```
> ts-node src/index.ts
TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
    at name (node_modules/path-to-regexp/src/index.ts:153:13)
```
- **Causa:** `backend/src/index.ts:40` contiene `app.get("*", ...)`. Express 5 ya no acepta `"*"` como ruta comodín. Esta línea se añadió en el último commit (`059db4c`).
- **Arreglo:** cambiar `"*"` por `"/{*splat}"`. Comprobado en la copia: con ese cambio arranca y conecta a MongoDB.
- **Afecta también a Docker:** el `docker-compose` ejecuta el mismo comando, así que fallaría igual [Código].

### E2. El script de plantillas (`npm run seed`) y la compilación (`npm run build`) fallan — **bloqueante** [Ejecutado]
```
src/seed.ts(3,30): error TS2307: Cannot find module '../models/BaseTemplate'
src/seed.ts(229,22): error TS7006: Parameter 't' implicitly has an 'any' type.
```
- **Causa:** ruta de importación incorrecta en `backend/src/seed.ts:3`, más un error de tipos en la línea 229. También viene del último commit, cuyo mensaje dice precisamente "fix TS errors".
- **Consecuencia:** la base de datos nueva queda **sin plantillas**.
- **Arreglo:** cambiar la importación a `./models/BaseTemplate` y tipar `t`. Comprobado: después de eso el seed carga las 6 plantillas.

### E3. No se puede crear ningún proyecto desde la interfaz — **bloqueante para el uso** [Ejecutado]
- **Qué ve el usuario:** pulsa "Usar plantilla", la petición `POST /api/projects/from-template` devuelve **error 500**, la app navega a `/projects/undefined/edit` y la **pantalla se queda en blanco**. En la consola: `TypeError: Cannot read properties of undefined (reading 'theme')`.
- **Causa:**
  - El último commit hizo que el frontend use su propia lista de plantillas (`frontend/src/data/templates.ts`), con identificadores de texto como `"startup"`.
  - El backend busca la plantilla por su identificador interno de MongoDB, un código como `6abece97e1723394f86680a6`.
  - `"startup"` no es un identificador válido, así que la búsqueda falla.
  - El frontend no comprueba si la respuesta fue un error, y por eso acaba en `undefined`.
- **Arreglo, dos opciones:**
  - (a) Que el frontend pida las plantillas a la API (`/api/base-templates`). Así hay una sola fuente de verdad. **Es la que recomiendo.**
  - (b) Que el backend busque la plantilla por su nombre corto.
  - En ambos casos hay que añadir control de errores en el frontend.
- **Comprobado:** creando el proyecto con un identificador válido, el editor, la vista previa, el autoguardado, la vista pública y la exportación funcionan.

### E4. En modo desarrollo no funciona el login ni el registro — **bloqueante en desarrollo** [Ejecutado]
- **Qué ve el usuario:** con `npm run dev` (puerto 5173), al iniciar sesión sale "Error al iniciar sesión".
- **Qué pasa por debajo:** la petición va a `http://localhost:5173/api/login` y recibe un **404**.
- **Causa:**
  - `frontend/.env` tiene `VITE_API_URL=` vacío. El último commit lo cambió; antes valía `http://localhost:3000`.
  - `vite.config.ts` no tiene un proxy que reenvíe las llamadas `/api` al backend.
  - Resultado: las llamadas se quedan en el servidor de Vite.
- **Matiz:** el último commit parece pensado para otro modo de trabajo. En ese modo se compila el frontend, se copia a `backend/public` y todo se sirve desde el puerto 3000. Lo probé así y **funciona** [Ejecutado], pero ese paso de copiar no está documentado ni automatizado.
- **Arreglo:** añadir un proxy `/api → http://localhost:3000` en `vite.config.ts`, o poner `VITE_API_URL=http://localhost:3000` en un `.env.development`.

### E5. Problemas que no bloquean el arranque pero aparecerán pronto
| # | Problema | Evidencia |
|---|---|---|
| E5a | Volver a ejecutar `npm run seed` **rompe la exportación** de todos los proyectos que ya existen ("Plantilla base no encontrada", error 500). El seed borra y recrea las plantillas, y la exportación busca la plantilla original en vez de usar el dato guardado en el propio proyecto | [Ejecutado] |
| E5b | La compilación del backend (`npm run build` y luego `node dist/index.js`) no copia las plantillas `.ejs`, así que ninguna web se genera: `Failed to lookup view "templateRestaurante"`. Por eso hoy solo funciona con `ts-node` | [Ejecutado] |
| E5c | `docker-compose.yml` monta la carpeta `backend/` del ordenador encima de la del contenedor, de modo que usa las dependencias del Mac. No incluye el frontend ni las variables CORS, y usa MongoDB 6, ya sin soporte | [Código] (sin Docker no lo he podido probar) |
| E5d | La web publicada `buildit.oscaarpastor.com` responde **530** (error de Cloudflare: el servidor de origen no responde). Probablemente la instancia AWS EC2 (`ec2-3-84-44-208…`, que aparece en el historial) está apagada o ya no existe | [Ejecutado] la respuesta 530; [Suposición] la causa |

### Registro de pasos realizados

| # | Paso | Resultado |
|---|---|---|
| 1 | Buscar Node, npm, MongoDB, Docker y Homebrew en el sistema | Ninguno instalado |
| 2 | Descargar Node 24.21.0 y MongoDB 8.0.32 portátiles en la carpeta temporal (checksums verificados) y arrancar MongoDB | OK |
| 3 | Copiar el proyecto a la carpeta temporal | OK (el original no se ha tocado) |
| 4 | `npm run start` en el backend, tal cual, sin `.env` | ❌ E1 |
| 5 | `npx tsc --noEmit` y `npm run seed` | ❌ E2 |
| 6 | Aplicar en la copia los arreglos de E1 y E2, ejecutar el seed y arrancar | ✅ "Conectado a MongoDB / Servidor corriendo en puerto 3000" |
| 7 | Pruebas de la API con `curl`: registro, login, `/me`, plantillas, proyecto, vista previa, exportación | ✅ funcionan, salvo crear desde plantilla (E3) y estadísticas (404) |
| 8 | `npm ci` limpio del backend en otra carpeta | ✅ instala bien; `bcrypt` funciona en arm64 |
| 9 | `npm ci` + `npm run build` del frontend | ✅ compila sin errores |
| 10 | `npm run lint` del frontend | ✅ 0 errores, 3 avisos menores |
| 11 | `npm audit` y `npm outdated` en ambos | Ver sección 3 |
| 12 | `npm run dev` del frontend y login en el navegador | ❌ E4 |
| 13 | Frontend compilado servido por el backend (modo producción): registro, crear proyecto | Registro ✅; crear proyecto ❌ E3 |
| 14 | Editor con un proyecto válido: autoguardado, vista previa, vista pública | ✅ |
| 15 | Ejecutar el seed de nuevo y exportar | ❌ E5a |
| 16 | `tsc` + `node dist/index.js` | ❌ E5b |
| 17 | Parar todos los procesos | ✅ puertos libres; `git status` sin cambios nuevos |

---

## 5. Qué tienes que darme tú

| Qué | ¿Imprescindible? | Detalle |
|---|---|---|
| **Permiso para instalar Node 24 y MongoDB 8 (o Docker) de forma permanente** | Sí | Hoy no hay nada instalado (ver pregunta 1) |
| **Archivos `.env`** | **No para trabajar en local** | El backend funciona sin `.env`: usa por defecto el puerto 3000 y `mongodb://localhost:27017/buildit` [Ejecutado]. Para producción harían falta `PORT`, `MONGODB_URI` y `CORS_ORIGINS` (hay un `backend/.env.example`) |
| **Datos antiguos** (usuarios y proyectos) | Solo si los quieres conservar | Necesitaría un volcado (`mongodump`) de donde estuvieran. No está claro dónde vivían: el `.env` borrado tenía `MONGODB_URI` apuntando al Mongo de Docker y una variable `MONGO_URI` hacia Atlas que **el código no lee** [Código]. [Suposición] Los datos de producción estaban en el Mongo de Docker del EC2 |
| **Acceso a MongoDB Atlas** | Sí, por seguridad | Para cambiar la contraseña filtrada (ver S1). **No me he conectado ni he probado si sigue siendo válida**, a propósito |
| **Información del despliegue** | Solo si se vuelve a publicar | Si la instancia EC2 sigue existiendo, el acceso SSH; y quién gestiona el dominio en Cloudflare |
| **Servicios externos o API keys** | No | La app no usa APIs externas. Solo carga Tailwind y Google Fonts desde CDN en las webs generadas |

---

## 6. Problemas de código y seguridad, por gravedad

### 🔴 Crítica

1. **S1. Contraseña de MongoDB Atlas expuesta públicamente.**
   - El commit `8aebf2b` subió `backend/.env` con usuario y contraseña de Atlas.
   - `9638492` borró el archivo, pero **sigue en el historial**, y el repositorio `oscaarpastor/BuildIt` es **público** según la API de GitHub.
   - Evidencia: [Ejecutado] la búsqueda en el historial y la consulta de visibilidad a GitHub.
   - **Acción:** cambiar la contraseña o borrar ese usuario en Atlas ya, y revisar los accesos. Reescribir el historial es opcional y no sustituye al cambio de contraseña.
2. **S2. No hay autenticación real.**
   - El "token" de sesión es simplemente el identificador del usuario en la base de datos.
   - Ninguna ruta comprueba quién hace la petición.
   - Cualquiera puede listar, modificar o borrar usuarios, proyectos, plantillas y estadísticas de **otros** usuarios.
   - La presentación del TFG dice que se usa **JWT**, pero no existe en el código.
   - Evidencia: [Ejecutado] `GET /api/users` sin credenciales devuelve todos los usuarios; [Código] el resto.
3. **S3. Se exponen los hashes de las contraseñas.**
   - Aparecen en la respuesta del registro, en `GET /api/users` y dentro de cada proyecto (`GET /api/projects/:id` incluye el usuario completo).
   - Evidencia: [Ejecutado].

### 🟠 Alta

4. **S4. Cambiar la contraseña por la API la guarda en texto plano y bloquea la cuenta.**
   - `PUT /api/users/:id` no cifra la contraseña, y después el login falla.
   - Hoy la pantalla de Ajustes no envía la contraseña, pero la API lo permite.
   - Evidencia: [Ejecutado].
5. **S5. Asignación masiva.** Las rutas de actualización aceptan cualquier campo. Por ejemplo, se puede cambiar el dueño de un proyecto. [Código]
6. **S6. CORS abierto.** El último commit lee `CORS_ORIGINS`, pero las dos ramas del `if` aceptan cualquier origen, así que la variable no sirve para nada. [Código]
7. **S7. Posible XSS en las webs publicadas.**
   - Las plantillas EJS escapan bien el HTML.
   - Pero los enlaces e imágenes aceptan URLs `javascript:…`, y los colores y fuentes se insertan sin validar dentro de atributos `style`.
   - Como cada web tiene un enlace público, es explotable.
   - Evidencia: [Código], no lo he explotado.
8. **S8. Dependencias con vulnerabilidades conocidas:** mongoose, axios, react-router, vite (ver sección 3). [Ejecutado]

### 🟡 Media

9. **Enumeración de usuarios.** El login distingue entre "Usuario no encontrado" y "Contraseña incorrecta". [Ejecutado]
10. **Faltan protecciones básicas en la API.**
    - No hay validación de datos, límite de intentos ni cabeceras de seguridad.
    - Los errores devuelven el mensaje interno tal cual.
    - La página de error de Express muestra rutas absolutas del servidor [Ejecutado en el build compilado].
11. **Cosas en git que no deberían estar.**
    - `backend/node_modules` (51 MB, instalado en un Mac).
    - Varios `.DS_Store`.
    - `frontend/.env`.
    - No hay `.gitignore` en la raíz. [Ejecutado]
12. **Errores de API sin controlar en el frontend.** Ninguna llamada `fetch` comprueba si la respuesta fue un error, y eso provoca pantallas en blanco como la de E3. [Ejecutado/Código]
13. **Datos duplicados.** Las 6 plantillas están definidas dos veces (frontend y seed) y el esquema de datos está copiado entre `Project` y `BaseTemplate`. Es el origen de E3. [Código]
14. **Producción con herramientas de desarrollo.** El backend se ejecuta con `ts-node`, y el servidor de Vite acepta cualquier dominio (`allowedHosts: true`). [Código]

### 🟢 Baja / calidad

15. **Traducciones incompletas.**
    - La portada muestra literalmente el texto **`welcome.description`** porque falta esa traducción [Ejecutado].
    - Faltan 2 claves más.
    - Hay muchos textos en español escritos directamente en el código: crear proyecto, listado, etiquetas del editor, tarjeta de proyecto. [Código]
16. **La URL de la API se repite en 8 archivos** con comportamientos distintos (solo uno tiene valor por defecto). [Código]
17. **El botón "Cerrar sesión" de Ajustes no limpia el usuario en memoria.** La protección de rutas solo mira si hay algo guardado en `localStorage`. [Código]
18. **Código muerto.**
    - `tailwind.config.js` (Tailwind 4 no lo lee).
    - Dependencias sin usar (sección 3).
    - `template.ejs`, que el seed ya no carga.
    - Rutas de estadísticas que nadie llama.
    - [Código]
19. **Las webs generadas dependen de servicios externos.** Cargan Tailwind desde su CDN de pruebas, que no está pensado para producción, así que el HTML exportado no funciona sin internet. [Código]
20. **Sin documentación ni tests.**

---

## 7. Funcionalidad: qué está terminado y qué no

| Función | Estado | Evidencia |
|---|---|---|
| Portada bilingüe (es/en) | ✅ Funciona, con un texto sin traducir | [Ejecutado] |
| Registro e inicio de sesión | ✅ Funciona (en modo producción o con E4 arreglado), pero **sin seguridad real** | [Ejecutado] |
| Ajustes (cambiar nombre y email) | Parece completo | [Código], no probado |
| Galería de 6 plantillas con vista previa | ✅ Se muestra | [Ejecutado] la galería; [Código] el modal |
| **Crear proyecto desde plantilla** | ❌ **Roto** (E3) | [Ejecutado] |
| Editor con 15 secciones, vista previa en directo y autoguardado | ✅ Funciona | [Ejecutado] |
| "Mostrar/ocultar secciones" | 🟡 A medias: oculta el formulario del editor, **no** la sección en la web | [Código] |
| Eliminar proyecto | Parece completo (no borra sus estadísticas) | [Código] |
| Enlace público para compartir | ✅ Funciona | [Ejecutado] |
| Exportar a HTML | ✅ Funciona; se rompe si se repite el seed (E5a) | [Ejecutado] |
| Estadísticas de visitas y clics | 🟡 A medias: existen en el backend, pero nunca se crean ni se muestran | [Ejecutado] (404) + [Código] |
| Formulario de contacto en las webs | ❌ No implementado: hay una casilla "activar formulario" en el editor que ninguna plantilla usa | [Código] |
| Modo oscuro | 🟡 A medias: solo afecta a la exportación, no hay control en el editor y la vista previa lo ignora | [Código] |
| Subir imágenes | ❌ No existe; solo se pueden pegar URLs | [Código] |
| JWT y Zustand (citados en la presentación) | ❌ No existen en el código | [Código] |

---

## 8. Plan propuesto

### Fase 0: urgente e independiente del resto
- Cambiar la contraseña o borrar el usuario de MongoDB Atlas expuesto (S1).

### Fase 1: conseguir que arranque
1. Instalar Node 24 LTS y MongoDB 8 (o Docker), según la decisión 1.
2. Arreglar E1 (ruta `"*"`), E2 (import del seed) y E4 (proxy de Vite). Son tres cambios de una línea.
3. Arreglar E3 (crear proyecto) con control de errores en el frontend.
4. `npm ci` en ambas carpetas, ejecutar el seed y probar el flujo completo.
5. Escribir un `README.md` en la raíz con los pasos de arranque.

### Fase 2: corregir lo roto y lo desactualizado
1. **Seguridad:**
   - Autenticación real (JWT o cookie de sesión) y comprobación de que cada recurso es del usuario.
   - Quitar las contraseñas de las respuestas y cifrarlas también al actualizar.
   - Limitar los campos editables, arreglar CORS y validar URLs y colores.
   - Usar mensajes de login genéricos.
2. **Dependencias:**
   - Aplicar parches de seguridad (`npm audit fix`) y actualizar dentro de la misma versión mayor.
   - Quitar las dependencias que no se usan.
3. **Robustez:**
   - Una sola fuente de plantillas.
   - Exportar usando la vista guardada en el proyecto (E5a).
   - Hacer que el build del backend copie las plantillas y ejecutar JavaScript compilado en producción (E5b).
   - Centralizar la URL de la API y gestionar los errores.
4. **Repositorio:** sacar `node_modules`, `.DS_Store` y `.env` de git y añadir un `.gitignore` en la raíz.
5. **Docker:** MongoDB 8, frontend incluido y sin montar las dependencias del Mac (si se sigue usando).
6. **Traducciones:** completar las claves que faltan.

### Fase 3: mejoras
- Tests: de la API y de extremo a extremo (registro, crear, editar, exportar), con integración continua en GitHub Actions.
- Terminar o eliminar las funciones a medias: estadísticas, formulario de contacto, ocultar secciones en la web, modo oscuro y subida de imágenes.
- Compilar Tailwind en las webs exportadas en vez de usar el CDN.
- Valorar actualizaciones mayores: Vite 8, TypeScript 7, ESLint 10, Mongoose 9, i18next 26.
- Alinear la presentación del TFG con lo que hay de verdad (JWT, Zustand) y volver a desplegar si hace falta.

---

## 9. Decisiones que necesito de ti

1. **Instalación:** ¿instalo Node 24 y MongoDB de forma permanente en este Mac? ¿Con **Homebrew** (nativo, más ligero) o con **Docker Desktop** (reutiliza el `docker-compose`)? Recomiendo Homebrew para desarrollar.
2. **Datos:** ¿necesitas los usuarios y proyectos antiguos, o vale empezar con una base de datos vacía y las 6 plantillas? Si los necesitas, ¿dónde estaban: Atlas, el servidor EC2 o el Mongo del otro ordenador?
3. **Credencial filtrada:** ¿cambias tú la contraseña de Atlas o me das acceso? ¿Quieres además **reescribir el historial** de git? Implica un `push --force` sobre un repositorio público y que cualquier otra copia del repo tenga que volver a clonarse.
4. **Último commit (`059db4c`, PPaspel, 10-sep-2026):** ¿lo reconoces? ¿Lo **conservamos y arreglamos** (añade las 6 plantillas y mejoras del editor) o **volvemos** al estado de octubre de 2025 ("FUNCIONA EN LOCAL")? Recomiendo conservarlo y arreglarlo.
5. **Arreglo de E3:** ¿el frontend carga las plantillas desde la API (una sola fuente de verdad, recomendado) o mantenemos la lista del frontend y el backend busca por nombre?
6. **Modo de trabajo en local:** ¿dos servidores (Vite en el 5173 y la API en el 3000, con proxy), o todo servido desde el backend como plantea el último commit? Recomiendo los dos servidores para desarrollar y el backend sirviendo el frontend compilado en producción.
7. **Seguridad:** ¿implemento autenticación real con JWT en la fase 2? Sería coherente con la presentación del TFG.
8. **Repositorio:** ¿saco `backend/node_modules` y los `.DS_Store` de git?
9. **Alcance de las actualizaciones:** ¿solo parches de seguridad dentro de la misma versión mayor, o modernizar a las versiones actuales? ¿Hay una **fecha límite** (por ejemplo, la defensa del TFG) que condicione el alcance?
10. **Despliegue:** ¿hay que volver a publicar en `buildit.oscaarpastor.com`? ¿Sigue existiendo la instancia EC2?
