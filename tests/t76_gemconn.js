const {chromium}=require('playwright');
async function run(seq){
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
  await p.addInitScript((seq)=>{
    window.__calls=[];window.__seq=seq.slice();
    window.Native={storeLoadAll:()=>JSON.stringify({'hv:ai:v1':JSON.stringify({mode:'gemini',keys:{},models:{}}),'hv:welcome':'1'}),storeSet(){},storeRemove(){},secretGet:k=>k==='key_gemini'?'AIzaFAKE':'',secretSet(){},toast(t){window.__toast=t},online:()=>true,
      http:(id,url,h,b)=>{window.__calls.push(url.split('/').pop().split('?')[0]);const r=window.__seq.length?window.__seq.shift():[200,'{}'];setTimeout(()=>window.__httpDone(id,r[0],r[1]),20)},
      copy(){},paste(){return ''},storeSetBlob(){} };
  },seq);
  await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(6500);
  const o=await p.evaluate(()=>({txt:(document.getElementById('hvstat')||{}).textContent,calls:window.__calls.slice()}));
  await p.evaluate(()=>{window.dispatchEvent(new Event('online'))});await p.waitForTimeout(3000);
  o.after=await p.evaluate(()=>({txt:(document.getElementById('hvstat')||{}).textContent,calls:window.__calls.slice()}));
  o.errs=errs;await b.close();return o;
}
(async()=>{
  console.log('A 503 luego 200:',JSON.stringify(await run([[503,'{}'],[200,'{}']])));
  console.log('B 0,0 y luego online:',JSON.stringify(await run([[0,'Unable to resolve host'],[0,'Unable to resolve host'],[200,'{}']])));
  console.log('C 429:',JSON.stringify(await run([[429,'{}']])));
  console.log('D clave mala:',JSON.stringify(await run([[403,'{"error":{"message":"API key not valid"}}']])));
})()
