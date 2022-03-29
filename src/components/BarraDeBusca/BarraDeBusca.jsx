import React from 'react';
import Button from '../Button/Button';

export default function BarraDeBusca() {
  const { inputValue } = useContext(context); // Aqui entra o valor(nomeado inputValue temporariamente) do input da busca para completar a lógica da função handleClick

  const handleClick = ({ target }) => {
    const { id } = target;

    if (id === 'ingredient-search') {
      getRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    }
    if (id === 'name-search') {
      getRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    }
    if (id === 'first-letter-search') {
      if (inputValue.length === 1) {
        getRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      } else if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  return (
    <div>
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
