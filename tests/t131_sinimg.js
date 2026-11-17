const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>k==='downloads'?{save:async(o)=>{window.__saved.push(o)}}:null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:author',JSON.stringify({name:'DJ Rodríguez',skipAsk:true}))});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};
 const mk=c=>{const cv=document.createElement('canvas');cv.width=300;cv.height=450;const g=cv.getContext('2d');g.fillStyle=c;g.fillRect(0,0,300,450);return cv.toDataURL('image/jpeg')};
 const s={id:'n',title:'Neón',syn:'x',genre:'Ciencia ficción',genres:[],cover:mk('#a02'),back:mk('#024'),scenes:[{t:'Uno. '.repeat(80),m:{},img:mk('#0a0')},{t:'Dos. '.repeat(80),m:{},img:mk('#00a')}],lore:[{tipo:'personaje',nombre:'Sora',desc:'d',img:mk('#555'),inb:true}],turn:2,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'',lay:{1:{sz:'o'}}};
 LIB.length=0;LIB.push(s);openStory(s);
 const cnt=async m=>{const v=expView(s,m);const f=buildEpubFiles(v,{uid:'x',author:'DJ'});const jp=Object.keys(f).filter(k=>/\.jpg$/.test(k)).sort().join(',');const opf=f['OEBPS/content.opf'];
   const L=bookLayout(v,(await bookFonts(v)).f);const imgs=L.pages.reduce((a,pg)=>a+pg.items.filter(i=>i.t==='img').length,0);const fb=fb2Doc(v);const fbi=(fb.match(/<binary /g)||[]).length;
   return jp+'|'+/name="cover"/.test(opf)+'|'+/<img class="cv"/.test(f['OEBPS/title.xhtml'])+'|'+imgs+'|'+fbi+'|'+L.pages.some(pg=>pg.kind==='ovl');};
 o.all=await cnt('all');o.cov=await cnt('cov');o.txt=await cnt('txt');
 o.intact=!!s.scenes[0].img&&!!s.cover&&!!s.back&&s.lay[1].sz==='o'&&!!s.lore[0].img;
 // UI + export real
 const se=document.getElementById('expimg');o.ui=se.options.length;se.value='txt';se.onchange();o.mode=expMode();
 await exportAs('pdf');await exportAs('fb2');await exportAs('epub');o.saved=window.__saved.map(x=>x.filename).join(',');
 o.reg=s.reg&&s.reg.ex&&s.reg.ex.length;
 return o});
console.log(JSON.stringify(r));
const ok=r.all.startsWith('OEBPS/back.jpg,OEBPS/cover.jpg,')&&/\|true\|true\|/.test(r.all)&&r.cov==='OEBPS/back.jpg,OEBPS/cover.jpg|true|true|2|2|false'&&r.txt==='|false|false|0|0|false'&&r.intact&&r.ui===3&&r.mode==='txt'&&r.saved.split(',').length===3&&r.reg>=1;
if(!ok||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK exportar sin imágenes');await b.close()})()
