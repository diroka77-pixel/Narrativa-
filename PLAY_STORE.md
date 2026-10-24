# Guía para publicar en Google Play

(Las normas de Google cambian: comprueba cada punto en Play Console antes de enviar.)

## 1. Antes de nada
1. Cuenta de desarrollador de Google Play (pago único). Si es **cuenta personal nueva**, Google suele exigir una **prueba cerrada con al menos 12 testers durante 14 días** antes de poder publicar en producción.
2. **Nivel de API objetivo:** Google exige un `targetSdk` reciente para publicar. Este proyecto usa 34 para compilar con seguridad; antes de subir, súbelo al valor que pida Play Console (hay que subir también `compileSdk` y revisar el comportamiento).
3. Sube la **política de privacidad** (PRIVACIDAD.md) a una URL pública (por ejemplo GitHub Pages) y rellena tu nombre y correo.
4. Rellena `window.hvSupport.email` en `app/src/main/assets/shim.js` con tu correo de soporte (activa «Enviar por correo» en las denuncias).

## 2. Firma y AAB
1. Crea una clave de firma (guárdala a buen recaudo: si la pierdes no podrás actualizar):
   `keytool -genkeypair -v -keystore release.jks -alias historias -keyalg RSA -keysize 2048 -validity 10000`
2. Convierte a base64 (`base64 -w0 release.jks`) y crea en GitHub (Settings → Secrets → Actions) los secrets `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
3. Ejecuta el workflow «Compilar versión para Google Play» y descarga el `.aab`.
4. Activa **Play App Signing** al subirlo.

## 3. Formularios de Play Console
- **Seguridad de los datos (Data Safety):** no recoge datos propios; los datos que escribe el usuario salen hacia el proveedor de IA que elige (declárales como «datos compartidos con terceros», finalidad: funcionalidad de la app; el contenido de usuario se envía a un servicio de IA).
- **Clasificación de contenido:** ficción con violencia y temas adultos; sin contenido sexual explícito. Es probable que quede para mayores de 16–18.
- **Contenido generado por IA:** declara que la app genera contenido con IA y describe la vía de denuncia dentro de la app («Denunciar contenido» en cada escena).
- **Público objetivo:** solo adultos (18+).
- **Permisos:** solo Internet. Micrófono y galería los gestionan los selectores del sistema.

## 4. Riesgo de rechazo por «funcionalidad mínima»
Google rechaza apps que son solo una web envuelta. Argumentos a favor: puente nativo (almacenamiento cifrado y por archivos, claves en Keystore, voz y dictado nativos, selector de imágenes, guardado de archivos, conexión directa a APIs de IA), funcionamiento sin conexión del lector y exportación a EPUB/PDF/FB2. Describe estas funciones en la ficha.

## 5. Ficha de la tienda
- Descripción corta: «Escribe historias que recuerdan lo que haces.»
- Capturas: biblioteca, lectura, Atlas de la historia, ajustes de lectura.
- Icono 512×512 y gráfico de funciones 1024×500.
- Aviso claro: ficción con temas adultos; la IA es externa y la elige el usuario.
