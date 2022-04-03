import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button/Button';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import styles from './styles.module.css';
import getRecipes from '../../services/fetchRecipes';
import Card from '../../components/Card/Card';
import reduceIngredients from '../../helpers/reduceIngredients';
// import Card from '../../components/Card/Card';

export default function FoodDetails() {
  const { params: { id } } = useRouteMatch();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFavorite, setFavorite] = useState(false);
  const MAX_RECOMMENDATION = 6;

  useEffect(() => {
    (async () => {
      const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setData(meals.at(0));
    })();
    (async () => {
      const { drinks } = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecommendations(drinks);
    })();
  }, [id]);

  const favoriteThisRecipe = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: data.idMeal,
      type: 'food',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb }]));
    setFavorite((prevState) => !prevState);
  };

  const handleClick = () => {
    console.log('ativou handleClick');
    console.log(recommendations);
    console.log(data);
    favoriteThisRecipe();
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
      <div><Toaster /></div>
      <img
        className={ styles.ImgHeader }
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <main className={ styles.Main }>
        <div className={ styles.NameAndIconsContainer }>
          <h2 data-testid="recipe-title" className={ styles.Title }>{data.strMeal}</h2>
          <Button dataTestId="share-btn" src="share-btn" handleClick={ copyToClipboard }>
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
        <div className={ styles.CardsContainer }>
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
