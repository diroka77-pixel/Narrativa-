const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:author',JSON.stringify({name:'D. J. Rodríguez'}))});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};
 const s={id:'c',title:'Neón y Colmillos',syn:'x',genre:'Ciencia ficción',genres:[],scenes:[{t:'Las gotas de lluvia ácida. '.repeat(30),m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);
 const f=buildEpubFiles(s,{uid:'x',author:'D. J. Rodríguez'});o.css=/\.cred\{[^}]*break-after:page/.test(f['OEBPS/style.css'])&&/\.pg\{page-break-before:always/.test(f['OEBPS/style.css']);
 o.cred=/<div class="pg"><div class="cred">/.test(f['OEBPS/creditos.xhtml'])&&!/Capítulo/.test(f['OEBPS/creditos.xhtml']);
 const L=bookLayout(s,(await bookFonts(s)).f);
 const txt=pg=>pg.items.filter(i=>i.t==='txt').map(i=>i.text).join(' ');
 const ci=L.pages.findIndex(pg=>/derechos reservados/.test(txt(pg)));o.ci=ci;o.only=ci>=0&&!/Capítulo|lluvia/.test(txt(L.pages[ci]));
 o.next=L.pages.slice(ci+1).some(pg=>/Capítulo 1|lluvia/.test(txt(pg)));
 return o});
console.log(JSON.stringify(r));
if(!r.css||!r.cred||!r.only||!r.next||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK créditos');await b.close()})()
