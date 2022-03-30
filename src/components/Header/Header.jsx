import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Button from '../Button/Button';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import styles from './styles.module.css';
import Context from '../../context/Context';

export default function Header() {
  const { push, location: { pathname } } = useHistory();
  const { inputSearch, setInputSearch, recipes } = useContext(Context);
  const title = pathname
    .replace(/\/(\w)/g, (_, firstLetter) => ` ${firstLetter.toUpperCase()}`);

  const handleClick = () => {
    push('/profile');
  };

  const toggleInput = () => {
    setInputSearch((prevState) => ({ ...prevState, isVisible: !prevState.isVisible }));
  };

  const handleChange = ({ value }) => {
    setInputSearch((prevState) => ({ ...prevState, inputValue: value }));
  };

  useEffect(() => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  if (recipes?.length === 1 && pathname.includes('foods')) {
    return <Redirect to={ `/foods/${recipes[0].idMeal}` } />;
  }

  if (recipes?.length === 1 && pathname.includes('drinks')) {
    return <Redirect to={ `/drinks/${recipes[0].idDrink}` } />;
  }

  return (
    <header className={ styles.Header }>
      <Button
        dataTestId="profile-top-btn"
        handleClick={ handleClick }
        src="profileIcon"
      >
        <img src={ profileIcon } alt="profile-icon" />
      </Button>
      <h2 data-testid="page-title">{title}</h2>
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
