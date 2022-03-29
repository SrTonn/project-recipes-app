import React from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from '../Button/Button';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const { push, location: { pathname } } = useHistory();
  const title = pathname.slice(1)[0].toUpperCase() + pathname.slice(2);

  const handleClick = () => {
    push('/profile');
  };

  return (
    <header>
      <Button
        dataTestId="profile-top-btn"
        buttonName={ <img src={ profileIcon } alt="profile-icon" /> }
        handleClick={ handleClick }
        src="profileIcon"
      />
      <p data-testid="page-title">{title}</p>
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
