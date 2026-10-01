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
