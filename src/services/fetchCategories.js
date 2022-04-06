const getCategories = async (recipeType) => {
  const endpoint = `https://www.the${recipeType}db.com/api/json/v1/1/list.php?c=list`;
  const categoriesFetched = await fetch(endpoint);
  const categoriesTreated = await categoriesFetched.json();
  return categoriesTreated;
};

const getFilterByCategorie = async (recipeType, query) => {
  const endpoint = `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?c=${query}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export { getCategories, getFilterByCategorie };
