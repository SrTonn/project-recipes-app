const updateStorage = (key, value) => {
  const oldStorage = JSON.parse(localStorage.getItem(key));
  if (oldStorage) {
    const newStorage = [...oldStorage, value];
    localStorage.setItem(key, JSON.stringify(newStorage));
  } else {
    localStorage.setItem(key, JSON.stringify([value]));
  }
};

const filterItemsById = (key, id) => {
  const oldFavoriteList = JSON.parse(localStorage.getItem(key)) || [];
  const newValue = oldFavoriteList.filter((recipe) => recipe.id !== id);
  localStorage.setItem(key, JSON.stringify(newValue));
};

const loadStorage = (key) => JSON.parse(localStorage.getItem(key));

const newStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const checkRecipeInProgress = (key, type, id) => {
  const inProgressRecipes = loadStorage(key);
  if (!inProgressRecipes) {
    newStorage(key, {
      cocktails: {},
      meals: {},
    });
  }
  return inProgressRecipes[type][id] || [];
};

const createIdInProgressRecipe = (type, id) => {
  const inProgressRecipes = loadStorage('inProgressRecipes');
  if (!inProgressRecipes[type][id]) {
    inProgressRecipes[type] = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};

export {
  updateStorage,
  filterItemsById,
  loadStorage,
  newStorage,
  createIdInProgressRecipe,
  checkRecipeInProgress,
};
