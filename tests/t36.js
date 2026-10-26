const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null};
 let folder=null,writes=0;window.__w=()=>writes;
 window.hvBackup={available:true,status:async()=>({folder,last:folder&&writes?Date.now()-2*86400000:0}),choose:async()=>{folder='Drive';return{ok:true}},write:async()=>{writes++;return{ok:true,name:'x.json'}},list:async()=>[],read:async()=>'',clear:async()=>{folder=null}}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const o=await p.evaluate(async()=>{
 const sc=[];for(let i=0;i<7;i++)sc.push({t:'x',m:{},o:[],st:{}});
 const st={id:'q1',title:'N',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:sc,lore:[],mem:null,ce:[],turn:7,state:{},opts:[]};
 LIB.push(st);const r={};
 await bkNudge();await new Promise(r=>setTimeout(r,200));r.sheet=/Protege tu crónica/.test($('gsheet').textContent);
 [...$('gsheet').querySelectorAll('button')].find(b=>/Elegir carpeta/.test(b.textContent)).click();await new Promise(r=>setTimeout(r,300));
 r.writes=window.__w();await bkLabel();r.label=$('dbackup').textContent;
 await bkNudge();r.noRepeat=$('gmodal').hidden;return r;});
console.log(JSON.stringify(o),errs);await b.close()})();
