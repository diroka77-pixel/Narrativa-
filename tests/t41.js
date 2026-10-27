const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
await p.evaluate(()=>{const sc=[{t:'Texto de la escena. '.repeat(30),m:{},o:[],st:{}}];const st={id:'q1',title:'N',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:sc,lore:[],mem:null,ce:[],turn:1,state:{},opts:['a'] };LIB.push(st);openStory(st)});
await p.waitForTimeout(500);await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/play.png',fullPage:false});await b.close()})();
