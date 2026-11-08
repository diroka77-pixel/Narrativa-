const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const mk=(c)=>{const cv=document.createElement('canvas');cv.width=300;cv.height=200;const g=cv.getContext('2d');g.fillStyle=c;g.fillRect(0,0,300,200);return cv.toDataURL('image/jpeg',0.8)};const jpg=mk('#a33'),bg=mk('#cb9');
const lorem='La lluvia caía sobre el faro mientras Marta recordaba las palabras de su abuelo, aquellas que nunca se atrevió a repetir en voz alta. —No pienso volver —dijo—. Se acabó. Eliot guardó silencio y miró el mar. ';
const sc=(i,img)=>({t:Array.from({length:5},(_,k)=>lorem.repeat(2)+i+'.'+k).join('\n\n'),m:{},d:1,img});
const scenes=[];for(let i=0;i<9;i++)scenes.push(sc(i,i%3==1?jpg:null));
const s={id:'b2',title:'El faro',syn:'x',genre:'M',genres:['M'],scenes,lore:[],turn:9,at:1,state:{},opts:[],premise:'p',ce:[3,6]};
LIB.push(s);cur=s;sample=true;view('story');render();
const base=bookLayout(s,(await bookFonts(s)).f);
for(const f of ['times','helvetica','courier']){s.book={font:f};const bf=await bookFonts(s);const M=bookLayout(s,bf.f);o.push(f,M.pages.length);const pdf=await pdfDoc(s);o.push((await PDFLib.PDFDocument.load(pdf)).getPageCount())}
s.book={font:'times',paper:'crema',frame:'doble',orn:'rombo',sbr:'adorno',drop:true,bg:bg,bgop:0.2,bgsc:'all'};
layMut(s,1).cap='La llegada al faro, de noche.';layMut(s,4).top=true;layMut(s,4).cap='Otra';
const bf=await bookFonts(s);const M=bookLayout(s,bf.f);
const cnt=t=>M.pages.reduce((a,p)=>a+p.items.filter(i=>i.t===t).length,0);
o.push('poly',cnt('poly'),'rect',cnt('rect'),'bgimgs',M.pages.reduce((a,p)=>a+p.items.filter(i=>i.bgi).length,0),'caps',M.pages.reduce((a,p)=>a+p.items.filter(i=>i.t==='txt'&&i.f==='B'&&i.s>20).length,0));
o.push('capText',M.pages.some(p=>p.items.some(i=>i.text&&/La llegada al faro/.test(i.text))),'si',M.pages.some(p=>p.items.some(i=>i.si===1)));
const pdf=await pdfDoc(s);const d=await PDFLib.PDFDocument.load(pdf);o.push('pdfOK',d.getPageCount(),Math.round(pdf.length/1024)+'KB');
const ep=buildEpubFiles(s,{uid:'x'});o.push(ep['OEBPS/c2.xhtml'].replace(/\s+/g,' ').slice(150,520));o.push('epubCap',/class="cap">La llegada/.test(ep['OEBPS/c1.xhtml']),'top',(()=>{const c=ep['OEBPS/c2.xhtml'];return c.indexOf('<img')>c.indexOf('3.4')&&c.indexOf('<img')<c.indexOf('4.0')})());
// UI
bkDesignSheet();await wait(900);o.push('design',['Tipo de letra','Letra capital','Más: color del papel, marco y fondo'].every(t=>document.body.innerText.includes(t)));
const pn=M.pages.find(p=>p.items.some(i=>i.si!==undefined)).num;bkPreviewSheet(pn);await wait(1500);
const im=[...document.querySelectorAll('img[role=button]')];o.push('tapImgs',im.length);
if(im.length){im[0].click();await wait(150);o.push('imgSheet',document.body.innerText.includes('Esta imagen en el libro'));
const cb=[...document.querySelectorAll('label.chk')].find(l=>/Pasar la imagen a una página nueva/.test(l.textContent));cb.querySelector('input').click();o.push('ipb',Object.values(s.lay).some(x=>x.ipb));
[...document.querySelectorAll('button')].find(x=>/volver al libro/.test(x.textContent)).click();await wait(1500);o.push('back',document.body.innerText.includes('Ver como libro'))}
return o});
console.log(JSON.stringify(r),errs);
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/book3.png'});await b.close()})()
