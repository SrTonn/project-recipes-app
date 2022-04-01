import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Button from '../../components/Button/Button';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
// import favoritedIcon from '../../../images/blackHeartIcon.svg';
import styles from './styles.module.css';

export default function FoodDetails() {
  const { params: { id } } = useRouteMatch();
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      setData(meals.at(0));
    })();
  }, []);

  const handleClick = () => {
    console.log('ativou handleClick');
    console.log(data);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        className={ styles.ImgHeader }
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <div className={ styles.NameAndIconsContainer }>
        <h2 data-testid="recipe-title" className={ styles.Title }>{data.strMeal}</h2>
        <Button dataTestId="share-btn" src="share-btn" handleClick={ handleClick }>
          <img src={ shareIcon } alt="Ícone de compartilhar" />
        </Button>
        <Button dataTestId="favorite-btn" handleClick={ handleClick } src="favorite-btn">
          <img src={ favoriteIcon } alt="Ícone de favorito" />
        </Button>
      </div>
      <p data-testid="recipe-category">{ data.strCategory }</p>
      <h3>Ingredients</h3>
      <div>
        <ul>
          { /* map  data-testid="${index}-ingredient-name-and-measure" */ }
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
      {/* <iframe
        width="560"
        height="315"
        src={ data.strYoutube }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      /> */}
      {/* <embed
        type="video/webm"
        src={ data.strYoutube }
        width="250"
        height="200"
      /> */}
      <h3>Recommended</h3>
      <div>
        {/* cards com scroll horizontal data-testid="${index}-recomendation-card" */}
      </div>
      <Button
        className={ styles.StartButton }
        dataTestId="start-recipe-btn"
        buttonName="Start Recipe"
        handleClick={ handleClick }
      />
    </div>
  );
}
