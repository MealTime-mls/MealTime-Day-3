(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const l="https://www.themealdb.com/api/json/v1/1",d=async t=>{try{return[await(await fetch(t)).json(),null]}catch(e){return[null,e]}},p=async()=>{const t=`${l}/categories.php`,[{categories:e},n]=await d(t);return[e,n]},g=async t=>{const e=`${l}/filter.php?c=${t}`,[{meals:n},s]=await d(e);return[n,s]},f=async t=>{const e=`${l}/lookup.php?i=${t}`,[{meals:[n]},s]=await d(e);return[n,s]},c=JSON.parse(localStorage.getItem("bookmarks"))||[],i=t=>c.includes(t),v=t=>{console.log(c),c.push(t),console.log(c),localStorage.setItem("bookmarks",JSON.stringify(c))},h=t=>{const e=c.indexOf(t);c.splice(e,1),localStorage.setItem("bookmarks",JSON.stringify(c))};async function k(){document.querySelector("#app").innerHTML=`
    <div>
      <h1>Meal Time!</h1>
      <select id="category" name="category"></select>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `;const[t,e]=await p();e&&console.log(e),t.forEach(b),m(t[0].strCategory),document.querySelector("#category").addEventListener("change",n=>{m(n.target.value)})}async function m(t){document.querySelector("#meals").innerHTML="";const[e,n]=await g(t);n&&console.log(n),e.forEach(O)}function b(t){const e=document.createElement("option");e.value=t.strCategory,e.innerText=t.strCategory,document.querySelector("#category").append(e)}function O(t){const e=document.createElement("div");e.className="mealCard",e.innerHTML=`
    <h2>${t.strMeal}</h2>
    <img src="${t.strMealThumb}">
  `,e.addEventListener("click",()=>{S(t.idMeal)}),document.querySelector("#meals").append(e)}async function S(t){const[e,n]=await f(t),s=document.querySelector("#recipeOverlay");s.innerHTML=`
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="bookmarkButton" class="${i(t)?"bookmarked":""}">♡</button>
        </div>
      <h2>${e.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <ul id="overlayIngredientsContainer"></ul>
        <div id="overlayImageContainer">
          <img src="${e.strMealThumb}">
        </div>
      </div>
      <p id="recipeInstructions">${e.strInstructions}</p>
    </div>
  `;let r=1,o=e[`strIngredient${r}`],a=e[`strMeasure${r}`];const y=document.querySelector("#overlayIngredientsContainer");for(;o;)y.innerHTML+=`
      <li>${o}: ${a}</li>
    `,r++,o=e[`strIngredient${r}`],a=e[`strMeasure${r}`];s.className="visible",document.querySelector("#closeOverlayButton").addEventListener("click",()=>{s.className="hidden"});const u=document.querySelector("#bookmarkButton");u.addEventListener("click",()=>{u.className=i(t)?"":"bookmarked",i(t)?h(t):v(t),console.log(c)})}k();
