import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ key, index, src, strMeal }) {
  return (
    <div
      className={ styles.Card }
      key={ key }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ src }
        alt={ `Imagem da receita ${strMeal}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};
