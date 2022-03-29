import React from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from '../Button/Button';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import styles from './styles.module.css';

export default function Header() {
  const { push, location: { pathname } } = useHistory();
  const title = pathname.slice(1)[0].toUpperCase() + pathname.slice(2);

  const handleClick = () => {
    push('/profile');
  };

  return (
    <header className={ styles.Header }>
      <Button
        dataTestId="profile-top-btn"
        buttonName={ <img src={ profileIcon } alt="profile-icon" /> }
        handleClick={ handleClick }
        src="profileIcon"
      />
      <h2 data-testid="page-title">{title}</h2>
      <Button
        dataTestId="search-top-btn"
        buttonName={ <img
          src={ searchIcon }
          alt="searchIcon"
        /> }
        src="searchIcon"
      />
    </header>
  );
}

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };
