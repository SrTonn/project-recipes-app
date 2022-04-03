import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

export default function FoodDetails() {
  const { params: { id } } = useRouteMatch();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
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
      setFavoritedRecipes(favoriteRecipes);
      const filteredFavorites = favoriteRecipes.some((recipe) => recipe.id === id);
      if (filteredFavorites) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  const favoriteThisRecipe = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    }]));
    setIsFavorite((prevState) => !prevState);
  };

  const removeFavorite = () => {
    const newFavorited = favoritedRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', newFavorited);
  };

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      favoriteThisRecipe();
    }
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
          <Button dataTestId="share-btn" handleClick={ copyToClipboard } src="share-btn">
            <img src={ shareIcon } alt="Ícone de compartilhar" />
          </Button>
          <Button
            dataTestId="favorite-btn"
            handleClick={ handleClick }
            src="favorite-btn"
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Ícone de favorito"
            />
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
          className={ styles.StartButton }
          dataTestId="start-recipe-btn"
          buttonName="Start Recipe"
          handleClick={ handleClick }
        />
      </main>
    </>
  );
}
