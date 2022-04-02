import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

export default function Card({ className, src, index, strType, dataTestId, name }) {
  return (
    <div
      className={ className || styles.Card }
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
      {console.log('name=>', name)}
    </div>
  );
}

Card.defaultProps = {
  strType: null,
  className: null,
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  strType: PropTypes.string,
  dataTestId: PropTypes.shape({
    container: PropTypes.string,
    img: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};
