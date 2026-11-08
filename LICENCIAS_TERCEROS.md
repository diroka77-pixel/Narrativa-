# Licencias de terceros — Historias vivas

## Diccionario para el corrector ortográfico (es_dict.js)
- Origen: diccionario español `es_ES` de LibreOffice/Apache OpenOffice (autor inicial Santiago Bosio y colaboradores), versión 2.8, tomado del paquete `wooorm/dictionaries` (carpeta `dictionaries/es`).
- Licencia: triple y a elección del usuario — GNU GPL 3 o posterior, GNU LGPL 3 o posterior, o Mozilla Public License 1.1 o posterior. **Se usa bajo MPL 1.1.** Texto original de la licencia: `licencias/es_ES-LICENCIA-original.txt`.
- Modificación: las reglas de afijos se expanden a formas (tools/expand_hunspell.py) y se guardan como un filtro de Bloom (tools/mkdict.py → es_dict.js). Del filtro no se puede recuperar la lista de palabras, pero el archivo es un derivado: se distribuye bajo MPL 1.1.
- Obligaciones que cumplir al publicar: (1) mantener el aviso de licencia/atribución (hecho en «Privacidad y ayuda → Créditos y licencias»); (2) poner a disposición el código fuente del diccionario y de la conversión: el original está en https://github.com/wooorm/dictionaries (dictionaries/es) y las herramientas de conversión están en `tools/`; conviene publicarlas en un repositorio público enlazado desde la ficha de la app; (3) no cambiar la licencia del propio diccionario. El resto del código de la app no queda sujeto a MPL (copyleft a nivel de archivo).

## Descartado
Se descartó una lista de palabras tomada de un repositorio sin licencia que a su vez se obtuvo del sitio de la RAE, por no tener permiso de reutilización claro.

## Librerías incluidas
- JSZip 3.10.1 — © Stuart Knightley y colaboradores. Doble licencia MIT o GPLv3; se usa bajo **MIT**. Incluye pako (MIT). El aviso va en la cabecera de `jszip.min.js`, que se conserva.
- pdf-lib — © Andrew Dillon, licencia **MIT**; contiene código de Microsoft Corporation bajo **Apache 2.0** (aviso en la cabecera de `pdf-lib.min.js`, que se conserva).
- Ambas permiten uso comercial; la condición es mantener los avisos de copyright.

## Imágenes e icono
- Las portadas de `art/` y el icono fueron generados por el autor con ChatGPT (OpenAI). Según las condiciones de OpenAI vigentes al consultarlas, el usuario es dueño del contenido generado y puede usarlo comercialmente, cumpliendo sus políticas de uso. Conviene releer esas condiciones antes de publicar.
- Aviso: en algunos países (p. ej. EE. UU.) el contenido generado íntegramente por IA puede no ser protegible por derechos de autor, es decir, otros podrían copiarlo. No impide usarlo. No se han pedido imágenes de personajes, marcas ni obras reconocibles (verificar que ninguna lo parezca).
- Tipografías: ver la sección siguiente.

## Tipografías incluidas (maquetación del libro)
Se incluyen **sin modificar** (archivos TTF originales, codificados en base64 dentro de `assets/fonts/f-*.js`) y se incrustan en los PDF y EPUB que genera la app. Todas bajo **SIL Open Font License 1.1**, que permite uso comercial, incrustarlas en documentos y redistribuirlas con software siempre que no se vendan por separado y se conserve el aviso. Los textos completos están en `licencias/` y en la app («Ajustes → Licencias de terceros», archivo `assets/licencias.js`).
- Crimson Pro (© 2018 Los autores del proyecto Crimson Pro) — `licencias/CrimsonPro-OFL.txt`
- Lora (© 2011 Los autores del proyecto Lora, Cyreal; nombre reservado «Lora») — `licencias/Lora-OFL.txt`
- IBM Plex Serif (© 2017 IBM Corp.; nombre reservado «Plex») — `licencias/IBMPlex-OFL.txt`
- Liberation Serif (© 2012 Red Hat, Inc.; © 2010 Google; nombre reservado «Liberation») — `licencias/LiberationSerif-OFL.txt`
- Importante: como algunas tienen «nombre reservado», **no se deben recortar (subset) ni modificar** los archivos de fuente y seguir llamándolos igual. Insertar la fuente completa en un PDF no es modificarla. Si algún día se quiere reducir el tamaño recortando glifos, hay que cambiarles el nombre o confirmarlo con la licencia.
- Para añadir otra fuente libre (p. ej. EB Garamond, Literata): copiar su `.ttf` original y su `OFL.txt`, generar `fonts/f-<id>.js` con el mismo formato y añadir una entrada a `BK_FONTS` (y su licencia a `licencias.js` y a `licSheet`).

*Nota: esto es un inventario técnico, no asesoramiento legal.*
