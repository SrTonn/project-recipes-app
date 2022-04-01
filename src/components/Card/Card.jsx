import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ src, strType, dataTestId }) {
  return (
    <div
      className={ styles.Card }
      data-testid={ dataTestId.container || null }
    >
      <img
        src={ src }
        alt={ `Imagem da receita ${strType}` }
        data-testid={ dataTestId.img || null }
      />
      <p data-testid={ dataTestId.paragraph || null }>
        { strType }
      </p>
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  strType: PropTypes.string.isRequired,
  dataTestId: PropTypes.shape({
    container: PropTypes.string,
    img: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};
