const {chromium}=require('playwright');const fs=require('fs');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const c=document.createElement('canvas');c.width=600;c.height=900;const g=c.getContext('2d');const gr=g.createLinearGradient(0,0,0,900);gr.addColorStop(0,'#3a0a2a');gr.addColorStop(1,'#0a1a3a');g.fillStyle=gr;g.fillRect(0,0,600,900);g.fillStyle='#ff3fa4';g.font='bold 60px Georgia';g.textAlign='center';g.fillText('NEÓN Y',300,120);g.fillText('COLMILLOS',300,190);g.fillStyle='#35e0ff';g.beginPath();g.arc(300,500,160,0,7);g.fill();const IMG=c.toDataURL('image/jpeg',.9);
 const sc=[];for(let i=0;i<4;i++)sc.push({t:'Escena '+i+'. Diroka avanzó hacia la terminal. '.repeat(6),m:{},a:i?'x':''});
 const s={id:'f',title:'Neón y Colmillos: La Sangre de los Mestizos',syn:'x',genre:'Ciencia ficción',genres:[],cover:IMG,covSigned:false,scenes:sc,lore:[],turn:4,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'m',book:{sep:'ast'}};
 LIB.length=0;LIB.push(s);openStory(s);
 // sin nombre: no firma
 o.k0=stampKey(s)===''&&covUrl(s)===IMG;
 const a=authGet();a.name='DJ Rodríguez';authSet(a);
 const u=await stampCover(s);o.stamped=/^data:image\/jpeg/.test(u)&&u!==IMG&&covUrl(s)===u;window.__u=u;
 // EPUB
 const f=buildEpubFiles(s,{uid:'x'});const cv=f['OEBPS/cover.jpg'];o.epubcov=cv&&cv.length>1000&&cv.length!==dataBytes(IMG).length;
 const chap=Object.keys(f).filter(k=>/OEBPS\/c\d+\.xhtml/.test(k)).map(k=>f[k]).join('');o.ast=/\* \* \*|class="sep">\*/.test(chap);o.gap=/class="gap"/.test(chap);
 o.sel=bkOf(s).sep;
 // elección explícita de asteriscos sí se respeta
 s.book.sep='ast';s.book.sepv2=1;const f2=buildEpubFiles(s,{uid:'x'});o.astExplicit=/\* \* \*/.test(Object.keys(f2).filter(k=>/c\d+\.xhtml/.test(k)).map(k=>f2[k]).join(''));delete s.book.sepv2;s.book.sep='ast';
 // PDF libro: portada firmada
 const pd=await pdfDoc(s);o.pdf=pd&&pd.length>5000;
 // opción desactivada
 const a2=authGet();a2.stamp=false;authSet(a2);o.off=covUrl(s)===IMG;a2.stamp=true;a2.stampPos='arriba';authSet(a2);const u2=await stampCover(s);o.top=u2!==u;window.__u2=u2;
 // hoja de ajustes
 bylineSheet();await wait(400);o.sheet=!!document.querySelector('#gsheet select')&&document.querySelector('#gsheet select').value==='arriba'&&[].slice.call(document.querySelectorAll('#gsheet label.chk')).length===2;o.prev=document.querySelector('#gsheet img').style.display;closeSheet();
 return o});
console.log(JSON.stringify(r,null,1));
if(!r.k0||!r.stamped||!r.epubcov)fail('firma');if(r.ast||!r.gap||r.sel!=='espacio'||!r.astExplicit)fail('separador '+r.ast+r.gap+r.sel+r.astExplicit);
if(!r.pdf||!r.off||!r.top||!r.sheet||r.prev!=='block')fail('resto');
if(process.env.SHOT){const u=await p.evaluate(()=>window.__u);fs.writeFileSync(process.env.SHOT,Buffer.from(u.split(',')[1],'base64'));}
if(errs.length)fail('err');console.log('OK firma y separador');await b.close()})()
