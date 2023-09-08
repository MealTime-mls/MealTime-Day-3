(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const s="https://www.themealdb.com/api/json/v1/1",a=async r=>{try{return[await(await fetch(r)).json(),null]}catch(e){return[null,e]}},d=async()=>{const r=`${s}/categories.php`,[{categories:e},n]=await a(r);return[e,n]},u=async r=>{const e=`${s}/filter.php?c=${r}`,[{meals:n},i]=await a(e);return[n,i]},y=async r=>{const e=`${s}/lookup.php?i=${r}`,[{meals:[n]},i]=await a(e);return[n,i]};async function m(){document.querySelector("#app").innerHTML=`
    <div>
      <h1>Meal Time!</h1>
      <select id="category" name="category"></select>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `;const[r,e]=await d();e&&console.log(e),r.forEach(p),l(r[0].strCategory),document.querySelector("#category").addEventListener("change",n=>{l(n.target.value)})}async function l(r){document.querySelector("#meals").innerHTML="";const[e,n]=await u(r);n&&console.log(n),e.forEach(f)}function p(r){const e=document.createElement("option");e.value=r.strCategory,e.innerText=r.strCategory,document.querySelector("#category").append(e)}function f(r){const e=document.createElement("div");e.className="mealCard",e.innerHTML=`
    <h2>${r.strMeal}</h2>
    <img src="${r.strMealThumb}">
  `,e.addEventListener("click",()=>{g(r.idMeal)}),document.querySelector("#meals").append(e)}async function g(r){const[e,n]=await y(r);document.querySelector("#recipeOverlay").innerHTML=`
    <div id="recipeOverlayContents">
      <div id="closeOverlayContainer">
        <button id="closeOverlayButton">X</button>
      </div>
      <h2>${e.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <ul id="overlayIngredientsContainer">

        </ul>
        <div id="overlayImageContainer">
          <img src="${e.strMealThumb}">
        </div>
      </div>
      <p id="recipeInstructions">${e.strInstructions}</p>
    </div>
  `;let i=1,t=e[`strIngredient${i}`],o=e[`strMeasure${i}`];const c=document.querySelector("#overlayIngredientsContainer");for(;t;)c.innerHTML+=`
      <li>${t}: ${o}</li>
    `,i++,t=e[`strIngredient${i}`],o=e[`strMeasure${i}`];document.querySelector("#recipeOverlay").className="visible",document.querySelector("#closeOverlayButton").addEventListener("click",()=>{document.querySelector("#recipeOverlay").className="hidden"})}m();
