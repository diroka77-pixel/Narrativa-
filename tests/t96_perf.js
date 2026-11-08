const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o=[];LIB.length=0;
const lorem='Marta repasaba las cartas que nadie se atrevía a leer en voz alta. —¿Qué buscas ahí dentro? —preguntó Eliot desde la puerta—. Llevas toda la noche sin dormir. Ella no contestó; fuera, el mar seguía igual de negro y de inmenso que aquella noche de otoño. ';
const sc=[];for(let i=0;i<300;i++)sc.push({t:Array.from({length:3},(_,k)=>lorem.repeat(3)).join('\n\n'),m:{},d:1});
const s={id:'big',title:'Larga',syn:'x',genre:'M',genres:['M'],scenes:sc,lore:[],turn:300,at:1,state:{},opts:[],premise:'p',ce:[],book:{font:'lora'}};LIB.push(s);cur=s;
let t=performance.now();const bf=await bookFonts(s);o.push('fontsMs',Math.round(performance.now()-t));
t=performance.now();const M=bookLayout(s,bf.f);o.push('layoutMs',Math.round(performance.now()-t),'pages',M.pages.length);
t=performance.now();const pdf=await pdfDoc(s);o.push('pdfMs',Math.round(performance.now()-t),'MB',(pdf.length/1048576).toFixed(2));
const box=document.createElement('div');box.style.width='340px';document.body.appendChild(box);const st=document.createElement('p');
t=performance.now();await layPreview(box,st,s);o.push('previewMs',Math.round(performance.now()-t),'pagesShown',box.querySelectorAll('div[style*="box-shadow"]').length);
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
