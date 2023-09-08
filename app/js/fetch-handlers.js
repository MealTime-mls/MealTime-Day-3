const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const handleFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const fetchCategories = async () => {
  const url = `${BASE_URL}/categories.php`
  const [{ categories }, error] = await handleFetch(url);
  return [categories, error];
}

export const fetchMealsByCategory = async (category) => {
  const url = `${BASE_URL}/filter.php?c=${category}`
  const [{ meals }, error] = await handleFetch(url);
  return [meals, error]
}
export const fetchMealById = async (id) => {
  const url = `${BASE_URL}/lookup.php?i=${id}`
  const [{ meals: [meal] }, error] = await handleFetch(url);
  return [meal, error]
}