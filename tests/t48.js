const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__tts=[];window.claude={use:async k=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('narrador:read:v1',JSON.stringify({size:18,tone:'noche',font:'serif',rate:1,voice:'gem',gv:'Aoede'}));
window.hvTTSReady=()=>true;window.hvTTS=async(t,v,st)=>{window.__tts.push([t.length,v,st.slice(0,30)]);if(window.__flaky&&window.__tts.length%2===1&&!window.__okOnce){window.__okOnce=1;throw{code:'rate_limited',message:'429'}}if(window.__fail&&window.__tts.length>=2)throw{message:'Límite de Gemini.'};const n=12000,u=new Int16Array(n);for(let i=0;i<n;i++)u[i]=Math.sin(i/20)*8000;let s='';const by=new Uint8Array(u.buffer);for(let i=0;i<by.length;i++)s+=String.fromCharCode(by[i]);return{data:btoa(s),rate:24000}}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(300);
await p.evaluate(()=>{const para=['Las luces de la ciudad se apagaron una a una. Nadie dijo nada durante un largo rato, y el viento arrastraba papeles por la avenida vacía.'.repeat(3),'Elena cerró la puerta con cuidado. Sabía que a partir de ahora nada sería igual, aunque todavía no podía explicar por qué.'.repeat(3)].join('\n\n');const sc=[{t:para,m:{},o:[],st:{}}];const st={id:'q1',title:'T',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:sc,lore:[],mem:null,ce:[],turn:1,state:{},opts:['a']};LIB.push(st);openStory(st)});await p.waitForTimeout(500);
await p.evaluate(()=>startTalk());await p.waitForTimeout(2500);
const r=await p.evaluate(()=>({gem:TS.gem,on:TS.on,calls:window.__tts.length,chunks:TS.gq&&TS.gq.length,first:window.__tts[0]}));console.log(JSON.stringify(r));
await p.evaluate(()=>document.getElementById('listen').click());console.log('paused',await p.evaluate(()=>[TS.paused,GA.ctx.state]));
await p.evaluate(()=>document.getElementById('listen').click());console.log('resumed',await p.evaluate(()=>[TS.paused,GA.ctx.state]));
await p.waitForTimeout(3500);console.log('end',await p.evaluate(()=>[TS.on,TS.gem,window.__tts.length]));
// fallo -> vuelve al sistema
await p.evaluate(()=>{window.__fail=true;window.__tts=[];startTalk()});await p.waitForTimeout(2500);
console.log('fail',await p.evaluate(()=>[TS.gem,TS.native,TS.on,window.__tts.length]));
await p.evaluate(()=>{GEM_WAIT=[0,300,300,300];window.__fail=false;window.__flaky=true;window.__tts=[];GA.cache={};startTalk()});await p.waitForTimeout(3500);console.log('retry',await p.evaluate(()=>[TS.gem,window.__tts.length,TS.on]));
console.log('errs',errs);await b.close()})();
