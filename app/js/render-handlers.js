import { fetchCategories, fetchMealById, fetchMealsByCategory } from './fetch-handlers';
import bookmarks, { bookmark, isBookmarked, unbookmark } from './store';

export async function renderApp() {
  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Meal Time!</h1>
      <select id="category" name="category"></select>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `

  const [categories, categoriesError] = await fetchCategories();
  if (categoriesError) {
    console.log(categoriesError);
  }
  categories.forEach(renderCategoryOption);

  renderMealsByCategory(categories[0].strCategory);

  document.querySelector('#category').addEventListener('change', (e) => {
    renderMealsByCategory(e.target.value);
  })
}

export async function renderMealsByCategory(category) {
  document.querySelector("#meals").innerHTML = "";
  const [meals, mealsError] = await fetchMealsByCategory(category);
  if (mealsError) {
    console.log(mealsError);
  }
  meals.forEach(renderMeal);
}

export function renderCategoryOption(category) {
  const option = document.createElement("option");
  option.value = category.strCategory;
  option.innerText = category.strCategory;
  document.querySelector("#category").append(option);
}

export function renderMeal(meal) {
  const mealDiv = document.createElement("div");
  mealDiv.className = "mealCard";
  mealDiv.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}">
  `
  mealDiv.addEventListener('click', () => {
    renderMealRecipe(meal.idMeal);
  });
  document.querySelector("#meals").append(mealDiv);
}

async function renderMealRecipe(idMeal) {
  const [meal, error] = await fetchMealById(idMeal);
  const recipeOverlay = document.querySelector("#recipeOverlay");
  recipeOverlay.innerHTML = `
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="bookmarkButton" class="${isBookmarked(idMeal) ? "bookmarked" : ""}">♡</button>
        </div>
      <h2>${meal.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <ul id="overlayIngredientsContainer"></ul>
        <div id="overlayImageContainer">
          <img src="${meal.strMealThumb}">
        </div>
      </div>
      <p id="recipeInstructions">${meal.strInstructions}</p>
    </div>
  `;

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

  recipeOverlay.className = "visible"

  document.querySelector("#closeOverlayButton").addEventListener('click', () => {
    recipeOverlay.className = "hidden";
  });

  const bookmarkButton = document.querySelector("#bookmarkButton")
  bookmarkButton.addEventListener('click', () => {
    bookmarkButton.className = isBookmarked(idMeal) ? "" : "bookmarked";
    if (!isBookmarked(idMeal)) {
      bookmark(idMeal);
    } else {
      unbookmark(idMeal);
    }
    console.log(bookmarks);
  })
}