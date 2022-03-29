import React from 'react';
import Button from '../Button/Button';

export default function BarraDeBusca() {
  return (
    <div>
      <label htmlFor="ingredient-search">
        Busca por ingrediente
        <input
          type="radio"
          id="ingredient-search"
          data-testid="ingredient-search-radio"
          name="search-method"
        />
      </label>
      <label htmlFor="name-search">
        Busca por nome
        <input
          type="radio"
          id="name-search"
          data-testid="name-search-radio"
          name="search-method"
        />
      </label>
      <label htmlFor="first-letter-search">
        Busca por inicial
        <input
          type="radio"
          id="first-letter-search"
          data-testid="first-letter-search-radio"
          name="search-method"
        />
      </label>
      <Button dataTestId="exec-search-btn" buttonName="Buscar" />
    </div>
  );
}
