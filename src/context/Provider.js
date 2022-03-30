import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [inputSearch, setInputSearch] = useState({
    isVisible: false,
    inputValue: '',
  });
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => {
  }, []);

  const context = {
    inputSearch,
    setInputSearch,
    recipesToRender,
    setRecipesToRender,
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
