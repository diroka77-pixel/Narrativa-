const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{
const bad=['Un escalofrío le recorrió la espalda. Diroka avanzó lentamente, cuidadosamente y silenciosamente, mirando las pantallas parpadeantes, esperando la señal, tecleando sin parar. Las pantallas parpadeantes iluminaban la sala y las pantallas parpadeantes dibujaban sombras sobre el suelo.\n\nDiroka miró la puerta. Diroka respiró hondo. Diroka dio un paso. Diroka apretó los puños. Diroka dijo algo. Diroka calló.\n\nDiroka sintió el frío. Diroka abrió la mano.\n\nEntonces se giró con un gesto brusco de la cabeza hacia la derecha y contuvo el aliento.',
'Se giró con un gesto brusco de la cabeza hacia la izquierda mientras Sora tecleaba. Se giró con un gesto brusco de la cabeza hacia la puerta.','Con un gesto brusco de la cabeza señaló la salida. El aire estaba cargado. Un zumbido sordo llenó la sala.'];
const s={id:'r1',title:'Prueba',syn:'x',genre:'Ciberpunk',genres:[],scenes:bad.map(t=>({t,m:{}})),lore:[],turn:4,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.push(s);save();
const rp=repReport(s,0);return rp.f.map(f=>[f.kind,f.label,f.count,f.scenes.join(',')])});
console.log(JSON.stringify(r,null,0));
await p.evaluate(()=>{openStory(LIB[0]);document.querySelectorAll('details').forEach(d=>d.open=true);ATL.tab='style';ATL.sc='0';renderAtlas()});
const txt=await p.evaluate(()=>document.getElementById('atlbody').textContent.slice(0,200));console.log(txt);
const clean=await p.evaluate(()=>{const s={id:'r2',title:'x',scenes:[{t:'La lluvia caía sobre la ciudad. Marta cerró la puerta y encendió la lámpara. El té estaba frío.'}]};return repScan(s,0,1).length});
console.log('clean',clean,'errs',errs);await b.close()})();
