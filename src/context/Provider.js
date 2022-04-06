import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getRecipes from '../services/fetchRecipes';

export default function Provider({ children }) {
  const [inputSearch, setInputSearch] = useState({
    inputValue: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [recipesInfo, setRecipesInfo] = useState({
    endpoint: null,
    canUpdate: false,
    canRedirect: true,
    pathname: null,
  });

  useEffect(() => {
    (async () => {
      if (recipesInfo.canUpdate) {
        const recipesTreated = await getRecipes(recipesInfo.endpoint);
        setRecipes(recipesTreated.drinks || recipesTreated.meals);
      }
    })();
  }, [recipesInfo]);

  const context = {
    inputSearch,
    setInputSearch,
    recipes,
    setRecipes,
    setRecipesInfo,
    recipesInfo,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
