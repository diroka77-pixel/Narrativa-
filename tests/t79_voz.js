const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const sc=t=>({t,m:{},d:1});
const s={id:'v1',title:'T',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[sc('Marta entró al faro.\n\n—No pienso volver a esa isla, ni aunque me lo ordene usted —dijo Marta—. Se acabó.\n\n—Cálmate —dijo Eliot—. Hablemos con tranquilidad de todo esto.'),sc('Marta miró a Eliot.\n\n—¿Y qué esperabas que hiciera, que me quedara de brazos cruzados? —dijo Marta.')],lore:[{tipo:'protagonista',nombre:'Marta Ruiz',desc:'d',voz:'Seca, de usted, frases cortas.'},{tipo:'personaje',nombre:'Eliot',desc:'d'},{tipo:'lugar',nombre:'Faro',desc:'x'}],turn:2,at:1,state:{},opts:[],premise:'p',rel:[{a:'Marta',b:'Eliot',t:'Se tutean pero ella desconfía de él.'},{a:'Marta',b:'Zed',t:'No sale'}]};
LIB.push(s);cur=s;sample=true;
o.push(JSON.stringify(voiceLines(s,'Marta',3)),JSON.stringify(voiceLines(s,'Eliot',3)));
o.push(voiceCtx(s,false));o.push(relCtx(s));
let pr=[];ask=async(q)=>{pr.push(q);return {text:JSON.stringify({escena:'Escena corregida.',memoria:'m',opciones:['a','b','c'],mem:{},estado:{}})}};
s.prev={len:1,memory:'',last:'',turn:1,state:{},now:null,opts:[],fin:false,ls:0,ce:null,mem:null,lore:3};s.lastAct=['entro','entro'];
view('story');render();
o.push('btn',!document.getElementById('nocuadra').hidden);
noCuadraSheet();await wait(100);document.querySelector('#sheet textarea, .sheet textarea, textarea[aria-label="Qué no cuadra"]').value='Marta no puede saber lo del anillo.';
[...document.querySelectorAll('button')].find(x=>x.textContent==='Enviar').click();await wait(900);
o.push('rules',JSON.stringify(s.rules),'scenes',s.scenes.length,'promptNote',/El autor señala un fallo/.test(pr[0]||''),/VOZ DE LOS PERSONAJES/.test(pr[0]||''),/RELACIONES ENTRE/.test(pr[0]||''),/REGLAS INAMOVIBLES[^\n]*Corrección del autor/.test(pr[0]||''));
renderLore();o.push('relbtn',!![...document.querySelectorAll('#lorebody button')].find(x=>/Relaciones/.test(x.textContent)));
relSheet();await wait(100);o.push('relrows',document.querySelectorAll('#relnames').length);
return o});
console.log(JSON.stringify(r,null,1),errs);await b.close()})()
