import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import reduceIngredients from '../../services/reduceIngredients';
import getRecipes from '../../services/fetchRecipes';
import Card from '../../components/Card/Card';

export default function FoodDetails() {
  const { params: { id } } = useRouteMatch();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const MAX_RECOMMENDATION = 6;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const { drinks } = await response.json();
        setData(drinks.at(0));
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      const { meals } = await getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      console.log(meals);
      setRecommendations(meals);
    })();
  }, [id]);

  const handleClick = () => {
    console.log('ativou handleClick');
  };

  const copyToClipboard = () => {
    copy(`http://localhost:3000/drinks/${data.idDrink}`);
    global.alert('Link copied!');
  };

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {/* {console.log(data)} */}
      <img
        className={ styles.ImgHeader }
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <main className={ styles.Main }>
        <div className={ styles.NameAndIconsContainer }>
          <h2 data-testid="recipe-title">{ data.strDrink }</h2>
          <Button dataTestId="share-btn" handleClick={ copyToClipboard } src="share-btn">
            <img src={ shareIcon } alt="Ícone de compartilhar" />
          </Button>
          <Button
            dataTestId="favorite-btn"
            handleClick={ handleClick }
            src="favorite-btn"
          >
            <img src={ favoriteIcon } alt="Ícone de favorito" />
          </Button>
        </div>
        <p
          data-testid="recipe-category"
          className={ styles.Category }
        >
          { data.strAlcoholic }

        </p>
        <h3>Ingredients</h3>
        <div className={ styles.IngredientsContainer }>
          <ul>
            {reduceIngredients(data).map((value, index) => (
              <li
                key={ value }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {value}
              </li>))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p
          className={ styles.Instructions }
          data-testid="instructions"
        >
          {data.strInstructions}
        </p>
        <h3>Recommended</h3>
        <div className={ styles.CarroselContainer }>
          {recommendations?.slice(0, MAX_RECOMMENDATION)
            .map(({ strMealThumb, strCategory, idMeal, strMeals }, index) => (
              <Card
                key={ idMeal }
                index={ index }
                src={ strMealThumb }
                strType={ strCategory }
                name={ strMeals }
                dataTestId={ { container: '-recomendation-card' } }
              />
            ))}
        </div>
        <Button
          className={ styles.StartButton }
          dataTestId="start-recipe-btn"
          buttonName="Start Recipe"
          handleClick={ handleClick }
        />
      </main>
    </>
  );
}
