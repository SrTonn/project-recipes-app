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
  const oldFavoriteList = JSON.parse(localStorage.getItem(key));
  const newValue = oldFavoriteList.filter((recipe) => recipe.id !== id);
  localStorage.setItem(key, JSON.stringify(newValue));
};

export { updateStorage, filterItemsById };
