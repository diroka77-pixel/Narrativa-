const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};
 const mk=(w,h)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').fillRect(0,0,w,h);return cv.toDataURL('image/jpeg')};
 const s={id:'e',title:'Neón',syn:'x',genre:'Ciencia ficción',genres:[],scenes:[{t:'Uno.',m:{},img:mk(600,400)},{t:'Dos.',m:{},img:mk(400,600)},{t:'Tres.',m:{},img:mk(600,400)}],lore:[],turn:3,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'',lay:{2:{sz:'s'}}};
 LIB.length=0;LIB.push(s);openStory(s);
 const html=()=>{const f=buildEpubFiles(s,{uid:'x'});return {c:Object.keys(f).filter(k=>/c\d+\.xhtml$/.test(k)).map(k=>f[k]).join(''),css:f['OEBPS/style.css']}};
 let h=html();o.auto=(h.c.match(/class="fpg"/g)||[]).length+'|'+(h.c.match(/class="c fig"/g)||[]).length+'|'+/class="si sm"/.test(h.c);
 o.css=/img\.si\{[^}]*width:100%/.test(h.css)&&/\.fpg\{[^}]*min-height:92vh/.test(h.css);
 localStorage.setItem('hv:eimg','page');h=html();o.page=(h.c.match(/class="fpg"/g)||[]).length;
 localStorage.setItem('hv:eimg','wide');h=html();o.wide=(h.c.match(/class="fpg"/g)||[]).length;
 o.sel=document.getElementById('eimg').options.length;
 return o});
console.log(JSON.stringify(r));
if(!(r.auto==='1|2|true'&&r.css&&r.page===2&&r.wide===0&&r.sel===3)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK ilustraciones EPUB');await b.close()})()
