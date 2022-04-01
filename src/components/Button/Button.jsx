import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  handleClick,
  className,
  isDisabled,
  dataTestId,
  children,
  buttonName,
  type,
  src,
}) {
  return (
    <button
      className={ className }
      type={ type === 'button' ? 'button' : 'submit' }
      onClick={ ({ target }) => handleClick(target) }
      disabled={ isDisabled }
      data-testid={ dataTestId }
      src={ src || null }
    >
      {children || buttonName}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  isDisabled: false,
  type: 'button',
  src: null,
  children: null,
  buttonName: '',
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  buttonName: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
};
