const getRecipes = async (endPoint) => {
  const recipesFetched = await fetch(endPoint);
  const recipesTreated = await recipesFetched.json();
  return recipesTreated;
};

export default getRecipes;
