import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import getRecipes from '../../services/fetchRecipes';

export default function ExploreNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const nationalitiesTreated = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
      );
      const recipesTreated = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const { meals } = recipesTreated;
      const resultNationality = nationalitiesTreated.meals;
      const strArea = resultNationality.map((recipe) => recipe.strArea);
      setNationalities(strArea);
      setCards(meals);
    })();
  }, []);

  const handleChange = ({ target }) => {
    const filteredCards = cards.filter((card) => (card.strArea === target.value));
    console.log(filteredCards);
    return filteredCards;
  };

  return (
    <main>
      <Header />
      <div>
        <select
          onChange={ handleChange }
          data-testid="explore-by-nationality-dropdown"
        >
          {nationalities.map((nationality) => (
            <option
              key={ nationality }
              data-testid={ `${nationality}-option` }
              value={ nationality }
            >
              {nationality}
            </option>
          ))}
        </select>
      </div>
      <section>{handleChange}</section>
      <Footer />
    </main>
  );
}
