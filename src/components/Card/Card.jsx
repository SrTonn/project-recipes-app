import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ src, index, strType, dataTestId, name }) {
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
      {strType && <p>{strType}</p>}
      <p data-testid={ dataTestId.paragraph ? index + dataTestId.paragraph : null }>
        { name }
      </p>
    </div>
  );
}

Card.defaultProps = {
  strType: null,
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  strType: PropTypes.string,
  dataTestId: PropTypes.shape({
    container: PropTypes.string,
    img: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};
