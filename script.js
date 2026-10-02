const menu=document.querySelector(".menu"), nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));

const words=["AI systems.","computer vision.","machine learning.","Python projects.","things that move."];
let wi=0,ci=0,deleting=false;
const typing=document.getElementById("typing");
function type(){
  const word=words[wi];
  typing.textContent=deleting?word.slice(0,--ci):word.slice(0,++ci);
  let speed=deleting?45:75;
  if(!deleting && ci===word.length){speed=1200;deleting=true}
  else if(deleting && ci===0){deleting=false;wi=(wi+1)%words.length;speed=300}
  setTimeout(type,speed);
}
type();

const canvas=document.getElementById("codeRain"),ctx=canvas.getContext("2d");
let w,h,cols,drops;
const chars="01{}[]<>/\\\\=+-*AI$#@;:PYTHON";
function resize(){
  w=canvas.width=innerWidth*devicePixelRatio; h=canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  ctx.font=`${13*devicePixelRatio}px monospace`; cols=Math.floor(w/(14*devicePixelRatio));
  drops=Array.from({length:cols},()=>Math.random()*-80);
}
function rain(){
  ctx.fillStyle="rgba(3,5,11,.09)";ctx.fillRect(0,0,w,h);
  ctx.fillStyle="#00f5ff";
  for(let i=0;i<cols;i++){
    const x=i*14*devicePixelRatio,y=drops[i]*14*devicePixelRatio;
    ctx.globalAlpha=.18+Math.random()*.35;
    ctx.fillText(chars[Math.floor(Math.random()*chars.length)],x,y);
    if(y>h && Math.random()>.975)drops[i]=0;
    drops[i]+=.45;
  }
  ctx.globalAlpha=1;requestAnimationFrame(rain);
}
resize();addEventListener("resize",resize);rain();

const glow=document.querySelector(".cursor-glow");
addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-tilt]").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

const links=[...document.querySelectorAll(".nav nav a")];
const sections=[...document.querySelectorAll("main section[id]")];
addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
