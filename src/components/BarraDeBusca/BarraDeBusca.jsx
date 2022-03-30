import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Context from '../../context/Context';

export default function BarraDeBusca() {
  const { inputSearch: { inputValue }, setRecipesInfo, recipes } = useContext(Context);
  const { pathname } = useLocation(); // Referência do useLocation e do useHistory: https://v5.reactrouter.com/web/api/Hooks
  const [baseEndPoint, setBaseEndPoint] = useState('');
  const [currentRadioValue, setCurrentRadioValue] = useState('');

  const handleRadioButton = async ({ target: { id } }) => {
    setCurrentRadioValue(id);
    const foodsURL = 'themealdb';
    const drinksURL = 'thecocktaildb';
    const domain = pathname === '/foods' ? foodsURL : drinksURL;

    if (id === 'ingredient-search') {
      setBaseEndPoint(`https://www.${domain}.com/api/json/v1/1/filter.php?i=`);
    }
    if (id === 'name-search') {
      setBaseEndPoint(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
    }
    if (id === 'first-letter-search') {
      setBaseEndPoint(`https://www.${domain}.com/api/json/v1/1/search.php?f=`);
    }
  };

  const handleClick = () => {
    console.log('recipes=>', recipes);
    if (currentRadioValue === 'first-letter-search' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setRecipesInfo((prevState) => ({
      ...prevState,
      endpoint: baseEndPoint + inputValue,
      canUpdate: true,
      pathname,
    }));
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
