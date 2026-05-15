let darkSections=[];
let cachedNavbarHeight=68;
function updateNavbarMetrics(navbar){
if (!navbar) return;
const h=Math.round(navbar.getBoundingClientRect().height);
cachedNavbarHeight=h>0 ? h : 68;
}
function refreshDarkSections(){
darkSections=Array.from(document.querySelectorAll('[data-nav-dark]'));
}
function applyNavbarThemeBySection(navbar){
if (!navbar) return;
if (!darkSections.length){
navbar.classList.remove('navbar--on-dark');
return;
}
const navBandTop=0;
const navBandBottom=cachedNavbarHeight;
const onDark=darkSections.some(section=>{
const rect=section.getBoundingClientRect();
return rect.top<navBandBottom&&rect.bottom>navBandTop;
});
navbar.classList.toggle('navbar--on-dark',onDark);
}
function initCore(){
const navbar=document.getElementById('navbar');
const progress=document.getElementById('scrollProgress');
if (!navbar&&!progress) return false;
document.body.style.overflow='';
let ticking=false;
function onScroll(){
if (!ticking){
requestAnimationFrame(()=>{
const scrollY=window.scrollY;
const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
const nav=document.getElementById('navbar');
if (nav) nav.classList.toggle('scrolled',scrollY>60);
if (nav) applyNavbarThemeBySection(nav);
if (progress) progress.style.width=(maxScroll>0 ? (scrollY/maxScroll)*100 : 0)+'%';
ticking=false;
});
ticking=true;
}
}
window.addEventListener('scroll',onScroll,{passive: true});
updateNavbarMetrics(navbar);
refreshDarkSections();
onScroll();
const hamburger=document.getElementById('nav-hamburger');
const mobileMenu=document.getElementById('mobile-menu');
if (hamburger&&mobileMenu){
hamburger.setAttribute('aria-expanded','false');
mobileMenu.setAttribute('aria-hidden','true');
mobileMenu.classList.remove('open');
hamburger.addEventListener('click',()=>{
const isOpen=hamburger.getAttribute('aria-expanded')==='true';
hamburger.setAttribute('aria-expanded',String(!isOpen));
mobileMenu.setAttribute('aria-hidden',String(isOpen));
mobileMenu.classList.toggle('open',!isOpen);
document.body.style.overflow=!isOpen ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a=>{
a.addEventListener('click',()=>{
hamburger.setAttribute('aria-expanded','false');
mobileMenu.setAttribute('aria-hidden','true');
mobileMenu.classList.remove('open');
document.body.style.overflow='';
});
});
window.addEventListener('scroll',()=>{
if (mobileMenu.classList.contains('open')){
hamburger.setAttribute('aria-expanded','false');
mobileMenu.setAttribute('aria-hidden','true');
mobileMenu.classList.remove('open');
document.body.style.overflow='';
}
},{passive: true});
}
document.querySelectorAll('.nav-item-drop').forEach(item=>{
const trigger=item.querySelector('.nav-drop-trigger');
if (!trigger) return;
trigger.addEventListener('click',e=>{
e.stopPropagation();
const isOpen=item.classList.contains('open');
closeAllDropdowns();
if (!isOpen){
item.classList.add('open');
trigger.setAttribute('aria-expanded','true');
}
});
});
function closeAllDropdowns(){
document.querySelectorAll('.nav-item-drop.open').forEach(item=>{
item.classList.remove('open');
const t=item.querySelector('.nav-drop-trigger');
if (t) t.setAttribute('aria-expanded','false');
});
}
document.addEventListener('click',closeAllDropdowns);
document.addEventListener('keydown',e=>{
if (e.key==='Escape'){
const openItem=document.querySelector('.nav-item-drop.open');
if (openItem){
closeAllDropdowns();
const t=openItem.querySelector('.nav-drop-trigger');
if (t) t.focus();
}
}
});
document.querySelectorAll('.mobile-nav-group-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
const targetId=btn.getAttribute('aria-controls');
const target=document.getElementById(targetId);
if (!target) return;
const isOpen=btn.getAttribute('aria-expanded')==='true';
btn.setAttribute('aria-expanded',String(!isOpen));
target.classList.toggle('open',!isOpen);
});
});
document.querySelectorAll('.mobile-nav-city-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
const targetId=btn.getAttribute('aria-controls');
const target=document.getElementById(targetId);
if (!target) return;
const isOpen=btn.getAttribute('aria-expanded')==='true';
btn.setAttribute('aria-expanded',String(!isOpen));
target.classList.toggle('open',!isOpen);
});
});
return true;
window.addEventListener('resize',()=>{
refreshDarkSections();
onScroll();
},{passive: true});
}
function initOnVisible(selector,callback,rootMargin='0px'){
const target=document.querySelector(selector);
if (!target) return;
if (!('IntersectionObserver' in window)){
callback();
return;
}
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if (!entry.isIntersecting) return;
observer.disconnect();
callback();
});
},{rootMargin,threshold: 0.01});
observer.observe(target);
}
function initReveal(){
const reveals=document.querySelectorAll('.reveal');
if (!reveals.length) return;
requestAnimationFrame(()=>requestAnimationFrame(()=>{
if (!('IntersectionObserver' in window)){
reveals.forEach(el=>el.classList.add('visible'));
return;
}
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if (entry.isIntersecting){
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
},{threshold: 0.06,rootMargin: '0px 0px -10px 0px'});
const vh=window.innerHeight;
const revealState=Array.from(reveals,el=>{
const rect=el.getBoundingClientRect();
return{el,inView: rect.top<vh+100&&rect.bottom>0};
});
revealState.forEach(({el,inView})=>{
if (inView){
el.classList.add('visible');
}else{
el.classList.add('will-animate');
observer.observe(el);
}
});
}));
}
function initFaq(){
document.querySelectorAll('.faq-q').forEach(btn=>{
btn.addEventListener('click',()=>{
const expanded=btn.getAttribute('aria-expanded')==='true';
document.querySelectorAll('.faq-q').forEach(b=>{
b.setAttribute('aria-expanded','false');
const a=document.getElementById(b.getAttribute('aria-controls'));
if (a) a.hidden=true;
});
if (!expanded){
btn.setAttribute('aria-expanded','true');
const answer=document.getElementById(btn.getAttribute('aria-controls'));
if (answer) answer.hidden=false;
}
});
});
const moreBtn=document.getElementById('faq-more-btn');
const extraList=document.getElementById('faq-list-extra');
if (moreBtn&&extraList){
moreBtn.addEventListener('click',()=>{
const isExpanded=moreBtn.getAttribute('aria-expanded')==='true';
moreBtn.setAttribute('aria-expanded',String(!isExpanded));
extraList.hidden=isExpanded;
moreBtn.querySelector('.faq-more-label').textContent=
isExpanded ? 'Ver más preguntas' : 'Ver menos preguntas';
const isLocal=['localhost','127.0.0.1',''].includes(location.hostname);
if (isLocal) return;
if (!document.getElementById('zl-widget-s')){
const firstScript=document.getElementsByTagName('script')[0];
if (firstScript&&firstScript.parentNode){
const widgetScript=document.createElement('script');
widgetScript.id='zl-widget-s';
widgetScript.src='https://platform.docplanner.com/js/widget.js';
firstScript.parentNode.insertBefore(widgetScript,firstScript);
}
}
const bindFallbackSync=({container,anchor,fallback,maxTries=30,tickMs=250,readyClass=''})=>{
if (!container||!anchor||!fallback) return;
const hasLiveWidget=()=>{
if (anchor.children.length>0) return true;
if (container.querySelector('iframe')) return true;
if (container.querySelector('[class*=__STR7__], [class*=__STR8__], [id*=__STR9__], [id*=__STR10__]')) return true;
return Array.from(container.children).some(node=>{
const el=node;
return el!==anchor&&el!==fallback&&!el.classList.contains('zl-url');
});
};
const revealLiveWidget=()=>{
if (fallback.style.display!=='none'){
fallback.style.display='none';
}
if (readyClass) container.classList.add(readyClass);
};
if (hasLiveWidget()){
revealLiveWidget();
return;
}
const observer=new MutationObserver(()=>{
if (hasLiveWidget()){
revealLiveWidget();
observer.disconnect();
}
});
observer.observe(container,{childList: true,subtree: true});
let tries=0;
const timer=setInterval(()=>{
if (hasLiveWidget()){
clearInterval(timer);
observer.disconnect();
revealLiveWidget();
return;
}
if (tries>maxTries){
clearInterval(timer);
observer.disconnect();
}
tries+=1;
},tickMs);
};
const anchor=document.getElementById('zl-url-book');
const fallback=document.getElementById('book-widget-static');
const wrapper=document.querySelector('.book-widget-wrap');
bindFallbackSync({
container: wrapper,
anchor,
fallback,
readyClass: 'has-live-widget'
});
}
function initCountUp(){
const nums=document.querySelectorAll('.stats-strip-num[data-target]');
if (!nums.length||!('IntersectionObserver' in window)) return;
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if (!entry.isIntersecting) return;
observer.unobserve(entry.target);
const el=entry.target;
const target=parseInt(el.dataset.target,10);
const prefix=el.dataset.prefix||'';
const suffix=el.dataset.suffix||'';
const duration=1500;
const startTime=performance.now();
function step(now){
const elapsed=now-startTime;
const progress=Math.min(elapsed/duration,1);
const ease=1-Math.pow(1-progress,3);
const current=Math.round(ease*target);
el.textContent=prefix+current+suffix;
if (progress<1) requestAnimationFrame(step);
}
requestAnimationFrame(step);
});
},{threshold: 0.45});
nums.forEach(el=>observer.observe(el));
}
let coreBooted=false;
let contentBooted=false;
function bootCore(){
if (coreBooted) return;
coreBooted=initCore();
}
function initCondTabs(){
const widget=document.getElementById('condTabsWidget');
if (!widget) return;
const tabs=Array.from(widget.querySelectorAll('[data-cond-tab]'));
const panels=Array.from(widget.querySelectorAll('.cond-panel'));
const DURATION=6000;
let current=0;
let rafId=null;
let startTime=null;
let suspended=false;
function activate(idx){
tabs.forEach((t,i)=>{
const on=i===idx;
t.classList.toggle('cond-tab--active',on);
t.setAttribute('aria-selected',on ? 'true' : 'false');
const bar=t.querySelector('.cond-tab-bar');
if (bar) bar.style.width='0%';
});
panels.forEach((p,i)=>{
p.classList.toggle('cond-panel--active',i===idx);
if (i===idx) p.removeAttribute('hidden');
else p.setAttribute('hidden','');
});
current=idx;
if (!suspended) startProgress();
}
function startProgress(){
if (rafId) cancelAnimationFrame(rafId);
startTime=performance.now();
const bar=tabs[current].querySelector('.cond-tab-bar');
function tick(now){
const elapsed=now-startTime;
const pct=Math.min(elapsed/DURATION*100,100);
if (bar) bar.style.width=pct+'%';
if (elapsed<DURATION){
rafId=requestAnimationFrame(tick);
}else{
rafId=null;
activate((current+1) % tabs.length);
}
}
rafId=requestAnimationFrame(tick);
}
tabs.forEach(tab=>{
tab.addEventListener('click',()=>{
suspended=false;
activate(parseInt(tab.dataset.condTab,10));
});
});
widget.addEventListener('mouseenter',()=>{
suspended=true;
if (rafId){cancelAnimationFrame(rafId);rafId=null;}
});
widget.addEventListener('mouseleave',()=>{
suspended=false;
startProgress();
});
activate(0);
}
function initWaWidget(){
const fab=document.getElementById('wa-fab');
const panel=document.getElementById('wa-panel');
const close=document.getElementById('wa-close');
if (!fab||!panel||!close) return;
function openPanel(){
panel.removeAttribute('hidden');
requestAnimationFrame(function (){
requestAnimationFrame(function (){
panel.classList.add('wa-panel--open');
});
});
fab.setAttribute('aria-expanded','true');
close.focus();
}
function closePanel(){
panel.classList.remove('wa-panel--open');
fab.setAttribute('aria-expanded','false');
fab.focus();
setTimeout(function (){panel.setAttribute('hidden','');},240);
}
fab.addEventListener('click',function (){
panel.classList.contains('wa-panel--open') ? closePanel() : openPanel();
});
close.addEventListener('click',closePanel);
document.addEventListener('keydown',function (e){
if (e.key==='Escape'&&panel.classList.contains('wa-panel--open')) closePanel();
});
document.addEventListener('click',function (e){
const widget=document.getElementById('wa-widget');
if (widget&&panel.classList.contains('wa-panel--open')&&!widget.contains(e.target)) closePanel();
});
}
function bootContent(){
if (contentBooted) return;
contentBooted=true;
initReveal();
initFaq();
initServiceCitySwitcher();
initConditionCitySwitcher();
initLocationsSwitcher();
initCondTabs();
initWaWidget();
initOnVisible('.section-stats-strip',initCountUp,'150px 0px');
initOnVisible('#resenas',initReviews,'250px 0px');
const scheduleDoctoralia=()=>initOnVisible('#agendar',initDoctoralia,'300px 0px');
if ('requestIdleCallback' in window){
requestIdleCallback(scheduleDoctoralia,{timeout: 2000});
}else{
setTimeout(scheduleDoctoralia,400);
}
}
const hasIncludes=!!document.querySelector('[data-include]');
if (document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',bootCore,{once: true});
}else{
bootCore();
}
if (hasIncludes){
document.addEventListener('partials-ready',()=>{
bootCore();
refreshDarkSections();
const navbar=document.getElementById('navbar');
if (navbar){
updateNavbarMetrics(navbar);
window.requestAnimationFrame(()=>{
navbar.classList.toggle('scrolled',window.scrollY>60);
window.requestAnimationFrame(()=>{
applyNavbarThemeBySection(navbar);
});
});
}
bootContent();
},{once: true});
}else if (document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',bootContent,{once: true});
}else{
bootContent();
}