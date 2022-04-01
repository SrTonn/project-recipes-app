const getRecipes = async (endPoint) => {
  const recipesFetched = await fetch(endPoint);
  const recipesTreated = await recipesFetched.json();
  // console.log('recipes treated na api', recipesTreated);
  return recipesTreated;
};

export default getRecipes;
