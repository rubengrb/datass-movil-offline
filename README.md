# DATASS Móvil Offline · Prototipo

Prototipo navegable de la app de campo DATASS (MVCS · OGEI-OTI), instalable como aplicación web progresiva (PWA).

- Funciona sin conexión después de la primera apertura.
- Se instala en Android desde Chrome: menú ⋮ → «Agregar a la pantalla principal» / «Instalar app».
- En iPhone, desde Safari: Compartir → «Agregar a inicio».

> Prototipo de diseño. Los nombres, DNI, sistemas y registros son datos de prueba.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (un solo archivo) |
| `manifest.webmanifest` | Nombre, colores e íconos para instalarla |
| `sw.js` | Guarda la app en el equipo para usarla sin conexión |
| `icons/` | Íconos de la app |

## Actualizar

Reemplaza `index.html` y, en `sw.js`, cambia `VERSION` (por ejemplo, `datass-v2`) para que los equipos instalados descarguen la versión nueva.
