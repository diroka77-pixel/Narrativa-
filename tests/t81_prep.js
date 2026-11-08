const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const cv=document.createElement('canvas');cv.width=300;cv.height=200;const g=cv.getContext('2d');g.fillStyle='#a33';g.fillRect(0,0,300,200);const jpg=cv.toDataURL('image/jpeg',0.8);
const sc=(t,img)=>({t,m:{},d:1,img});
const s={id:'p1',title:'Libro P',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[sc('Uno.\n\nDos.',jpg),sc('Tres.'),sc('Cuatro.',jpg),sc('Cinco.',jpg)],lore:[{tipo:'personaje',nombre:'Marta',desc:'d',img:jpg}],turn:4,at:1,state:{},opts:[],premise:'p',ce:[2]};
LIB.push(s);cur=s;sample=true;view('story');render();
const base=buildEpubFiles(s,{uid:'x'});const pdf0=await pdfDoc(s);const L0=(await PDFLib.PDFDocument.load(pdf0)).getPageCount();
layMut(s,0).sz='f';layMut(s,2).sz='s';layMut(s,2).ipb=true;layMut(s,3).off=true;layMut(s,0).spb=true;
const f=buildEpubFiles(s,{uid:'x'});
const c1=f['OEBPS/c1.xhtml'],c2=f['OEBPS/c2.xhtml'];
o.push('fpg',/class="fpg"/.test(c1),'sm+pbk',/class="c pbk"><img class="si sm"/.test(c2),'off',(c2.match(/<img/g)||[]).length,'spb',/<div class="pbk">/.test(c1),'css',/\.fpg\{/.test(f['OEBPS/style.css']));
o.push('baseNoFpg',!/fpg"/.test(base['OEBPS/c1.xhtml']));
const pdf1=await pdfDoc(s);const L1=(await PDFLib.PDFDocument.load(pdf1)).getPageCount();o.push('pages',L1>L0);
// UI
prepSheet();await wait(150);o.push('sheetImgs',document.body.innerText.includes('Imágenes de escena (3)'),'selects',document.querySelectorAll('select[aria-label="Tamaño de la imagen"]').length);
const sel=document.querySelector('select[aria-label="Tamaño de la imagen"]');sel.value='w';sel.dispatchEvent(new Event('change'));o.push('saved',s.lay[0].sz);
previewSheet(1);await wait(300);const fr=document.querySelector('iframe[title="Vista previa"]');o.push('iframe',!!fr,/data:image\/jpeg;base64/.test(fr.srcdoc),/pbk|fpg/.test(fr.srcdoc),/salto de página/.test(fr.srcdoc));
return o});
console.log(JSON.stringify(r),errs);
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/prev.png'});await b.close()})()
