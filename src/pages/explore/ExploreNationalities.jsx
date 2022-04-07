import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import getRecipes from '../../services/fetchRecipes';

export default function ExploreNationalities() {
  const [nationalities, setNationalities] = useState(['All']);
  const [cards, setCards] = useState([]);
  const [filteredCard, setFilteredCard] = useState([]);
  const MAX_RECIPES = 12;

  useEffect(() => {
    (async () => {
      const nationalitiesTreated = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
      );
      const recipesTreated = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const { meals } = recipesTreated;
      console.log('meals', meals);
      const resultNationality = nationalitiesTreated.meals;
      const strArea = resultNationality.map((recipe) => recipe.strArea);

      setNationalities((prevState) => [...prevState, ...strArea]);
      setCards(meals);
      setFilteredCard(meals);
    })();
  }, []);

  const handleChange = async ({ target }) => {
    // const filteredCards = cards.filter((card) => card.strArea === target.value);
    const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
    if (target.value === 'All') {
      setFilteredCard(cards);
      return;
    }
    // console.log('filtered', filteredCards);
    // console.log('card', cards);
    setFilteredCard(meals);
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
      <section>
        {filteredCard
          .slice(0, MAX_RECIPES)
          .map(({ strMeal, strMealThumb }, index) => (
            <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                alt={ `Imagem da receita de ${strMeal}` }
                style={ { height: '50px' } }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>{strMeal}</span>
            </div>
          ))}
      </section>
      <Footer />
    </main>
  );
}
