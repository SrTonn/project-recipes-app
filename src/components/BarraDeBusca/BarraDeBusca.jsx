import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import getRecipes from '../../services/fetchRecipes';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Context from '../../context/Context';

export default function BarraDeBusca() {
  const { inputSearch: { inputValue }, setRecipesToRender } = useContext(Context);
  const { pathname } = useLocation(); // Referência do useLocation e do useHistory: https://v5.reactrouter.com/web/api/Hooks
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);

  const handleRadioButton = async ({ target }) => {
    const { id } = target;
    console.log('id no handleradio', id);
    const foodsURL = 'themealdb';
    const drinksURL = 'thecocktaildb';
    let recipesFetched = [];

    if (id === 'ingredient-search') {
      console.log('no if do ingrediente');
      recipesFetched = await getRecipes(`https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/filter.php?i=${inputValue}`);
      setRecipes(recipesFetched);
    }
    if (id === 'name-search') {
      console.log('no if do nome');
      recipesFetched = await getRecipes(`https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/search.php?s=${inputValue}`);
      setRecipes(recipesFetched);
    }
    if (id === 'first-letter-search') {
      if (inputValue.length === 1) {
        console.log('no if 1 da primeira letra');
        recipesFetched = await getRecipes(`https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/search.php?f=${inputValue}`);
        setRecipes(recipesFetched);
      }
      if (inputValue.length > 1) {
        console.log('no if 2 da primeira letra');
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleClick = () => {
    if (recipes.length === 1) {
      if (pathname === '/foods') {
        history.push(`/foods/${recipesFetched[0].idMeal}`);
      }
      if (pathname === '/drinks') {
        history.push(`/drinks/${recipesFetched[0].idDrink}`);
      }
    } else { setRecipesToRender(recipes); }
  };

  return (
    <div className={ styles.BarraDeBusca }>
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          type="radio"
          id="ingredient-search"
          data-testid="ingredient-search-radio"
          name="search-method"
          onClick={ handleRadioButton }
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          id="name-search"
          data-testid="name-search-radio"
          name="search-method"
          onClick={ handleRadioButton }
        />
      </label>
      <label htmlFor="first-letter-search">
        First letter
        <input
          type="radio"
          id="first-letter-search"
          data-testid="first-letter-search-radio"
          name="search-method"
          onClick={ handleRadioButton }
        />
      </label>
      <Button
        dataTestId="exec-search-btn"
        buttonName="Buscar"
        handleClick={ handleClick }
      />
    </div>
  );
}
