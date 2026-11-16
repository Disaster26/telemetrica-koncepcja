(function(){
var d=document,b=d.body;
var y=d.getElementById('rok');if(y)y.textContent=new Date().getFullYear();
/* menu */
var bu=d.querySelector('.burger');
function zamknij(){b.classList.remove('menu-otw');bu.setAttribute('aria-expanded','false');}
bu.addEventListener('click',function(){var o=b.classList.toggle('menu-otw');bu.setAttribute('aria-expanded',o?'true':'false');});
d.querySelectorAll('.panel a').forEach(function(a){a.addEventListener('click',zamknij);});
d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});
/* fale sygnału z obiektywu kamery (motyw anteny z logo) */
var hero=d.querySelector('.hero'),img=hero.querySelector('.foto'),g=d.getElementById('fale'),mq=matchMedia('(max-width:760px)');
function fale(){
 var W=hero.clientWidth,H=hero.clientHeight,src=mq.matches?hero.querySelector('source'):img;
 var iw=mq.matches?1200:1800,ih=mq.matches?1350:1100,fx=+src.dataset.fx,fy=+src.dataset.fy;
 var s=Math.max(W/iw,H/ih),dw=iw*s,dh=ih*s,px=mq.matches?.38:.5,py=mq.matches?0:.5;
 var x=(W-dw)*px+fx*dw,yy=(H-dh)*py+fy*dh,u=Math.max(26,dw*.03),h='';
 var R=[u*1.5,u*2.7,u*4.1],SW=[3.4,3,2.6];
 for(var i=0;i<3;i++){var r=R[i],a1=148*Math.PI/180,a2=232*Math.PI/180;
  var x1=x+r*Math.cos(a1),y1=yy-r*Math.sin(a1),x2=x+r*Math.cos(a2),y2=yy-r*Math.sin(a2);
  h+='<path class="f f'+(i+1)+'" stroke-width="'+SW[i]+'" d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'A'+r.toFixed(1)+' '+r.toFixed(1)+' 0 0 0 '+x2.toFixed(1)+' '+y2.toFixed(1)+'"/>';}
 g.innerHTML=h;
}
requestAnimationFrame(function(){requestAnimationFrame(fale);});var rt;addEventListener('resize',function(){cancelAnimationFrame(rt);rt=requestAnimationFrame(fale);});
/* przesuwanie kart myszą */
d.querySelectorAll('[data-tor]').forEach(function(t){
 var down=false,sx=0,sl=0,moved=false;
 t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||t.scrollWidth<=t.clientWidth)return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft;t.style.scrollSnapType='none';});
 addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;t.scrollLeft=sl-dx;});
 addEventListener('pointerup',function(){if(!down)return;down=false;t.style.scrollSnapType='';});
 t.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
 t.addEventListener('dragstart',function(e){e.preventDefault();});
});
/* aktywne menu */
var linki=d.querySelectorAll('.nav a,.panel a.p'),sek=['oferta','system','jak','firma','kontakt'].map(function(i){return d.getElementById(i);});
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){linki.forEach(function(a){a.classList.toggle('akt',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
 sek.forEach(function(s){io.observe(s);});
 /* pasek mobilny po przewinięciu za przyciski hero */
 var mob=d.getElementById('mob'),ak=d.querySelector('.hero .akcje'),kt=d.getElementById('kontakt');
 var za=false,wk=false;
 function ust(){mob.classList.toggle('widac',za&&!wk);}
 new IntersectionObserver(function(en){za=!en[0].isIntersecting&&en[0].boundingClientRect.top<0;ust();}).observe(ak);
 new IntersectionObserver(function(en){wk=en[0].isIntersecting;ust();},{rootMargin:'0px 0px -40% 0px'}).observe(kt);
 /* mapa przy przewinięciu */
 var m=d.getElementById('mapa');
 new IntersectionObserver(function(en,o){if(en[0].isIntersecting){var f=d.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu - Telemetrica';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);o.disconnect();}},{rootMargin:'300px'}).observe(m);
}
/* formularz pokazowy */
var f=d.getElementById('form');
f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('info').style.display='block';});
})();
