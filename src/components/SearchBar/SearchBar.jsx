import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Context from '../../context/Context';

export default function SearchBar() {
  const {
    setInputSearch,
    inputSearch,
    inputSearch: { inputValue },
    setRecipesInfo,
  } = useContext(Context);

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
    if (currentRadioValue === 'first-letter-search' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setRecipesInfo((prevState) => ({
      ...prevState,
      endpoint: baseEndPoint + inputValue,
      canUpdate: true,
      canRedirect: true,
      pathname,
    }));
  };

  const handleChange = ({ value }) => {
    setInputSearch((prevState) => ({ ...prevState, inputValue: value }));
  };

  return (
    <div className={ styles.SearchBarContainer }>
      <input
        className={ styles.SearchInput }
        data-testid="search-input"
        type="text"
        id="search"
        value={ inputSearch.inputValue }
        onChange={ ({ target }) => { handleChange(target); } }
      />
      <div className={ styles.SearchBar }>
        <label htmlFor="ingredient-search">
          <input
            className={ styles.RadioInput }
            type="radio"
            id="ingredient-search"
            data-testid="ingredient-search-radio"
            name="search-method"
            onClick={ handleRadioButton }
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            id="name-search"
            data-testid="name-search-radio"
            name="search-method"
            onClick={ handleRadioButton }
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            id="first-letter-search"
            data-testid="first-letter-search-radio"
            name="search-method"
            onClick={ handleRadioButton }
          />
          First letter
        </label>
        <Button
          dataTestId="exec-search-btn"
          buttonName="Buscar"
          handleClick={ handleClick }
        />
      </div>
    </div>
  );
}
