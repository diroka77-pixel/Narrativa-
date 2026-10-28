const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
LIB.length=0;const s={id:'v9',title:'T',syn:'Un vampiro y dos vampiras.',genre:'Fantasía Épica',genres:[],scenes:[{t:'El vampiro miró. Los vampiros callaron.',m:{},a:'ataco al vampiro'},{t:'Otra.',m:{}}],lore:[{tipo:'protagonista',nombre:'Diroka',desc:'Diroka es un vampiro de sexo masculino.'}],turn:2,at:1,state:{},opts:['Hablar con el vampiro'],premise:'Premisa vampiro',prot:[],ce:[],memory:'Un vampiro fundador',wl:[{id:'a',h:'Vampiros',t:'Los vampiros eran antiguos.',rev:1,pin:false,on:true}]};
s.mem={chars:{diroka:{name:'Diroka',desc:'vampiro fundador',want:'matar al vampiro',alias:[],first:0,last:1}},pend:[],facts:[]};
LIB.push(s);save();openStory(s);
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
document.getElementById('atlbox').open=true;ATL.tab='voc';renderAtlas();
const box=document.getElementById('atlbody');const ins=box.querySelectorAll('input[type=text]');ins[0].value='vampiro';ins[1].value='tenebrio';
[...box.querySelectorAll('button')].find(x=>x.textContent==='Añadir').click();await wait(300);
const j=JSON.stringify(s);o.push(/vampir/i.test(j.replace(/"vocab":\[[^\]]*\]/,'')),JSON.stringify(s.vocab));
o.push(s.syn,s.scenes[0].t,s.scenes[0].a,s.lore[0].desc,s.memory,s.wl[0].t,s.opts[0]);
// editar carta
renderLore();const eb=[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='Editar');eb.click();
const f=document.querySelector('#lorebody textarea');f.value='Nueva descripción';
document.querySelector('#lorebody input[type=text]').value='Diroka II';
[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='Guardar').click();
o.push(s.lore[0].nombre,s.lore[0].desc);
o.push(getComputedStyle(document.getElementById('menu')).display);
return o});
console.log(JSON.stringify(r,null,1),errs);await b.close()})()
