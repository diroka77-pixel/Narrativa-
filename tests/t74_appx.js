const {chromium}=require('playwright');const fs=require('fs');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>({save:async(o)=>{window.__saved.push({n:o.filename,d:Array.from(o.data)})}})};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const mk=(w,h,c)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#123');g.addColorStop(1,c);x.fillStyle=g;x.fillRect(0,0,w,h);return cv.toDataURL('image/jpeg',.8)};
LIB.length=0;const s={id:String(Date.now()),title:'Neón y Colmillos',syn:'x',genre:'Ciberpunk',genres:[],fin:true,scenes:[{t:'Primera escena.',m:{},d:1},{t:'Segunda.',m:{}}],lore:[
{tipo:'protagonista',nombre:'Diroka',desc:'Tenebrio de 1200 años, reservado y astuto. '.repeat(8),img:mk(420,560,'#c63')},
{tipo:'lugar',nombre:'Subniveles de Cromo',desc:'Taller clandestino bajo la megalópolis.',img:mk(560,420,'#36c')},
{tipo:'objeto',nombre:'Módulo de datos',desc:'Sin imagen y sin marcar: no debe salir.'},
{tipo:'personaje',nombre:'Vane',desc:'Sin imagen pero marcada.',inb:true}],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.push(s);save();openStory(s);
const o={};o.cards=appxCards(s).map(c=>c.nombre);o.reader=!!document.querySelector('#book .appx');o.cells=document.querySelectorAll('#book .appxc').length;
document.getElementById('lorebox').open=true;renderLore();o.thumbs=document.querySelectorAll('#lorebody .lorethumb').length;
// editor
[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='+ Nueva carta').click();o.afterNew=s.lore.length;o.editor=!!document.querySelector('#lorebody input[type=file]');
await exportAs('epub');await new Promise(r=>setTimeout(r,800));await exportAs('pdf');await new Promise(r=>setTimeout(r,1200));await exportAs('fb2');await new Promise(r=>setTimeout(r,800));
o.saved=window.__saved.map(x=>x.n+':'+x.d.length);return o});
fs.writeFileSync(SP+'saved2.json',JSON.stringify(await p.evaluate(()=>window.__saved)));
console.log(JSON.stringify(r),errs);await b.close()})()
