import { fetchMealById } from "./fetch-handlers";


export function renderStencil() {
  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Meal Time!</h1>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `
}

export function renderMeal(meal) {
  const mealsContainer = document.querySelector("#meals");
  const mealDiv = document.createElement("div");
  mealDiv.className = "mealCard";
  mealDiv.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}">
  `
  mealDiv.addEventListener('click', () => {
    renderMealRecipe(meal.idMeal);
  });
  mealsContainer.append(mealDiv);
}

async function renderMealRecipe(idMeal) {
  const [meal, error] = await fetchMealById(idMeal);
  document.querySelector("#recipeOverlay").innerHTML = `
    <div id="recipeOverlayContents">
      <div id="closeOverlayContainer">
        <button id="closeOverlayButton">X</button>
      </div>
      <h2>${meal.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <ul id="overlayIngredientsContainer">

        </ul>
        <div id="overlayImageContainer">
          <img src="${meal.strMealThumb}">
        </div>
      </div>
      <p id="recipeInstructions">${meal.strInstructions}</p>
    </div>
  `

  let ingredientNum = 1;
  let ingredient = meal[`strIngredient${ingredientNum}`];
  let amount = meal[`strMeasure${ingredientNum}`];
  const overlayIngredientsContainer = document.querySelector("#overlayIngredientsContainer");
  while (ingredient) {
    overlayIngredientsContainer.innerHTML += `
      <li>${ingredient}: ${amount}</li>
    `;
    ingredientNum++;
    ingredient = meal[`strIngredient${ingredientNum}`];
    amount = meal[`strMeasure${ingredientNum}`];
  }

  document.querySelector("#recipeOverlay").className = "visible"

  document.querySelector("#closeOverlayButton").addEventListener('click', () => {
    document.querySelector("#recipeOverlay").className = "hidden";
  });
}