import './css/style.css'
import { fetchCategories, fetchMealById, fetchMealsByCategory } from './js/fetch-handlers';
import { renderStencil, renderMeal } from './js/render-handlers';

async function main() {
  const [meals, error] = await fetchMealsByCategory("Seafood");
  if (error) {
    console.log(error);
  }
  meals.forEach(renderMeal);
}

renderStencil()
main();