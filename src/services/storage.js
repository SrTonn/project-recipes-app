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

const checkFavoriteRecipes = (key, id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem(key));
  if (favoriteRecipes) {
    return favoriteRecipes.some((recipe) => recipe.id === id);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

const loadStorage = (key) => JSON.parse(localStorage.getItem(key));

const newStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export {
  updateStorage,
  filterItemsById,
  loadStorage,
  newStorage,
  checkFavoriteRecipes,
};
