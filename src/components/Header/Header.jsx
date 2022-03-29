import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from '../Button/Button';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import styles from './styles.module.css';

export default function Header() {
  const { push, location: { pathname } } = useHistory();
  const [inputSearch, setInputSearch] = useState({
    isVisible: false,
    inputValue: '',
  });
  const title = pathname.slice(1)[0].toUpperCase() + pathname.slice(2);

  const handleClick = () => {
    push('/profile');
  };

  const toggleInput = () => {
    setInputSearch((prevState) => ({ ...prevState, isVisible: !prevState.isVisible }));
  };

  const handleChange = ({ value }) => {
    setInputSearch((prevState) => ({ ...prevState, inputValue: value }));
  };

  return (
    <header className={ styles.Header }>
      <Button
        dataTestId="profile-top-btn"
        handleClick={ handleClick }
        src="profileIcon"
<<<<<<< HEAD
      >
        <img src={ profileIcon } alt="profile-icon" />
      </Button>
      <p data-testid="page-title">{title}</p>
=======
      />
      <h2 data-testid="page-title">{title}</h2>
>>>>>>> ebd93edb202fb57f02684ad8b99d58c8a257dfec
      <Button
        dataTestId="search-top-btn"
        src="searchIcon"
        handleClick={ toggleInput }
      >
        <img src={ searchIcon } alt="searchIcon" />
      </Button>
      { inputSearch.isVisible
      && <input
        data-testid="search-input"
        type="text"
        id="search"
        value={ inputSearch.inputValue }
        onChange={ ({ target }) => {
          handleChange(target);
        } }
      />}
    </header>
  );
}

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };
