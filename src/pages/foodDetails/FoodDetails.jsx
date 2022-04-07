import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button/Button';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import styles from '../../styles/pageDetails.module.css';
import getRecipes from '../../services/fetchRecipes';
import Card from '../../components/Card/Card';
import reduceIngredients from '../../helpers/reduceIngredients';
import { updateStorage,
  filterItemsById,
  loadStorage,
  newStorage,
  checkFavoriteRecipes,
} from '../../services/storage';

export default function FoodDetails() {
  const { params: { id }, url } = useRouteMatch();
  const { push } = useHistory();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const MAX_RECOMMENDATION = 6;

  useEffect(() => {
    (async () => {
      const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setData(meals[0]);
    })();
    (async () => {
      const { drinks } = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecommendations(drinks);
    })();
    setIsFavorite(checkFavoriteRecipes('favoriteRecipes', id));
    const inProgressRecipes = loadStorage('inProgressRecipes');
    if (inProgressRecipes) {
      const isRecipeInProgress = Object.keys(inProgressRecipes.meals)
        .some((mealId) => mealId === id);
      setIsStartedRecipe(isRecipeInProgress);
    } else {
      newStorage('inProgressRecipes', {
        cocktails: {},
        meals: {},
      });
    }
    setIsDone(loadStorage('doneRecipes')?.some((obj) => obj.id === id));
  }, [id]);

  const favoriteThisRecipe = () => {
    updateStorage('favoriteRecipes', {
      id: data.idMeal,
      type: 'food',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
    });
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    filterItemsById('favoriteRecipes', id);
    setIsFavorite(false);
  };

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite();
      return;
    }
    favoriteThisRecipe();
  };

  const redirect = () => {
    push(`${url}/in-progress`);
  };

  const copyToClipboard = () => {
    copy(`http://localhost:3000/foods/${data.idMeal}`);
    toast.success('Link copied!');
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      <img
        className={ styles.ImgHeader }
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <main
        className={
          `${styles.Main} ${!isDone ? styles.MainMarginBottom : null}`
        }
      >
        <div className={ styles.NameAndIconsContainer }>
          <h2 data-testid="recipe-title" className={ styles.Title }>{data.strMeal}</h2>
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
              className={ isFavorite ? styles.FavoriteActive : styles.Favorite }
              type="image"
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Icon"
              onClick={ handleClick }
            />
          </div>
        </div>
        <p
          data-testid="recipe-category"
          className={ styles.Category }
        >
          { data.strCategory }
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
        <h3>Video</h3>
        <iframe
          className={ styles.Iframe }
          src={ data.strYoutube.replace('watch?v=', 'embed/') }
          data-testid="video"
          title="YouTube video player"
          frameBorder="0"
          allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture
        "
          allowFullScreen
        />
        <h3>Recommended</h3>
        <div
          className={ styles.CardsContainer }
          style={ {
            display: 'flex',
            'flex-flow': 'row nowrap',
            gap: '15px',
            'overflow-x': 'scroll',
            width: '350px',
          } }
        >
          {recommendations?.slice(0, MAX_RECOMMENDATION)
            .map(({ strDrinkThumb, strAlcoholic, idDrink, strDrink }, index) => (
              <Card
                key={ idDrink }
                className={ styles.Card }
                index={ index }
                src={ strDrinkThumb }
                strType={ strAlcoholic }
                name={ strDrink }
                dataTestId={ {
                  container: '-recomendation-card',
                  paragraph: '-recomendation-title',
                } }
              />
            ))}
        </div>
        {!isDone && (
          <Button
            className={ styles.StartButton }
            dataTestId="start-recipe-btn"
            buttonName={ isStartedRecipe ? 'Continue Recipe' : 'Start Recipe' }
            handleClick={ redirect }
          />
        )}
      </main>
    </>
  );
}
