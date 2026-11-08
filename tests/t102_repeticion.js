const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(()=>{
 const A='Diroka llevaba el módulo corporativo sujeto en la mano izquierda, mientras la cicatriz del ojo derecho palpitaba con un latido sordo. Los pasos metálicos de los refuerzos resonaban a espaldas de la compuerta sellada, buscando un blanco entre los conductos de vapor.\n\n—Venid a por mí —murmuró Diroka, agazapándose junto al quicio de una tubería rota.\n\nUn dron de reconocimiento dobló la esquina con el haz de los sensores barriendo el suelo mojado.';
 const B='El módulo corporativo pesaba con fuerza en su mano izquierda. Los enemigos avanzaban acompasados, ignorando los charcos de condensación y buscando un ángulo de tiro limpio en el estrecho pasillo.\n\n—Venid a por mí —dijo Diroka, con una calma absoluta que desafiaba el acoso de la red.\n\nLa primera descarga de energía iluminó el pasillo con un fulgor cegador.';
 const C='Una lluvia fina golpeaba los cristales del almacén mientras Marta contaba las cajas de repuestos una a una. Nadie había vuelto a la nave desde la inspección del invierno.\n\n—¿Quién dejó abierta la ventana del fondo? —preguntó.';
 const s={id:'r',title:'T',genre:'Ciberpunk',genres:[],scenes:[{t:A,m:{}}],lore:[],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};
 const rb=redund(s,B), rc=redund(s,C);
 return {dial:rb.dial,par:rb.par.length,cdial:rc.dial.length,cpar:rc.par.length,ctx:/DIÁLOGOS RECIENTES/.test(build(s,'miro','',false))}});
console.log(JSON.stringify(r));
if(r.dial.length!==1)fail('dialogo no detectado');
if(r.par<1)fail('parrafo parecido no detectado');
if(r.cdial||r.cpar)fail('falso positivo');
if(!r.ctx)fail('prompt');
if(errs.length)fail('errores');console.log('OK repeticion');await b.close()})()
