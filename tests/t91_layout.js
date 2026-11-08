const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const res=[];
for(const [W,H] of [[320,568],[360,640],[412,915],[844,390]]){
const p=await b.newPage({viewport:{width:W,height:H}});p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const o={};
const over=()=>document.documentElement.scrollWidth>window.innerWidth+1;
o.lib=over();startCreate("");await w(200);o.create=over();
const sc=[{t:'Texto '.repeat(60),d:1,a:'x'},{t:'Más texto '.repeat(60),d:1}];const s={id:'v1',title:'V',syn:'x',genre:'M',genres:['M'],scenes:sc,lore:[],turn:2,at:1,state:{},opts:[],premise:'p',ce:[]};LIB.push(s);cur=s;view('play');render();await w(200);o.play=over();
helpSheet2('play');await w(300);o.help=over();
const sh=document.querySelector('.psheet');o.sheetFits=sh?sh.scrollWidth<=sh.clientWidth+1:null;closeSheet();
const hq=$("hq").getBoundingClientRect(),br=document.querySelector('.brand').getBoundingClientRect();o.hqOverlap=!(hq.left>=br.right||hq.right<=br.left);
const tb=$("tabs").getBoundingClientRect();o.tabsVisible=tb.bottom<=window.innerHeight+1;return o});
res.push(W+'x'+H+' '+JSON.stringify(r));await p.close()}
console.log(res.join('\n'),errs);await b.close()})()
