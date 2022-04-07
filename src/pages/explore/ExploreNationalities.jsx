import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      const strArea = nationalitiesTreated.meals.map((recipe) => recipe.strArea);
      setNationalities((prevState) => [...prevState, ...strArea]);

      const { meals } = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      setCards(meals);
      setFilteredCard(meals);
    })();
  }, []);

  const handleChange = async ({ target }) => {
    const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
    if (target.value === 'All') {
      setFilteredCard(cards);
      return;
    }
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
          {nationalities.map((nationality, index) => (
            <option
              key={ index + nationality }
              data-testid={ `${nationality}-option` }
              value={ nationality }
            >
              {nationality}
            </option>
          ))}
        </select>
      </div>
      <section>
        {console.log('filteredCard=>', filteredCard.slice(0, 2))}
        {filteredCard
          .slice(0, MAX_RECIPES)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <Link to={ `/foods/${idMeal}` } key={ strMeal }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strMealThumb }
                  alt={ `Imagem da receita de ${strMeal}` }
                  style={ { height: '50px' } }
                  data-testid={ `${index}-card-img` }
                />
                <span data-testid={ `${index}-card-name` }>{strMeal}</span>
              </div>
            </Link>
          ))}
      </section>
      <Footer />
    </main>
  );
}
