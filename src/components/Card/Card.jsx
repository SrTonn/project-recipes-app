import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ index, src, strType }) {
  return (
    <div
      className={ styles.Card }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ src }
        alt={ `Imagem da receita ${strType}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strType }</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  strType: PropTypes.string.isRequired,
};
