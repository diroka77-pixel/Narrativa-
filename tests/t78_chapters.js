const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
LIB.length=0;const sc=(t)=>({t,m:{},d:1});
const s={id:'c1',title:'T',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[sc('Uno.'),sc('Dos.'),sc('Tres. Fin del capítulo.')],lore:[],turn:3,at:1,state:{},opts:[],premise:'p',cmode:'yo',ce:[3]};
LIB.push(s);cur=s;sample=true;
let prompts=[];ask=async(q)=>{prompts.push(q);return {text:JSON.stringify({escena:'Marta abrió la puerta del faro y la luz la cegó un instante, tal como había escrito el autor.',memoria:'m',opciones:['a','b','c'],mem:{cierra_capitulo:true},estado:{}})}};
openStory&&0;view('story');render();
o.push('panel',!!document.querySelector('.opener'),'ctrlHidden',document.getElementById('ctrl').hidden);
document.querySelector('.opener input').value='La llegada';document.querySelector('.opener textarea').value='Marta abre la puerta del faro y la luz la ciega.';
[...document.querySelectorAll('.opener button')].find(x=>/Usar mi texto/.test(x.textContent)).click();
await wait(800);
const l=s.scenes[s.scenes.length-1];
o.push('scenes',s.scenes.length,'orig',l.orig,'op',l.op,'ce',JSON.stringify(s.ce),'ctit',JSON.stringify(s.mem&&s.mem.ctit),'noclose',s.ce.length===1);
o.push('promptHasText',/COMIENZO DEL CAPÍTULO 2 ESCRITO/.test(prompts[0]),/ESCRITOR decide/.test(prompts[0]));
o.push('panelGone',!document.querySelector('.opener'),'btnOrig',!![...document.querySelectorAll('#book button')].find(x=>/texto original/.test(x.textContent)));
origSheet(s.scenes.length-1);await wait(100);
o.push('sheet',document.body.innerText.includes('Mi texto original'));
[...document.querySelectorAll('button')].find(x=>/Quedarme con mi texto original/.test(x.textContent)).click();
o.push('restored',l.t);
o.push('stats',regStats(s).ops);
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
