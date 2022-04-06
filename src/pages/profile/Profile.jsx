import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

export default function Profile() {
  const [savedUser, setSavedUser] = useState('');
  useEffect(() => {
    const userSaved = JSON.parse(localStorage.getItem('user'));
    console.log(userSaved);
    setSavedUser(userSaved.email);
  }, []);
  return (
    <>
      <Header />
      <main>
        Profile
        <p data-testid="profile-email">
          {savedUser}
        </p>
        <Button
          buttonName="Done Recipes"
          handleClick={ console.log('teste') }
          dataTestId="profile-done-btn"
        />
        <Button
          buttonName="Favorite Recipes"
          handleClick={ console.log('teste') }
          dataTestId="profile-favorite-btn"
        />
        <Button
          buttonName="Logout"
          handleClick={ console.log('teste') }
          dataTestId="profile-logout-btn"
        />
      </main>
      <Footer />
    </>
  );
}
