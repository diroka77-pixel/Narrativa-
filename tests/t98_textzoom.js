const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const z of [1,1.3]){
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
// simular textZoom: forzar tamaño mínimo de fuente de Chromium no es igual; se escala font-size de spans via CSS zoom en probe
await p.evaluate((z)=>{const old=document.createElement.bind(document);const f=Element.prototype.getBoundingClientRect;Element.prototype.getBoundingClientRect=function(){const r=f.call(this);if(this.style&&this.style.fontSize==='100px'&&this.textContent==='Hg'){return {height:r.height*z,width:r.width*z}}return r}},z);
const r=await p.evaluate(async(z)=>{const s={id:'z',title:'T',genre:'Ciberpunk',genres:[],scenes:[],lore:[],book:{}};
 const bf=await bookFonts(s);if(bf.fam)await hvFaces(bf.fam);const M=bookLayout(laySample(s),bf.f);
 const d=bkRenderPage(M.pages.filter(p=>p.kind==='text')[0],0.8,false,M.o);document.body.appendChild(d);
 const sp=d.querySelector('span');return [hvTextZoom(),sp.style.fontSize,M.pages.filter(p=>p.kind==='text')[0].items.find(i=>i.t==='txt').s*0.8]},z);
console.log(z,JSON.stringify(r));if(z>1&&!(parseFloat(r[1])<r[2]*0.9)){console.log('FALLA zoom');process.exit(1)}}
await b.close()})()
