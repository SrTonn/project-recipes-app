import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ src, index, strType, dataTestId }) {
  return (
    <div
      className={ styles.Card }
      data-testid={ dataTestId.container ? index + dataTestId.container : null }
    >
      <img
        src={ src }
        alt={ `Imagem da receita ${strType}` }
        data-testid={ dataTestId.img ? index + dataTestId.img : null }
      />
      <p data-testid={ dataTestId.paragraph ? index + dataTestId.paragraph : null }>
        { strType }
      </p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  strType: PropTypes.string.isRequired,
  dataTestId: PropTypes.shape({
    container: PropTypes.string,
    img: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};
