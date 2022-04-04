const getCategories = async (endPoint) => {
  const categoriesFetched = await fetch(endPoint);
  const categoriesTreated = await categoriesFetched.json();
  //  console.log('categories treated na api', categoriesTreated);

  return categoriesTreated;
};

export default getCategories;
