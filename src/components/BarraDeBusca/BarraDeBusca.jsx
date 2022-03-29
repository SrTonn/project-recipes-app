import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import getRecipes from '../../services/fetchRecipes';
import Button from '../Button/Button';
import styles from './styles.module.css'

export default function BarraDeBusca() {
  const { inputValue } = useContext(context); // Aqui entra o valor(nomeado inputValue temporariamente) do input da busca para completar a lógica da função handleClick
  const { pathname } = useLocation(); // https://v5.reactrouter.com/web/api/Hooks
  const history = useHistory();

  const defineEndPoint = ({ target }) => {
    const { id } = target;
    const foodsURL = 'themealdb';
    const drinksURL = 'thecocktaildb';

    if (id === 'ingredient-search') {
      return `https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/filter.php?i=${inputValue}`;
    }
    if (id === 'name-search') {
      return `https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/search.php?s=${inputValue}`;
    }
    if (id === 'first-letter-search') {
      if (inputValue.length === 1) {
        return `https://www.${pathname === '/foods' ? foodsURL : drinksURL}.com/api/json/v1/1/search.php?f=${inputValue}`;
      }
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleClick = async () => {
    const endPoint = defineEndPoint();
    const recipesFetched = await getRecipes(endPoint);

    if (recipesFetched.length === 1) {
      if (pathname === '/foods') {
        history.push(`/foods/${recipesFetched[0].idMeal}`);
      }
      if (pathname === '/drinks') {
        history.push(`/drinks/${recipesFetched[0].idDrink}`);
      }
    }
  };

  return (
    <div className={ gitstyles.BarraDeBusca }>
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          type="radio"
          id="ingredient-search"
          data-testid="ingredient-search-radio"
          name="search-method"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          id="name-search"
          data-testid="name-search-radio"
          name="search-method"
        />
      </label>
      <label htmlFor="first-letter-search">
        First letter
        <input
          type="radio"
          id="first-letter-search"
          data-testid="first-letter-search-radio"
          name="search-method"
        />
      </label>
      <Button
        dataTestId="exec-search-btn"
        buttonName="Buscar"
        onClick={ handleClick }
      />
    </div>
  );
}
