const {chromium}=require('playwright');const fs=require('fs');
const OUT=process.argv[2]||'/tmp/hv_font';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(/ERR/.test(m.text()))console.log('PG:',m.text())});
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const fonts=['crimson','lora','plex','liberation'];const res={};
for(const f of fonts){
 const r=await p.evaluate(async(f)=>{const o=[];LIB.length=0;
  const lorem='—¿Qué has hecho, murciélago ciudadano? —preguntó Marta, mirando por la ventana del faro—. ¡Nunca construiremos nada así! La biblioteca estaba extraordinariamente tranquila aquella mañana de otoño, y el viejo guardián, acompañado de su inseparable pingüino, repasaba sin prisa los volúmenes que nadie había vuelto a abrir desde hacía años. ';
  const sc=[];for(let i=0;i<6;i++)sc.push({t:Array.from({length:3},(_,k)=>lorem.repeat(3)+' '+i+'.'+k).join('\n\n'),m:{},d:1});
  const s={id:'f1',title:'El faro: ñandú y ¿qué?',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:sc,lore:[],turn:6,at:1,state:{},opts:[],premise:'p',ce:[3],book:{font:f}};
  LIB.push(s);cur=s;const bf=await bookFonts(s);o.push('fam',bf.fam,'fell',bf.fell);
  const pdf=await pdfDoc(s);o.push('kb',Math.round(pdf.length/1024));
  const M=bookLayout(s,bf.f);let hy=0;M.pages.forEach(p=>p.items.forEach(i=>{if(i.t==='txt'&&/\w-$/.test(i.text))hy++}));o.push('hyphens',hy,'pages',M.pages.length);
  return {o,b64:btoa(String.fromCharCode.apply(null,Array.from(pdf.slice(0,0)))) , len:pdf.length, data:Array.from(pdf).length>0?null:null, raw:await (async()=>{let bin='';const u=pdf;for(let i=0;i<u.length;i+=8192)bin+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(bin)})()};
 },f);
 fs.writeFileSync(OUT+'/'+f+'.pdf',Buffer.from(r.raw,'base64'));res[f]=r.o;
}
console.log(JSON.stringify(res),errs);await b.close()})()
