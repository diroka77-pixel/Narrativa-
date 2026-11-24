const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:homecover','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const cv=document.createElement('canvas');cv.width=30;cv.height=45;cv.getContext('2d').fillRect(0,0,30,45);const IMG=cv.toDataURL('image/jpeg');
 const s={id:'w',title:'T',syn:'x',genre:'Ciencia ficción',genres:[],cover:IMG,scenes:[{t:'Hola mundo, ¿qué tal? *Pienso* luego existo.',m:{}},{t:'—Sí —dijo Diroka—. Uno dos tres.',m:{}},{t:'Cuatro cinco.',m:{}}],lore:[],turn:3,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[2],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);await wait(200);
 o.pill=$('wcpill').textContent;o.bg=document.body.classList.contains('bgcov')&&$('bgart').style.backgroundImage.indexOf(IMG.slice(0,40))>=0;
 $('wcpill').click();await wait(50);o.sheet=$('gsheet').textContent;
 s.scenes.push({t:'Otra palabra más.',m:{}});render(true);o.pill2=$('wcpill').textContent;
 localStorage.setItem('hv:homecover','0');reTheme();o.off=!document.body.classList.contains('bgcov');
 return o});
console.log(JSON.stringify(r));
if(!(r.pill==='✍ 15 palabras'&&r.bg&&/15 palabras/.test(r.sheet)&&/Capítulo 1\s*13/.test(r.sheet)&&/Capítulo 2\s*2/.test(r.sheet)&&r.pill2==='✍ 18 palabras'&&r.off)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK palabras y fondo');await b.close()})()
