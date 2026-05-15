(async ()=>{
function normalizeScriptType(type){
return (type||'text/javascript').trim().toLowerCase();
}
async function fetchPartial(url){
const clean=String(url||'').trim();
const noLead=clean.replace(/^\/+/,'');
const rootRelative='/'+noLead;
const basePath=location.pathname.replace(/[^/]*$/,'');
const baseRelative=basePath+noLead;
const absoluteFromDoc=(()=>{
try{
return new URL(clean,document.baseURI).toString();
}catch{
return '';
}
})();
const candidates=Array.from(new Set([
clean,
noLead,
'./'+noLead,
baseRelative,
rootRelative,
absoluteFromDoc
].filter(Boolean)));
let lastError;
for (const candidate of candidates){
try{
const res=await fetch(candidate);
if (!res.ok) throw new Error(`HTTP ${res.status} - ${candidate}`);
return await res.text();
}catch (err){
lastError=err;
}
}
throw lastError||new Error(`Failed to fetch partial: ${clean}`);
}
const isFileProtocol=location.protocol==='file:';
const isLocalDev=['localhost','127.0.0.1',''].includes(location.hostname);
const slots=Array.from(document.querySelectorAll('[data-include]'));
if (!slots.length){
document.dispatchEvent(new Event('partials-ready'));
return;
}
if (isFileProtocol){
console.error('[loader] Running on file://. Partials cannot be fetched reliably without an HTTP server (use Live Server or __STR5__).');
const first=slots[0];
if (first){
first.insertAdjacentHTML('beforebegin',
'<p style=__STR6__>[loader] Open this site via http:// (Live Server) instead of file:// to load partial sections.</p>');
}
slots.forEach(slot=>slot.remove());
document.dispatchEvent(new Event('partials-ready'));
return;
}
await Promise.all(slots.map(async slot=>{
const url=slot.dataset.include;
try{
const html=await fetchPartial(url);
const tmp=document.createElement('div');
tmp.innerHTML=html;
tmp.querySelectorAll('script').forEach(orig=>{
const scriptType=normalizeScriptType(orig.getAttribute('type'));
if (scriptType==='application/ld+json'){
return;
}
if (orig.src){
const copy=document.createElement('script');
for (const attr of orig.attributes) copy.setAttribute(attr.name,attr.value);
orig.replaceWith(copy);
return;
}
orig.remove();
});
const frag=document.createDocumentFragment();
while (tmp.firstChild) frag.appendChild(tmp.firstChild);
slot.replaceWith(frag);
}catch (err){
console.error('[loader] Failed to load partial:',err.message);
if (isLocalDev){
slot.insertAdjacentHTML('afterend',
`<p style="color:red;font-family:monospace;padding:1rem">[loader error] ${err.message}</p>`);
}
slot.remove();
}
}));
document.dispatchEvent(new Event('partials-ready'));
})();