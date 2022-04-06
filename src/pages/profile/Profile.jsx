import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

export default function Profile() {
  const [savedUser, setSavedUser] = useState('');
  const { push } = useHistory();
  useEffect(() => {
    const userSaved = JSON.parse(localStorage.getItem('user'));
    console.log(userSaved);
    setSavedUser(userSaved.email);
  }, []);
  const handleClick = ({ name }) => {
    console.log(name);
    if (name === 'Done Recipes') {
      push('/done-recipes');
    }
    if (name === 'Favorite Recipes') {
      push('favorite-recipes');
    }
    if (name === 'Logout') {
      push('/');
      // localStorage.removeItem('user');
      localStorage.clear();
    }
  };
  return (
    <>
      <Header />
      <main>
        <p data-testid="profile-email">
          {savedUser}
        </p>
        <Button
          buttonName="Done Recipes"
          handleClick={ handleClick }
          dataTestId="profile-done-btn"
          name="Done Recipes"
        />
        <Button
          buttonName="Favorite Recipes"
          handleClick={ handleClick }
          dataTestId="profile-favorite-btn"
          name="Favorite Recipes"
        />
        <Button
          buttonName="Logout"
          handleClick={ handleClick }
          dataTestId="profile-logout-btn"
          name="Logout"
        />
      </main>
      <Footer />
    </>
  );
}
