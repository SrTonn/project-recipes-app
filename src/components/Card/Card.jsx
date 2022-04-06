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
        alt={ `Imagem da receita ${name}` }
        data-testid={ dataTestId.img ? index + dataTestId.img : null }
        name={ name }
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
  className: null,
  index: null,
};

Card.propTypes = {
  index: PropTypes.number,
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
