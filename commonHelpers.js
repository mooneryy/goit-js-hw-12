import{a as $,S as g,i}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const A="42472601-e2efb745d6431960b7108569a",I=15;async function f(r,t=1){const n=`https://pixabay.com/api/?key=${A}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${I}`;try{const a=await $.get(n);if(a.status!==200)throw new Error(`HTTP error! Status: ${a.status}`);return a.data}catch(a){throw new Error(`Error fetching images: ${a.message}`)}}const R=document.getElementById("loader"),u=document.getElementById("gallery"),O=new g(".gallery a");async function p(r){const t=r.map(({webformatURL:e,largeImageURL:o,tags:s,likes:w,views:v,comments:L,downloads:P})=>`<div class="card">
      <a href="${o}" data-lightbox="gallery" data-title="${s}">
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
      <p class="title-value">${w}</p>
      <p class="title-value">${v}</p>
      <p class="title-value">${L}</p>
      <p class="title-value">${P}</p>
       </div>
      </div>
    </div>`);u.innerHTML=t.join("");const n=u.querySelectorAll("img"),a=Array.from(n).map(e=>new Promise((o,s)=>{e.onload=o,e.onerror=s}));try{await Promise.all(a),R.style.display="none",O.refresh()}catch(e){console.error("Error loading images:",e)}}const B="/goit-js-hw-12/assets/caution-75a3a476.svg",h="/goit-js-hw-12/assets/error-5bc7b79a.svg",S=document.getElementById("loader"),y=document.getElementById("gallery"),C=document.getElementById("search-form"),H=document.getElementById("search-input"),E=document.getElementById("load-more-btn");new g(".gallery a");let l=1,b="",m=15;function d(r){E.style.display=r?"block":"none"}function c(r){S.style.display=r?"block":"none"}async function M(){c(!0);try{l+=1;const r=await f(b,l,m),t=r.totalHits,n=Math.floor(t/m);if(l>n)i.error({message:"We're sorry, but you've reached the end of search results.",theme:"dark",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",iconUrl:h}),d(!1);else{p(r.hits);const a=y.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch(r){i.error({title:"Error",message:"An error occurred while fetching more images. Please try again."}),console.error("Error fetching more images:",r)}finally{c(!1)}}async function T(r){c(!0);try{const t=await f(r);t.hits.length===0?i.warning({title:"No results",message:"Sorry, there are no images matching your search. Please try again!",theme:"dark",position:"topRight",backgroundColor:"#ffa000",messageColor:"#fafafb",iconUrl:B}):(p(t.hits),d(!0))}catch(t){i.error({title:"Error",message:"An error occurred while fetching images. Please try again!"}),console.error("Error fetching images:",t)}finally{c(!1)}}async function _(r){r.preventDefault(),l=1;const t=H.value.trim();if(b=t,t===""){i.error({title:"Error",message:"Please enter a search term!",theme:"dark",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",iconUrl:h});return}y.innerHTML="",d(!1),await T(t)}C.addEventListener("submit",_);E.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
