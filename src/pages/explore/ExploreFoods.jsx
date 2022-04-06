import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

export default function ExploreFoods() {
  const { push } = useHistory();

  const handleClick = async ({ name }) => {
    if (name === 'explore-by-ingredient') push('/explore/foods/ingredients');
    if (name === 'explore-by-nationality') {
      push('/explore/foods/nationalities');
    }
    if (name === 'explore-surprise') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const { meals } = await response.json();
      push(`/foods/${meals[0].idMeal}`);
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
        dataTestId="explore-by-nationality"
        buttonName="By Nationality"
        name="explore-by-nationality"
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
