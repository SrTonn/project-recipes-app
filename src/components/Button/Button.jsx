import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  handleClick,
  className,
  isDisabled,
  dataTestId,
  buttonName,
  type,
}) {
  return (
    <button
      className={ className }
      type={ type === 'button' ? 'button' : 'submit' }
      onClick={ ({ target }) => handleClick(target) }
      disabled={ isDisabled }
      data-testid={ dataTestId }
    >
      {buttonName}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  isDisabled: false,
  type: 'button',
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  type: PropTypes.string,
};
