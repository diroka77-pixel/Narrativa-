const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>k==='downloads'?{save:async(o)=>{window.__saved.push({name:o.filename,data:o.data})}}:null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const c=document.createElement('canvas');c.width=300;c.height=450;c.getContext('2d').fillRect(0,0,300,450);const IMG=c.toDataURL('image/jpeg');
 const sc=[];for(let i=0;i<5;i++)sc.push({t:('Escena '+i+'. Texto. ').repeat(80),m:{},a:i?'x':''});
 const s={id:'e',title:'Neón y Colmillos',syn:'x',genre:'Ciencia ficción',genres:[],cover:IMG,scenes:sc,lore:[],turn:5,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'m'};
 LIB.length=0;LIB.push(s);openStory(s);
 const pr=exportAs('epub');await wait(300);o.ask=/¿Con qué nombre firmas este libro\?/.test($('gsheet').textContent)&&!!btn('#gsheet','Exportar sin nombre');
 document.querySelector('#gsheet input[type=text]').value='DJ Rodríguez';btn('#gsheet','Guardar').click();await pr;await wait(800);
 o.saved=window.__saved.map(x=>x.name).join(',');
 const z=await JSZip.loadAsync(window.__saved[0].data);const opf=await z.file('OEBPS/content.opf').async('string');const ti=await z.file('OEBPS/title.xhtml').async('string');const cr=z.file('OEBPS/creditos.xhtml');
 o.creator=(opf.match(/<dc:creator>([^<]*)/)||[])[1];o.title=/DJ Rodríguez/.test(ti);o.cred=!!cr&&/© \d{4} DJ Rodríguez/.test(await cr.async('string'));o.spine=/<itemref idref="title"\/><itemref idref="cred"\/>/.test(opf);
 const cov=await z.file('OEBPS/cover.jpg').async('uint8array');o.stamped=cov.length!==dataBytes(IMG).length;
 // segunda exportación: ya no pregunta
 window.__saved=[];await exportAs('epub');await wait(300);o.noask=window.__saved.length===1&&$('gmodal').hidden;
 // PDF con cabecera de autor
 window.__saved=[];await exportAs('pdf');await wait(300);o.pdf=window.__saved.length===1;
 // sin nombre y "Exportar sin nombre": no vuelve a preguntar
 const a=authGet();delete a.name;authSet(a);window.__saved=[];const pr2=exportAs('epub');await wait(300);btn('#gsheet','Exportar sin nombre').click();await pr2;await wait(500);o.skip=window.__saved.length+'|'+!!authGet().skipAsk;window.__saved=[];await exportAs('epub');await wait(300);o.skip2=window.__saved.length+'|'+$('gmodal').hidden;
 return o});
console.log(JSON.stringify(r));
if(!r.ask||r.creator!=='DJ Rodríguez'||!r.title||!r.cred||!r.spine||!r.stamped||!r.noask||!r.pdf||r.skip!=='1|true'||r.skip2!=='1|true')fail('autor epub');
if(errs.length)fail('err');console.log('OK autor en EPUB');await b.close()})()
