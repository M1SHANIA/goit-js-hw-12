import{S as g}from"./assets/vendor-9d80c77f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const u="gallery-link",f="https://pixabay.com/api/";function d(n){const i=`?${new URLSearchParams({key:"42361434-dd35276d7c0a60f1c8ceb9714",q:n,image_type:"photo",orientation:"horizontal",safeSearch:!0})}`,r=f+i;return fetch(r).then(e=>e.json()).catch(e=>{throw toastError(`Error fetching images: ${e}`),e})}function p({largeImageURL:n,tags:s,webformatURL:i,likes:r,views:e,comments:t,downloads:a}){return`
    <a href="${n}" class="${u}">
      <figure>
        <img src="${i}" alt="${s}" class="gallery-image">
        <figcaption class="gallery__figcaption">
          <div class="image-item">Likes <span class="image-elem">${r}</span></div>
          <div class="image-item">Views <span class="image-elem">${e}</span></div>
          <div class="image-item">Comments <span class="image-elem">${t}</span></div>
          <div class="image-item">Downloads <span class="image-elem">${a}</span></div>
        </figcaption>
      </figure>
    </a>
  `}const l=document.querySelector(".gallery"),m=document.querySelector(".search-form"),o=document.querySelector(".loader"),c=document.querySelector(".result-info");m.addEventListener("submit",function(n){n.preventDefault();const s=n.target.elements.query.value.trim();if(o.style.display="block",s.length<3){iziToast.warning({title:"Warning",message:"Please enter a search query with at least 3 characters.",position:"topRight"}),o.style.display="none";return}l.innerHTML="",c.innerHTML="";const i=new g(`.${u}`);d(s).then(({hits:r})=>{if(o.style.display="none",r.length>0){const e=r.map(p).join("");l.innerHTML=e,c.innerHTML=`<p class="result-messages">${r.length} images found for "${s}"</p>`,i.refresh()}else c.innerHTML='<p class="no-results-message">No images found.</p>';setTimeout(()=>{c.innerHTML=""},5e3)}).catch(r=>{o.style.display="none",console.error("Error fetching images:",r),iziToast.error({title:"Error",message:"Error fetching images. Please try again.",position:"topRight"})}).finally(()=>{m.reset()})});
//# sourceMappingURL=commonHelpers.js.map
