(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const c="https://www.themealdb.com/api/json/v1/1",a=async t=>{try{return[await(await fetch(t)).json(),null]}catch(e){return[null,e]}},l=async t=>{const e=`${c}/filter.php?c=${t}`,[{meals:i},o]=await a(e);return[i,o]},d=async t=>{const e=`${c}/lookup.php?i=${t}`,[{meals:[i]},o]=await a(e);return[i,o]};function u(){document.querySelector("#app").innerHTML=`
    <div>
      <h1>Meal Time!</h1>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `}function m(t){const e=document.querySelector("#meals"),i=document.createElement("div");i.className="mealCard",i.innerHTML=`
    <h2>${t.strMeal}</h2>
    <img src="${t.strMealThumb}">
  `,i.addEventListener("click",()=>{y(t.idMeal)}),e.append(i)}async function y(t){const[e,i]=await d(t);document.querySelector("#recipeOverlay").innerHTML=`
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
  `;let o=1,r=e[`strIngredient${o}`],n=e[`strMeasure${o}`];const s=document.querySelector("#overlayIngredientsContainer");for(;r;)s.innerHTML+=`
      <li>${r}: ${n}</li>
    `,o++,r=e[`strIngredient${o}`],n=e[`strMeasure${o}`];document.querySelector("#recipeOverlay").className="visible",document.querySelector("#closeOverlayButton").addEventListener("click",()=>{document.querySelector("#recipeOverlay").className="hidden"})}async function p(){const[t,e]=await l("Seafood");e&&console.log(e),t.forEach(m)}u();p();
