import{a as A,S as f,i as l}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const I="42472601-e2efb745d6431960b7108569a",R=15;async function p(r,t=1){const a=`https://pixabay.com/api/?key=${I}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${R}`;try{const s=await A.get(a);if(s.status!==200)throw new Error(`HTTP error! Status: ${s.status}`);return s.data}catch(s){throw new Error(`Error fetching images: ${s.message}`)}}const H=document.getElementById("loader"),g=document.getElementById("gallery"),O=new f(".gallery a");async function h(r){const t=r.map(({webformatURL:e,largeImageURL:o,tags:n,likes:v,views:L,comments:P,downloads:$})=>`<div class="card">
      <a href="${o}" data-lightbox="gallery" data-title="${n}">
        <img src="${e}" alt="${n}" title="${n}"/>
      </a>
      <div class="card-border">
      <div class="param">
      <p class="title">Likes:</p>
      <p class="title">Views:</p>
      <p class="title">Comments:</p>
      <p class="title">Downloads:</p>
       </div>
        <div class="param">
      <p class="title-value">${v}</p>
      <p class="title-value">${L}</p>
      <p class="title-value">${P}</p>
      <p class="title-value">${$}</p>
       </div>
      </div>
    </div>`);g.insertAdjacentHTML("beforeend",t.join(""));const a=g.querySelectorAll("img"),s=Array.from(a).map(e=>new Promise((o,n)=>{e.onload=o,e.onerror=n}));try{await Promise.all(s),H.style.display="none",O.refresh()}catch(e){console.error("Error loading images:",e)}}const B="/goit-js-hw-12/assets/caution-75a3a476.svg",y="/goit-js-hw-12/assets/error-5bc7b79a.svg",S=document.getElementById("loader"),E=document.getElementById("gallery"),C=document.getElementById("search-form"),M=document.getElementById("search-input"),b=document.getElementById("load-more-btn");new f(".gallery a");let i=1,w="",d=15,m=[];function c(r){b.style.display=r?"block":"none"}function u(r){S.style.display=r?"block":"none"}async function T(){u(!0);try{i+=1;const r=await p(w,i,d),t=r.totalHits,a=Math.ceil(t/d);if(i>a)l.error({message:"We're sorry, but you've reached the end of search results.",theme:"dark",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",iconUrl:y}),c(!1);else{m.push(...r.hits),h(m),c(i<a);const s=E.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}catch(r){l.error({title:"Error",message:"An error occurred while fetching more images. Please try again."}),console.error("Error fetching more images:",r)}finally{u(!1)}}async function _(r){u(!0);try{const t=await p(r);t.totalHits===0?(l.warning({title:"No results",message:"Sorry, there are no images matching your search. Please try again!",theme:"dark",position:"topRight",backgroundColor:"#ffa000",messageColor:"#fafafb",iconUrl:B}),c(!1)):(m=[],h(t.hits),c(t.totalHits>d&&t.hits.length>=d))}catch(t){l.error({title:"Error",message:"An error occurred while fetching images. Please try again!"}),console.error("Error fetching images:",t)}finally{u(!1)}}async function k(r){r.preventDefault(),i=1;const t=M.value.trim();if(w=t,t===""){l.error({title:"Error",message:"Please enter a search term!",theme:"dark",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",iconUrl:y});return}E.innerHTML="",c(!1),await _(t)}C.addEventListener("submit",k);b.addEventListener("click",T);
//# sourceMappingURL=commonHelpers.js.map
