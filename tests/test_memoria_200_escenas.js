const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];window.__sizes=[];
 const CH=['Marta','Joaquín','Lucía','Bruno','Elena','Tomás','Irene','Samuel'];
 window.claude={use:async k=>k==='sample'?async q=>{
  if(q.startsWith('Eres un revisor'))return{text:'{"ok":true,"problema":""}'};
  if(q.includes('editor de continuidad'))return{text:'{"problemas":[]}'};
  const i=cur.scenes.length+1;__prompts.push(q);
  const a=CH[i%8],c2=CH[(i*3+1)%8];
  const mem={eventos:[{que:'Suceso '+i+' E'+i+(i===12?' con la traición de la taberna del Gallo':' de '+a+' y '+c2+' en lugar'+(i%9)),donde:'lugar'+(i%9),quien:[a,c2],consecuencia:'efecto'+i}],
   personajes:[{nombre:a,ubicacion:'lugar'+(i%9),emocion:'ánimo'+(i%5),sabe:(i%5===0)?[{dato:'secreto S'+i+' de '+a,tipo:'secreto',origen:'oído'}]:[]},{nombre:c2,ubicacion:'lugar'+(i%9)}],
   objetos:(i%6===0)?[{nombre:'objeto-O'+(i/6),dueno:a,lugar:'lugar'+(i%9),estado:'intacto'}]:[],
   mundo:[{clave:'Clave'+(i%30),valor:'valor '+i}],
   pendientes:[].concat(i%10===3?[{id:'p'+i,texto:'Promesa P'+i+' pendiente de '+a,accion:'abre'}]:[], (i%10===3&&i>=40&&((i-3)/10)%4!==0)?[{id:'p'+(i-30),accion:'cierra'}]:[]),
   tiempo:'día '+Math.ceil(i/4),recursos:['recurso único '+i+' de '+a]};
  if(i%5===0)mem.resumen_capitulo='Resumen del capítulo '+(i/5)+' con el hito H'+(i/5)+' y '+a+' ante '+c2;
  if(i%50===0)mem.resumen_acto='Resumen del acto '+(i/50)+' con el giro G'+(i/50)+' y la alianza de '+a;
  return{text:JSON.stringify({escena:'Escena '+i+': '+a+' habló con '+c2+' en lugar'+(i%9)+' sobre el asunto '+(i*7919%1000)+' y el sello '+(i*104729%997)+'.\n\n—Esto cambia lo del '+(i*31%503)+' —dijo '+c2+'.',opciones:['a','b','c'],memoria:'arco '+i,estado:{salud:90},mem,fin:false})}}:null}});
await p.goto('file:///home/claude/v08/assets/index.html');await p.waitForTimeout(400);
await p.evaluate(()=>{RD.type=false;const s={id:'42',title:'Prueba larga',syn:'s',genre:'Misterio',genres:['Misterio'],premise:'p',lore:[{tipo:'protagonista',nombre:'Marta',desc:'detective'}],prot:[{name:'Marta'}],memory:'',last:'',turn:0,state:{},scenes:[],opts:[],fin:false,prev:null,review:false};LIB.push(s);openStory(s)});
await p.waitForTimeout(300);
const N=200;
for(let i=1;i<N;i++){await p.evaluate(async i=>{await turn('[ACCIÓN] Marta y '+['Joaquín','Lucía','Bruno','Elena'][i%4]+' siguen adelante '+i,'sigo '+i)},i);
 if([10,50,100,150,199].includes(i))await p.evaluate(()=>{const q=__prompts[__prompts.length-1];const j=q.indexOf('MEMORIA ESTRUCTURADA (verdad');__sizes.push([cur.scenes.length,q.length,q.length-j])});}
// consulta final con acción sobre Marta y el Gallo
await p.evaluate(async()=>{await turn('[ACCIÓN] Marta recuerda la traición de la taberna del Gallo y se enfrenta a Joaquín','recuerda')});
const r=await p.evaluate(()=>{const q=__prompts[__prompts.length-1],m=cur.mem;const j=q.indexOf('MEMORIA ESTRUCTURADA (verdad');const ctx=q.slice(j);
 const open=m.pend.filter(x=>x.open);const has=t=>ctx.indexOf(t)>=0;
 const sec=Object.keys(m.chars).map(k=>m.chars[k]).filter(c=>c.name==='Marta')[0].know.filter(x=>x.k==='secreto');
 return {scenes:cur.scenes.length,ctxLen:ctx.length,promptLen:q.length,sizes:__sizes,
  openTotal:open.length,openInCtx:open.filter(x=>has(x.text)).length,
  martaSecrets:sec.length,martaSecretsInCtx:sec.filter(x=>has(x.t)).length,
  gallo:has('traición de la taberna del Gallo'),
  items:Object.keys(m.items).length,itemFirst:has('objeto-O1:'),itemLast:has('objeto-O33:'),
  acts:Object.keys(m.acts),actsInCtx:Object.keys(m.acts).filter(k=>has('Acto '+k+' ')).length,
  hito3:has('H3'),hito39:has('H39'),chapters:Object.keys(m.chap).length,
  storeKB:Math.round(JSON.stringify(LIB).length/1024),events:m.ev.length,motifs:m.motifs.length,charsN:Object.keys(m.chars).length,
  knowMax:Math.max(...Object.keys(m.chars).map(k=>m.chars[k].know.length))}});
console.log(JSON.stringify(r,null,1));console.log('errores',errs);await b.close()})();
