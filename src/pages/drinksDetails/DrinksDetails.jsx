import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button/Button';
import styles from '../../styles/pageDetails.module.css';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import getRecipes from '../../services/fetchRecipes';
import Card from '../../components/Card/Card';
import reduceIngredients from '../../helpers/reduceIngredients';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { updateStorage, filterItemsById } from '../../services/storage';

export default function FoodDetails() {
  const { params: { id }, url } = useRouteMatch();
  const { push } = useHistory();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const MAX_RECOMMENDATION = 6;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const { drinks } = await response.json();
        setData(drinks[0]);
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      const { meals } = await getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecommendations(meals);
    })();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [id]);

  const favoriteThisRecipe = () => {
    updateStorage('favoriteRecipes', {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    });
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    filterItemsById('favoriteRecipes', id);
    setIsFavorite(false);
  };

  const handleClick = ({ name }) => {
    if (name === 'favorite-btn') {
      if (isFavorite) {
        removeFavorite();
      } else {
        favoriteThisRecipe();
      }
      return;
    }
    push(`${url}/in-progress`);
  };

  const copyToClipboard = () => {
    copy(`http://localhost:3000/drinks/${data.idDrink}`);
    toast.success('Link copied!');
  };

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div><Toaster /></div>
      <img
        className={ styles.ImgHeader }
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <main className={ styles.Main }>
        <div className={ styles.NameAndIconsContainer }>
          <h2 data-testid="recipe-title">{ data.strDrink }</h2>
          <div className={ styles.ShareAndFavoriteContainer }>
            <input
              className={ styles.ButtonShare }
              type="image"
              data-testid="share-btn"
              src={ shareIcon }
              alt="Share Icon"
              onClick={ copyToClipboard }
            />
            <input
              name="favorite-btn"
              className={ styles.ButtonFavorite }
              type="image"
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Icon"
              onClick={ ({ target }) => handleClick(target) }
            />
          </div>
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
        <div className={ styles.CardsContainer }>
          {recommendations?.slice(0, MAX_RECOMMENDATION)
            .map(({ strMealThumb, strCategory, idMeal, strMeal }, index) => (
              <Card
                key={ idMeal }
                className={ styles.Card }
                index={ index }
                src={ strMealThumb }
                strType={ strCategory }
                name={ strMeal }
                dataTestId={ {
                  container: '-recomendation-card',
                  paragraph: '-recomendation-title',
                } }
              />

            ))}
        </div>
        <Button
          name="start-recipe-btn"
          className={ styles.StartButton }
          dataTestId="start-recipe-btn"
          buttonName="Start Recipe"
          handleClick={ handleClick }
        />
      </main>
    </>
  );
}
