const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
LIB.length=0;const s={id:'w1',title:'T',syn:'x',genre:'Fantasía Épica',genres:[],scenes:[{t:'Los tenebrios caminaban de noche por la ciudad.',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.push(s);save();openStory(s);
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
const big='La caída de las razas\n\nHace mil años los elfos y los tenebrios gobernaban el mundo. Los tenebrios se alimentaban de la luz de la luna y los elfos del bosque.\n\nEl gran cisma\n\nUna guerra dividió a los tenebrios y a los humanos. Los humanos quedaron sin magia.';
const parts=wlSplit(big);o.push(parts.map(x=>x.h));
s.wl=parts.map((x,i)=>({id:'a'+i,h:x.h,t:x.t,rev:i==0?1:2,pin:false,on:true}));
s.wl.push({id:'p',h:'Regla de oro',t:'La magia siempre cobra un precio.',rev:1,pin:true,on:true});
renderWl();
o.push(wlCtx(s,'Hablo con el tenebrio sobre los elfos',false).replace(/\n/g,' ').slice(0,420));
o.push(wlAvail(s).length);
s.scenes.push({t:'x'});s.ce=[2];o.push(chCur(s),wlAvail(s).length);
o.push(document.getElementById('wlcount').textContent,document.querySelectorAll('#wlbody button').length);
return o});
console.log(JSON.stringify(r,null,1),errs);await b.close()})()
