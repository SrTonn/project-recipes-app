import React from 'react';
// import PropTypes from 'prop-types';
import Button from '../Button/Button';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipeCard(index, tagName) {
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ `Imagem da receita ${recipeName}` }
        src={ src }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>{category}</h4>
      <h3 data-testid={ `${index}-horizontal-name` }>{recipeName}</h3>
      <h4 data-testid={ `${index}-horizontal-done-date` }>{date}</h4>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        alt="Ícone de compartilhar"
        src={ shareIcon }
      />
      <Button data-testid={ `${index}-${tagName}-horizontal-tag` } buttonName={ tag } />
      <Button data-testid={ `${index}-${tagName}-horizontal-tag` } buttonName={ tag } />
    </div>
  );
}
