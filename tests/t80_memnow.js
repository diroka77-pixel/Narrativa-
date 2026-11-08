const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const sc=t=>({t,m:{},d:1});const sc2=[];
sc2.push(sc('Marta prometió buscar el anillo del abuelo en el faro.'));
for(let i=0;i<14;i++)sc2.push(sc('Eliot y Marta caminaron por la playa bajo la lluvia número '+i+'.'));
const s={id:'m1',title:'T',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:sc2,lore:[{tipo:'protagonista',nombre:'Marta',desc:'d',voz:'Seca.'},{tipo:'personaje',nombre:'Eliot',desc:'d'}],turn:15,at:1,state:{},opts:[],premise:'p'};
LIB.push(s);cur=s;sample=true;const m=ensureMem(s);
m.pend.push({id:'p1',text:'Marta prometió buscar el anillo del abuelo en el faro',sc:1,open:true});
m.pend.push({id:'p2',text:'Eliot debe dinero al tabernero',sc:14,open:true});
getChar(m,'Marta',1).voice='Habla de usted, seco.';
o.push('forgot',JSON.stringify(pendForgotten(s).map(x=>[x.p.id,x.idle])),/ASUNTOS OLVIDADOS[^\n]*anillo/.test(forgotCtx(s)));
o.push('voice',/Habla de usted, seco/.test(voiceCtx(s,false)),(voiceCtx(s,false).match(/VOZ DE LOS/g)||[]).length);
let pr=[];ask=async(q)=>{pr.push(q);if(/TRES giros/.test(q))return {text:JSON.stringify({giros:[{titulo:'La carta',desc:'Llega una carta.'},{titulo:'Risa',desc:'Un momento tierno.'},{titulo:'Disparo',desc:'Un disparo.'}]})};return {text:JSON.stringify({escena:'Llegó la carta.',memoria:'m',opciones:['a','b','c'],mem:{},estado:{}})}};
view('story');render();
o.push('btns',!document.getElementById('twist').hidden,!document.getElementById('memnow').hidden);
memNowSheet();await wait(100);o.push('sheetTxt',document.body.innerText.includes('lleva 13 escenas')||document.body.innerText.includes('sin mencionarse'));
// add pinned fact
const ni=[...document.querySelectorAll('input')].find(x=>/anillo está en el fondo/.test(x.placeholder));ni.value='El anillo está en el fondo del mar.';
[...document.querySelectorAll('button')].find(x=>x.textContent==='Añadir y clavar').click();await wait(100);
o.push('pinned',m.ev.filter(e=>e.pin).length,/fondo del mar/.test(memCtx(s,'x',0)));
closeSheet&&closeSheet();
twistSheet();await wait(300);o.push('twistBtns',[...document.querySelectorAll('button')].filter(x=>/—/.test(x.textContent)).length);
[...document.querySelectorAll('button')].find(x=>/^La carta —/.test(x.textContent)).click();await wait(900);
o.push('scenes',s.scenes.length,'a',s.scenes[s.scenes.length-1].a,pr.some(x=>/GIRO ELEGIDO/.test(x)));
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
