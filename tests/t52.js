const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__q=[];window.claude={use:async k=>k==='sample'?async q=>{window.__q.push(String(q));const n=window.__q.length;return{text:JSON.stringify({escena:'Kaelen avanzó por el pasillo '+n+'. La luz de neón vibraba sobre las paredes mojadas.\n\nDetrás, algo respiraba.',opciones:['[Seguro] Esconderse tras el contenedor','[Arriesgado] Forzar la puerta del sótano','[Temerario] Saltar sobre la cosa que respira'],memoria:'Kaelen explora.',estado:{salud:100,peligro:50},rpg:{recupera:false},mem:{eventos:[{que:'Kaelen entra',donde:'pasillo',quien:['Kaelen'],consecuencia:''}]}})}}:null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(300);
const r1=await p.evaluate(async()=>{
 const sc=[{t:'Antes.',m:{},o:[],st:{}}];const par={id:'novel1',title:'Neón y Colmillos',syn:'s',premise:'Un vampiro y una hacker.',genre:'Ciberpunk',genres:['Ciberpunk'],scenes:sc,lore:[{tipo:'personaje',nombre:'Kaelen',desc:'Vampiro.'}],prot:[{name:'Kaelen'}],memory:'Kaelen robó el núcleo.',ce:[],turn:1,state:{},opts:[],at:5};LIB.push(par);
 const c=rpgFrom(par,'normal','Sed');openStory(c);await new Promise(r=>setTimeout(r,800));
 return {rpg:c.rpg&&[c.rpg.cred,c.rpg.hp,c.rpg.b2n,c.rpg.parent],title:c.title,scenes:c.scenes.length,hud:!document.getElementById('rpghud').hidden,opts:[...document.querySelectorAll('#opts button')].map(x=>x.textContent),firstPrompt:__q[0].indexOf('MODO RPG')>=0&&__q[0].indexOf('CANON DE LA NOVELA')>=0,roll1:!!c.scenes[0].roll,hp:c.rpg.hp,b2:c.rpg.b2}});
console.log(JSON.stringify(r1));
await p.screenshot({path:SP+'rpg1.png'});
// forzar dado = 3 (fallo en Arriesgado)
await p.evaluate(()=>{rpgRnd=function(){return 3}});
await p.click('#opts button:nth-child(2)');await p.waitForTimeout(900);
const r2=await p.evaluate(()=>{const s=cur,l=s.scenes[s.scenes.length-1];return{scenes:s.scenes.length,roll:l.roll,hp:s.rpg.hp,b2:s.rpg.b2,salud:s.state.salud,line:document.querySelector('.rollline')&&document.querySelector('.rollline').textContent,prompt:__q[__q.length-1].indexOf('FALLO: la acción no funciona')>=0,regen:[document.getElementById('regen').hidden,document.getElementById('regen').textContent],act:l.a}});
console.log(JSON.stringify(r2));
// repetir tirada con dado 15 (pleno en arriesgado)
await p.evaluate(()=>{rpgRnd=function(){return 15}});
await p.click('#regen');await p.waitForTimeout(900);
const r3=await p.evaluate(()=>{const s=cur,l=s.scenes[s.scenes.length-1];return{scenes:s.scenes.length,roll:l.roll&&[l.roll.d,l.roll.tier,l.roll.risk],cred:s.rpg.cred,hp:s.rpg.hp,b2:s.rpg.b2}});
console.log(JSON.stringify(r3));
// muerte
await p.evaluate(()=>{cur.rpg.hp=5;rpgRnd=function(){return 2}});
await p.click('#opts button:nth-child(3)');await p.waitForTimeout(1200);
console.log('down',await p.evaluate(()=>({hp:cur.rpg.hp,sheet:!document.getElementById('gmodal').hidden,title:document.querySelector('#gsheet h2')&&document.querySelector('#gsheet h2').textContent,btns:[...document.querySelectorAll('#gsheet button')].map(x=>x.textContent)})));
await p.screenshot({path:SP+'rpg2.png'});
await p.click('#gsheet button:has-text("Levantarte")');await p.waitForTimeout(300);
console.log('revive',await p.evaluate(()=>[cur.rpg.hp,cur.rpg.cred,document.getElementById('gmodal').hidden]));
// sync
const r5=await p.evaluate(()=>{const par=LIB.filter(x=>x.id==='novel1')[0];par.lore.push({tipo:'lugar',nombre:'La Torre',desc:'Sede.'});const n=rpgSync(cur,false);const k=rpgSync(cur,true);return[n,k,cur.lore.map(x=>x.nombre),rpgSync(cur,false)]});
console.log('sync',JSON.stringify(r5));
// libreria: chip y menu
await p.evaluate(()=>{goHome()});await p.waitForTimeout(200);
console.log('chip',await p.evaluate(()=>[...document.querySelectorAll('#list .chip')].map(x=>x.textContent)));
console.log('errs',errs);await b.close()})();
