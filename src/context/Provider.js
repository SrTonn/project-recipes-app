import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [inputSearch, setInputSearch] = useState({
    isVisible: false,
    inputValue: '',
  });
  const context = {
    inputSearch,
    setInputSearch,
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
