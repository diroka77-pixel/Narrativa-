const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 o.h1=htmlToStarText('<p>Diroka pensó: <i>no voy a volver</i>. Y salió.</p><p>Otra <span style="font-style:italic">línea</span> <span style="font-style:italic">seguida</span>.</p>');
 o.h2=htmlToStarText('<b>Docs</b><span style="font-weight:400;font-style:italic">Maldita sea,</span><span> dijo.</span><br>Fin');
 const s={id:'c',title:'T',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Inicio.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);
 // pegar en el cuadro
 btn('#modes','Texto completo sin modificar').click();const ta=$('own');ta.focus();
 const dt=new DataTransfer();dt.setData('text/html','<p>Pensó: <em>esto es una trampa</em>, y calló.</p>');dt.setData('text/plain','Pensó: esto es una trampa, y calló.');
 ta.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));o.ta=ta.value;
 $('do').click();await wait(300);
 const last=document.getElementById('sc-1');o.dom=last.querySelector('em')?last.querySelector('em').textContent:'';o.stars=/\*/.test(last.textContent);
 s.scenes.push({t:'Separador * * * y *dos palabras* juntas.\n\n*Párrafo entero en cursiva, largo para varias líneas del libro impreso que sigue y sigue.*',m:{}});
 const f=buildEpubFiles(s,{uid:'x'});const c=Object.keys(f).filter(k=>/c\d+\.xhtml$/.test(k)).map(k=>f[k]).join('');
 o.epub=/<em>esto es una trampa<\/em>/.test(c)&&/\* \* \*/.test(c)&&/<em>dos palabras<\/em>/.test(c);
 o.fb2=/<emphasis>dos palabras<\/emphasis>/.test(fb2Doc(s));
 const L=bookLayout(s,(await bookFonts(s)).f);const its=[].concat.apply([],L.pages.map(pg=>pg.items.filter(i=>i.t==='txt')));
 const ital=its.filter(i=>i.f==='I').map(i=>i.text).join(' ');o.pdfI=ital;o.pdfStar=its.some(i=>/\*(?=\w)|\w\*/.test(i.text));
 const d=await PDFLib.PDFDocument.load(await pdfDoc(s));o.pdf=d.getPageCount()>0;
 return o});
console.log(JSON.stringify(r,null,1));
const ok=r.h1==='Diroka pensó: *no voy a volver*. Y salió.\n\nOtra *línea seguida*.'&&r.h2==='Docs*Maldita sea,* dijo.\nFin'&&r.ta==='Pensó: *esto es una trampa*, y calló.'&&r.dom==='esto es una trampa'&&!r.stars&&r.epub&&r.fb2&&/trampa/.test(r.pdfI)&&/dos palabras/.test(r.pdfI)&&/sigue/.test(r.pdfI)&&!r.pdfStar&&r.pdf;
if(!ok||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK cursiva');await b.close()})()
