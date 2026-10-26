const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const o=await p.evaluate(async()=>{
 const st={id:'q1',title:'N',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:[{t:'x',m:{},o:[],st:{}}],lore:[],mem:null,ce:[],turn:1,state:{},opts:[]};
 LIB.push(st);openStory(st);await new Promise(r=>setTimeout(r,300));
 renderRead(); const rd=$('rdbody').textContent.includes('Sonido ambiente');
 const set=$('setbody').textContent;
 return {rd,pmode:/Modo de juego/.test(set),bible:/Biblia de la historia/.test(set),count:set.length};});
console.log(JSON.stringify(o),errs);await b.close()})();
