const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(700);
const r=await p.evaluate(async()=>{const o=[];window.confirm=()=>true;
const s={id:'r1',title:'R',syn:'x',genre:'M',genres:['M'],scenes:[],lore:[],turn:0,at:1,state:{},opts:[],premise:'p',ce:[],memory:'m0'};LIB.length=0;LIB.push(s);cur=s;
for(let k=0;k<5;k++){s.prev={memory:s.memory,last:s.last,turn:s.turn,state:JSON.parse(JSON.stringify(s.state)),now:s.now,opts:s.opts,fin:false,ls:s.ls,len:s.scenes.length,lore:0};
 s.scenes.push({a:'a'+k,t:'Escena texto '+k,d:Date.now()});pvKeep(s,s.scenes[k]);s.memory='m'+(k+1);s.turn=k+1;s.state={n:k+1}}
o.push('pv',s.scenes.map(x=>!!x.pv).join());
const ok=rewindTo(2);o.push('ok',ok,'len',s.scenes.length,'mem',s.memory,'turn',s.turn,'st',JSON.stringify(s.state),'prev',!!s.prev);
o.push('noRewind0',rewindTo(s.scenes.length-1));
rewindSheet();await new Promise(r=>setTimeout(r,300));o.push('sheet',document.body.innerText.includes('Volver a una escena anterior'));
const bt=[...document.querySelectorAll('button')].filter(x=>/^Escena \d+:/.test(x.textContent));o.push('btns',bt.length);bt[0].click();await new Promise(r=>setTimeout(r,300));o.push('asked',/Confirmar/.test(document.body.innerText));[...document.querySelectorAll('button')].find(x=>x.textContent==='Volver').click();await new Promise(r=>setTimeout(r,300));o.push('after',s.scenes.length,s.memory);
o.push('btnExists',!!document.getElementById('rewb'));
for(let k=0;k<50;k++){s.prev={memory:'x',state:{},len:s.scenes.length,lore:0};s.scenes.push({t:'z',d:1});pvKeep(s,s.scenes[s.scenes.length-1])}
o.push('pvCount',s.scenes.filter(x=>x.pv).length,s.scenes.length,s.scenes.map(x=>x.pv?1:0).join(''));return o});
console.log(JSON.stringify(r),errs);await b.close()})()
