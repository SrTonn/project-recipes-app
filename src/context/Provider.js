import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const context = {
    // passar os contextos aqui
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
