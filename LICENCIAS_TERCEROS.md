# Licencias de terceros — Historias vivas

## Diccionario para el corrector ortográfico (es_dict.js)
- Origen: diccionario español `es_ES` de LibreOffice/Apache OpenOffice (autor inicial Santiago Bosio y colaboradores), versión 2.8, tomado del paquete `wooorm/dictionaries` (carpeta `dictionaries/es`).
- Licencia: triple y a elección del usuario — GNU GPL 3 o posterior, GNU LGPL 3 o posterior, o Mozilla Public License 1.1 o posterior. **Se usa bajo MPL 1.1.** Texto original de la licencia: `licencias/es_ES-LICENCIA-original.txt`.
- Modificación: las reglas de afijos se expanden a formas (tools/expand_hunspell.py) y se guardan como un filtro de Bloom (tools/mkdict.py → es_dict.js). Del filtro no se puede recuperar la lista de palabras, pero el archivo es un derivado: se distribuye bajo MPL 1.1.
- Obligaciones que cumplir al publicar: (1) mantener el aviso de licencia/atribución (hecho en «Privacidad y ayuda → Créditos y licencias»); (2) poner a disposición el código fuente del diccionario y de la conversión: el original está en https://github.com/wooorm/dictionaries (dictionaries/es) y las herramientas de conversión están en `tools/`; conviene publicarlas en un repositorio público enlazado desde la ficha de la app; (3) no cambiar la licencia del propio diccionario. El resto del código de la app no queda sujeto a MPL (copyleft a nivel de archivo).

## Descartado
Se descartó una lista de palabras tomada de un repositorio sin licencia que a su vez se obtuvo del sitio de la RAE, por no tener permiso de reutilización claro.

## Pendiente de revisar antes de publicar (no auditado)
JSZip y pdf-lib (licencias de la versión incluida), tipografías, imágenes de `art/` y el icono (procedencia y derechos).

*Nota: esto es un inventario técnico, no asesoramiento legal.*
