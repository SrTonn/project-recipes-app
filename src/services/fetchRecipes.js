// Não consegui usar o export default com a arrow function
export default async function getRecipes(endPoint) {
  const recipesFetched = await fetch(endPoint);
  const recipesTreated = await recipesFetched.json();
  console.log('da api:', recipesTreated);
  return recipesTreated;
}
