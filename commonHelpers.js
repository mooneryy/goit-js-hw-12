import{a as w,S as m,i}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const L="42472601-e2efb745d6431960b7108569a";async function u(a){const t=`https://pixabay.com/api/?key=${L}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`;try{const o=await w.get(t);if(o.status!==200)throw new Error(`HTTP error! Status: ${o.status}`);return o.data}catch(o){throw new Error(`Error fetching images: ${o.message}`)}}const $=document.getElementById("loader"),d=document.getElementById("gallery"),I=new m(".gallery a");function g(a){const t=a.map(({webformatURL:e,largeImageURL:r,tags:s,likes:h,views:E,comments:b,downloads:v})=>`<div class="card">
      <a href="${r}" data-lightbox="gallery" data-title="${s}">
        <img src="${e}" alt="${s}" title="${s}"/>
      </a>
      <div class="card-border">
      <div class="param">
      <p class="title">Likes:</p>
      <p class="title">Views:</p>
      <p class="title">Comments:</p>
      <p class="title">Downloads:</p>
       </div>
        <div class="param">
      <p class="title-value">${h}</p>
      <p class="title-value">${E}</p>
      <p class="title-value">${b}</p>
      <p class="title-value">${v}</p>
       </div>
      </div>
    </div>`);d.innerHTML=t.join("");const o=d.querySelectorAll("img"),l=Array.from(o).map(e=>new Promise((r,s)=>{e.onload=r,e.onerror=s}));Promise.all(l).then(()=>{$.style.display="none"}).catch(e=>{console.error("Error loading images:",e)}),I.refresh()}const f="/goit-js-hw-12/assets/caution-75a3a476.svg",P="/goit-js-hw-12/assets/error-5bc7b79a.svg",n=document.getElementById("loader"),A=document.getElementById("gallery");new m(".gallery a");const O=document.getElementById("search-form"),p=document.getElementById("search-input"),R=15;let c=1;const y=document.querySelector('button[type="button"]');async function S(){c+=1;const a=p.value.trim();n.style.display="block";try{const t=await u(a,c,R);t.hits.length>0?g(t.hits):(i.warning({title:"No more results",message:"There are no more images for this search",theme:"dark",position:"topRight",backgroundColor:"#ffa000",messageColor:"#fafafb",iconUrl:f}),y.disabled="true")}catch(t){i.error({title:"Error",message:"An error occured while fetching more images. Please try again"}),console.error("Error fetching more images:",t)}finally{n.style.display="none"}}y.addEventListener("click",S);async function T(a){a.preventDefault(),c=1;const t=p.value.trim();if(t===""){i.error({title:"Error",message:"Please enter a search term!",theme:"dark",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",iconUrl:P});return}n.style.display="block",A.innerHTML="";try{const o=await u(t);o.hits.length===0?i.warning({title:"No results",message:"Sorry, there are no images matching your search.Please try again!",theme:"dark",position:"topRight",backgroundColor:"#ffa000",messageColor:"#fafafb",iconUrl:f}):g(o.hits)}catch(o){n.style.display="none",i.error({title:"Error",message:"An error occurred while fetching images. Please try again!"}),console.error("Error fetching images:",o)}finally{setTimeout(()=>{n.style.display="none"},1500)}}O.addEventListener("submit",T);
//# sourceMappingURL=commonHelpers.js.map
