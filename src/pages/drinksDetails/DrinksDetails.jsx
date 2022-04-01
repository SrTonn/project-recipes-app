import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

export default function FoodDetails() {
  const { params: { id } } = useRouteMatch();
  const [data, setData] = useState(null);
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
  }, []);

  const handleClick = () => {
    console.log('ativou handleClick');
  };

  return (
    <div>
      {console.log(data)}
      <img
        className={ styles.ImgHeader }
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ data.strDrink }</h2>
      <Button dataTestId="share-btn" handleClick={ handleClick } src="share-btn">
        <img src={ shareIcon } alt="Ícone de compartilhar" />
      </Button>
      <Button dataTestId="favorite-btn" handleClick={ handleClick } src="favorite-btn">
        <img src={ favoriteIcon } alt="Ícone de favorito" />
      </Button>
      <p data-testid="recipe-category">{ data.strCategory }</p>
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
