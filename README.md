# Historias vivas (APK)

Aplicación Android que envuelve la web de Historias vivas en un WebView con puente nativo.

- `app/src/main/assets/index.html`: la aplicación (copia de `generador.html`).
- `shim.js`: conecta la web con Android (almacenamiento, claves cifradas, IA, voz, archivos).
- Compilar para probar: pestaña Actions → «Compilar APK» → descarga `historias-vivas-apk`.
- Publicar en Play: ver `PLAY_STORE.md` y `PRIVACIDAD.md`.

Versión 0.9: copia SAF automática con restauración fusionada, voz en segundo plano, widget «Continuar leyendo», contador local por modelo, cola sin conexión, tema claro accesible, claves cifradas con Keystore, almacenamiento en archivos y política CSP.

Consulta `CAMBIOS_v0.9.md`, `NATIVE_CONTRACTS_v0.9.md` y `DRIVE_SETUP.md` para el estado exacto y las pruebas pendientes en móvil.
