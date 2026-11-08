const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const cv=document.createElement('canvas');cv.width=300;cv.height=200;const g=cv.getContext('2d');g.fillStyle='#a33';g.fillRect(0,0,300,200);const jpg=cv.toDataURL('image/jpeg',0.8);
const lorem='La lluvia caía sobre el faro mientras Marta recordaba las palabras de su abuelo, aquellas que nunca se atrevió a repetir en voz alta. —No pienso volver —dijo—. Se acabó. Eliot guardó silencio y miró el mar, que seguía igual de negro y de inmenso que aquella noche. ';
const sc=(i,img)=>({t:Array.from({length:6},(_,k)=>lorem.repeat(2)+' '+i+'.'+k).join('\n\n'),m:{},d:1,img});
const scenes=[];for(let i=0;i<12;i++)scenes.push(sc(i,i%4==1?jpg:null));
const s={id:'b1',title:'El faro que no se enciende',syn:'x',genre:'Misterio',genres:['Misterio'],scenes,lore:[{tipo:'personaje',nombre:'Marta',desc:'Una mujer seca y decidida.',img:jpg,sheet:jpg}],turn:12,at:1,state:{},opts:[],premise:'p',ce:[4,8]};
LIB.push(s);cur=s;sample=true;view('story');render();
const bf=await bookFonts(s);const t0=Date.now();const M=bookLayout(s,bf.f);o.push('ms',Date.now()-t0,'pages',M.pages.length,'size',Math.round(M.W)+'x'+Math.round(M.H));
const kinds={};M.pages.forEach(p=>kinds[p.kind]=(kinds[p.kind]||0)+1);o.push(JSON.stringify(kinds));
// chapter openers on odd pages
o.push('chapOdd',M.pages.filter(p=>p.kind==='chap').map(p=>p.num%2).join(''));
// no text beyond margins
let bad=0;const mb=M.o.mb*72/25.4;M.pages.forEach(p=>{if(p.kind==='text')p.items.forEach(it=>{if(it.t==='txt'&&it.y>p.h-mb+1&&!/^\d+$/.test(it.text))bad++;})});o.push('overflowLines',bad);
// last-line widows: a page with a single text line
let lonely=0;M.pages.forEach(p=>{if(p.kind==='text'){const ys=new Set(p.items.filter(i=>i.t==='txt').map(i=>Math.round(i.y)));if(ys.size<=3)lonely++}});o.push('lonely',lonely);
const pdf=await pdfDoc(s);const doc=await PDFLib.PDFDocument.load(pdf);o.push('pdfPages',doc.getPageCount(),'kb',Math.round(pdf.length/1024));
s.book={size:'a5',fs:12};const M2=bookLayout(s,bf.f);o.push('a5pages',M2.pages.length);
s.book={};
bkDesignSheet();await wait(900);o.push('design',document.body.innerText.includes('Ajuste fino de márgenes'));
bkPreviewSheet(1);await wait(1500);[...document.querySelectorAll('button')].find(x=>x.textContent.startsWith('Siguiente')).click();o.push('prevPages',document.body.innerText.match(/\d+ páginas/)&&document.body.innerText.match(/\d+ páginas/)[0],'spans',document.querySelectorAll('span').length>50);
[...document.querySelectorAll('button')].find(x=>x.textContent.startsWith('Siguiente')).click();await wait(100);
o.push('info',[...document.querySelectorAll('p.hint')].map(x=>x.textContent).filter(x=>/Página|Portada/.test(x)).join('|'));
return o});
console.log(JSON.stringify(r),errs);
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/book.png'});await b.close()})()
