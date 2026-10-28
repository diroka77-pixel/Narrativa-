const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{LIB.length=0;const s={id:'y1',title:'T',syn:'El vampiro mestizo Diroka.',genre:'Fantasía Épica',genres:[],scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[],vocab:[{from:'vampiro',to:'tenebrio'}]};LIB.push(s);save();renderLib();const o=[document.querySelector('#hero .syn').textContent];
openStory(s);const ta=[...document.querySelectorAll('#imgbody textarea')][0];ta.value='Nueva sinopsis';[...document.querySelectorAll('#imgbody button')].find(x=>x.textContent==='Guardar sinopsis').click();o.push(s.syn,document.querySelector('#hero .syn').textContent);return o});
console.log(JSON.stringify(r),errs);await b.close()})()
