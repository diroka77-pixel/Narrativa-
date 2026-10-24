# Historias vivas (APK)

App Android que envuelve la página de «Historias vivas» y le añade lo que un móvil sabe hacer:
galería nativa para portadas e imágenes, lectura en voz alta, guardado en Descargas y conexión
con la IA que cada usuario ya tenga.

## Cómo se conecta la IA (sin coste para el autor)
Menú → «Conectar mi IA»:
1. **Copiar y pegar** — funciona con cualquier IA (ChatGPT, Gemini, Claude…), gratis o de pago.
2. **Clave de API** de Gemini, OpenAI o Anthropic. La clave se guarda solo en el móvil del usuario.
   La clave de API es independiente de la suscripción de chat y tiene sus propios límites/costes.

## Estructura
- `app/src/main/assets/index.html` — la página (generador.html con librerías locales).
- `app/src/main/assets/shim.js` — puente: IA, descargas, voz.
- `app/src/main/kotlin/.../MainActivity.kt` — galería, voz, portapapeles, guardado, red.
- `.github/workflows/build-apk.yml` — compila el APK en GitHub Actions (pestaña Actions → Artifacts).

## Compilar
Subir todo al repositorio (rama `main`). En GitHub: Actions → «Compilar APK» → Run workflow.
Al terminar, descargar el artefacto `historias-vivas-apk` (contiene `app-debug.apk`).
Requiere Android 10 o superior.
