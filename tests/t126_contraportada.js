const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>k==='downloads'?{save:async(o)=>{window.__saved.push({name:o.filename,data:o.data})}}:null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const mk=c=>{const cv=document.createElement('canvas');cv.width=300;cv.height=450;const g=cv.getContext('2d');g.fillStyle=c;g.fillRect(0,0,300,450);return cv.toDataURL('image/jpeg')};
 const sc=[];for(let i=0;i<3;i++)sc.push({t:('Escena '+i+'. ').repeat(60),m:{}});
 const s={id:'b',title:'Neón y Colmillos',syn:'Un vampiro roba un módulo.',genre:'Ciencia ficción',genres:[],cover:mk('#a02'),scenes:sc,lore:[],turn:3,at:Date.now(),state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'m',blurb:'En una ciudad que nunca duerme, Diroka roba lo que no debía.'};
 LIB.length=0;LIB.push(s);openStory(s);
 // sin nombre: pregunta antes del prompt
 const pr=makePrompt('cover');await wait(200);o.ask=/¿Con qué nombre firmas/.test($('gsheet').textContent);document.querySelector('#gsheet input[type=text]').value='DJ Rodríguez';btn('#gsheet','Guardar').click();await pr;await wait(100);
 o.cover=$('ptxt').value;$('pclose').click();
 // contraportada con IA mirando la portada
 let calls=[];sample=async(q,op)=>{calls.push({q:q,img:!!(op&&op.image)});return {text:'Fondo de callejón en penumbra con neones rojos y cian, lluvia, mismo acabado metálico del título.'}};
 await makePrompt('back');await wait(100);o.back=$('ptxt').value;o.tit=$('ptit').textContent;o.calls=calls.length+'|'+calls[0].img+'|'+/PORTADA/.test(calls[0].q);
 // sin visión: reintenta sin imagen
 calls=[];sample=async(q,op)=>{calls.push({img:!!(op&&op.image)});if(op&&op.image)throw {code:'no_vision',message:'x'};return {text:'Fondo sobrio.'}};await makePrompt('back');await wait(100);o.novis=calls.map(c=>c.img).join(',')+'|'+/Fondo sobrio\./.test($('ptxt').value);$('pclose').click();
 // subir contraportada (simulado), EPUB, galería, PDF
 s.back=mk('#024');save();
 const f=buildEpubFiles(s,{uid:'x',author:'DJ Rodríguez'});const opf=f['OEBPS/content.opf'];o.epub=!!f['OEBPS/back.jpg']+'|'+/<itemref idref="back"\/><\/spine>/.test(opf)+'|'+/back\.xhtml/.test(f['OEBPS/nav.xhtml']||'');
 o.gal=galItems(s).map(x=>x.c).slice(0,2).join(',');
 const L=bookLayout?null:null;const by=await pdfDoc(s);const d=await PDFLib.PDFDocument.load(by);o.pdfPages=d.getPageCount();
 delete s.back;const d2=await PDFLib.PDFDocument.load(await pdfDoc(s));o.pdfDiff=o.pdfPages-d2.getPageCount();
 // panel de imágenes
 s.back=mk('#024');imgPanel($('imgbody'),true);o.panel=!!btn('#imgbody','Prompt para la contraportada')+'|'+!!btn('#imgbody','Quitar contraportada')+'|'+/Cambiar contraportada/.test($('imgbody').textContent);
 return o});
console.log(JSON.stringify(r,null,1));
if(!r.ask||!/nombre del autor «DJ Rodríguez», escrito exactamente así/.test(r.cover)||!/misma familia tipográfica, color y acabado que el título/.test(r.cover))fail('portada');
if(r.tit!=='Prompt para la contraportada'||!/^Contraportada de novela\. Fondo de callejón/.test(r.back)||!/CONTRAPORTADA de esa misma novela/.test(r.back)||!/«En una ciudad que nunca duerme, Diroka roba lo que no debía\.»/.test(r.back)||!/«Neón y Colmillos» en pequeño/.test(r.back)||!/«DJ Rodríguez»/.test(r.back)||r.calls!=='1|true|true')fail('contraportada '+r.calls);
if(r.novis!=='true,false|true')fail('sin visión '+r.novis);
if(r.epub!=='true|true|true'||r.gal!=='Neón y Colmillos,Contraportada'||r.pdfDiff!==1||r.panel!=='true|true|true')fail('resto '+r.epub+' '+r.gal+' '+r.pdfDiff+' '+r.panel);
if(errs.length)fail('err');console.log('OK contraportada');await b.close()})()
