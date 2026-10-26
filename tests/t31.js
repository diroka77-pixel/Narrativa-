const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const o=await p.evaluate(async()=>{
 const st={id:'x1',title:'Mi Novela',syn:'SINOPSIS_SECRETA',genres:['fantasía'],scenes:[{t:'Primera escena del libro.'},{t:'Segunda escena.'}],lore:[{nombre:'Zorión',tipo:'personaje',desc:'DESC_LORE'}],mem:{},ce:[]};
 cur=st;
 const f=buildEpubFiles(st);const all=Object.keys(f).map(k=>k+'::'+(typeof f[k]==='string'?f[k]:'')).join('\n');
 const fb=fb2Doc(st);
 const pdf=await pdfDoc(st);
 const bad=['SINOPSIS_SECRETA','Personajes y lugares','Zorión','DESC_LORE','creada con Historias vivas'];
 return {epubFiles:Object.keys(f),epubBad:bad.filter(x=>all.includes(x)),fb2Bad:bad.filter(x=>String(fb).includes(x)),epubText:all.includes('Primera escena'),fb2Text:String(fb).includes('Primera escena'),pdfOk:pdf.length>500,
  prompt:(()=>{try{return build(st,'actúa','',false)}catch(e){return 'ERR '+e.message}})()};
});
o.promptHas=0;
const pr=String(o.prompt);
console.log(JSON.stringify({epubFiles:o.epubFiles,epubBad:o.epubBad,fb2Bad:o.fb2Bad,epubText:o.epubText,fb2Text:o.fb2Text,pdfOk:o.pdfOk,contin:pr.includes('CONTINUIDAD (obligatoria)'),opc:pr.includes('OPCIONES COHERENTES'),errs}));
await b.close()})();
