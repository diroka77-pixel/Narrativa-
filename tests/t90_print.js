const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o=[];const w=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
function mk(wid,hei){const cv=document.createElement('canvas');cv.width=wid;cv.height=hei;const g=cv.getContext('2d');for(let i=0;i<200;i++){g.fillStyle='hsl('+(i*9%360)+',55%,50%)';g.fillRect((i*31)%wid,(i*47)%hei,wid/8,hei/8)}return cv.toDataURL('image/jpeg',0.9)}
const small=mk(300,200),big=mk(2000,1400);
const lorem='La lluvia caía sobre el faro mientras Marta recordaba las palabras de su abuelo. ';
const sc=(i,img)=>({t:Array.from({length:3},(_,k)=>lorem.repeat(4)+i+'.'+k).join('\n\n'),m:{},d:1,img});
const run=async(img,label)=>{LIB.length=0;const s={id:'p'+label,title:'P '+label,syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[sc(0,null),sc(1,img),sc(2,null)],lore:[],turn:3,at:1,state:{},opts:[],premise:'p',ce:[]};LIB.push(s);cur=s;view('play');render();
 layMut(s,1).s='f';const bf=await bookFonts(s);const M=bookLayout(s,bf.f);const lo=bkLowRes(M);o.push(label,'low',lo.length,lo[0]?lo[0].ppp:'-');
 bkPreviewSheet(1);await w(900);o.push(label+'Warn',/poca resolución/.test(document.body.innerText),/200 ppp o más/.test(document.body.innerText));closeSheet();await w(200);
 // pdf embeds original jpeg bytes
 const pdf=await pdfDoc(s);const raw=dataBytes(img).length;o.push(label+'PdfKB',Math.round(pdf.length/1024),'jpgKB',Math.round(raw/1024),'pdfHasJpeg',pdf.length>raw);
 // epub contains identical bytes
 const files=buildEpubFiles(s,{uid:'x'});const k=Object.keys(files).filter(f=>/\.jpe?g$/.test(f));const eb=k.length?files[k[0]]:null;const el2=eb?(eb.length||eb.byteLength||0):0;o.push(label+'EpubImgs',k.length,'sameSize',el2===raw)};
await run(small,'small');await run(big,'big');
// import limits
const src=shrink.toString();o.push('shrinkQ',/0\.88/.test(src));return o});
console.log(JSON.stringify(r),errs);await b.close()})()
