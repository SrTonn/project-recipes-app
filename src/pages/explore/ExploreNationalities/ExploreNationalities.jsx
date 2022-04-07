import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card/Card';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import getRecipes from '../../../services/fetchRecipes';
import styles from './styles.module.css';

export default function ExploreNationalities() {
  const [nationalities, setNationalities] = useState(['All']);
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
      setFilteredCard(meals);
    })();
  }, []);

  const handleChange = async ({ target }) => {
    if (target.value === 'All') {
      const results = await getRecipes(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      setFilteredCard(results.meals);
      return;
    }

    const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
    setFilteredCard(meals);
  };

  return (
    <>
      <Header />
      <main>
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
        <section className={ styles.Section }>
          {filteredCard
            .slice(0, MAX_RECIPES)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link to={ `/foods/${idMeal}` } key={ strMeal }>
                {/* <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ strMealThumb }
                    alt={ `Imagem da receita de ${strMeal}` }
                    style={ { height: '50px' } }
                    data-testid={ `${index}-card-img` }
                  />
                  <span data-testid={ `${index}-card-name` }>{strMeal}</span>
                </div> */}
                <Card
                  index={ index }
                  src={ strMealThumb }
                  name={ strMeal }
                  dataTestId={ {
                    container: '-recipe-card',
                    img: '-card-img',
                    paragraph: '-card-name',
                  } }
                />
              </Link>
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
