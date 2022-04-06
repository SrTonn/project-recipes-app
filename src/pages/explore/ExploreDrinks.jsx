import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function ExploreDrinks() {
  const { push } = useHistory();
  const handleClick = async ({ name }) => {
    if (name === 'explore-by-ingredient') push('/explore/drinks/ingredients');
    if (name === 'explore-surprise') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const { drinks } = await response.json();
      push(`/drinks/${drinks[0].idDrink}`);
    }
  };

  return (
    <main>
      <Header />
      <Button
        dataTestId="explore-by-ingredient"
        buttonName="By Ingredient"
        name="explore-by-ingredient"
        handleClick={ handleClick }
      />
      <Button
        dataTestId="explore-surprise"
        buttonName="Surprise me!"
        name="explore-surprise"
        handleClick={ handleClick }
      />
      <Footer />
    </main>
  );
}
