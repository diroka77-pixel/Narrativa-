# Drive y copias — v0.9

## Disponible ahora: selector del sistema

En Ajustes → Copia de seguridad, «Elegir carpeta» abre el selector de documentos de Android. Si Google Drive está instalado y aparece como proveedor, se puede elegir o crear allí una carpeta exclusiva para Historias vivas. Android conserva el permiso para esa carpeta y la app mantiene las cinco copias más recientes.

Si Drive no aparece, hay que instalar/iniciar sesión en su aplicación o elegir una carpeta local. También pueden aparecer Dropbox u otros proveedores compatibles con el selector de Android.

## Fase 2: `drive.appdata`

Está deliberadamente desactivada en v0.9. Para activarla hacen falta, en este orden:

1. Probar crear, listar y restaurar una copia SAF en un móvil real.
2. Crear un proyecto de Google Cloud propio y configurar la pantalla de consentimiento.
3. Registrar el paquete `com.mibiblioteca.narrador` con su huella SHA-1/SHA-256 real.
4. Crear el ID de cliente OAuth de Android y guardarlo como constante de compilación, nunca inventarlo ni incluir un secreto de cliente.
5. Integrar Google Identity/Credential Manager y pedir solo `drive.appdata`.
6. Probar con una cuenta real, incluidas revocación, falta de red y conflicto. En conflictos se conservarían ambas copias.
7. Añadir `www.googleapis.com` a `apiHosts` y actualizar la política de privacidad antes de habilitarlo.

La fase 1 es más sencilla y ya permite una carpeta de Drive visible para el usuario. `appdata` sería una copia oculta administrada por la app.
