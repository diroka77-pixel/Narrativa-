const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async(q)=>JSON.stringify({c:[{o:'Las puertas estaba abiertas de par en par',f:'Las puertas estaban abiertas de par en par',t:'concordancia',m:'sujeto plural'}]})};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const T='Llegó al pueblo  y miró  el cielo,que estaba gris.entonces habló y sonrió. rápido habló con el guardia de el faro.\n- ¿Dónde esta Marta? dijo Lira.\n\nEl el viento soplaba... Las puertas estaba abiertas de par en par. Fue a el muelle.\n\n—¿Quién eres, dijo él.';
const r=await p.evaluate(async(T)=>{const s={id:'v',title:'T',syn:'x',genre:'Misterio',genres:[],scenes:[{t:T,m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.length=0;LIB.push(s);openStory(s);
 await spellLoad();const o={};const L=rvLocal(s,T,spKnown(s));o.kinds=L.map(x=>x.why);o.n=L.length;
 reviewScene(0);await new Promise(r=>setTimeout(r,600));
 o.sheet=/Revisar esta escena/.test(document.getElementById('gsheet').textContent);
 [].slice.call(document.querySelectorAll('#gsheet button')).filter(b=>/correcciones seguras/.test(b.textContent))[0].click();
 o.after=s.scenes[0].t;o.t0=s.scenes[0].t0===T;return o},T);
console.log(JSON.stringify(r,null,0));
const need=['Espacios de más','Tres puntos','Palabra repetida','«de el»','«a el»','Después de punto va mayúscula','Falta un espacio después de «,»','Falta un espacio después del punto','Los diálogos empiezan','Hay un «¿» sin su «?»'];
need.forEach(k=>{if(!r.kinds.some(w=>w.includes(k)))fail('falta '+k)});
if(!r.sheet)fail('hoja');
if(/del faro/.test(r.after)===false||/al muelle/.test(r.after)===false||/\.\.\./.test(r.after)||/  /.test(r.after)||/^El el|\nEl el/.test(r.after))fail('aplicar '+r.after);
if(!r.t0)fail('t0');
// IA
const r2=await p.evaluate(async()=>{window.ask=async()=>({text:JSON.stringify({c:[{o:'Las puertas estaba abiertas de par en par',f:'Las puertas estaban abiertas de par en par',t:'concordancia',m:'sujeto plural'}]})});const s=LIB[0];s.scenes[0].t='Las puertas estaba abiertas de par en par.';reviewScene(0);await new Promise(r=>setTimeout(r,500));
 [].slice.call(document.querySelectorAll('#gsheet button')).filter(b=>/Revisión gramatical con/.test(b.textContent))[0].click();await new Promise(r=>setTimeout(r,800));
 const ap=[].slice.call(document.querySelectorAll('#gsheet button')).filter(b=>b.textContent==='Aplicar')[0];if(!ap)return 'sin propuesta '+document.getElementById('gsheet').textContent.slice(0,200);ap.click();return s.scenes[0].t});
console.log(r2);if(r2!=='Las puertas estaban abiertas de par en par.')fail('ia '+r2);
if(errs.length)fail('errores');console.log('OK revisar');await b.close()})()
