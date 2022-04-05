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
import reduceIngredients from '../../helpers/reduceIngredients';
import {
  checkFavoriteRecipes,
  filterItemsById,
  updateStorage,
} from '../../services/storage';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function FoodInProgress() {
  const { params: { id } } = useRouteMatch();
  const { push } = useHistory();
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useLocalStorage(
    'inProgressRecipes', {
      cocktails: {},
      meals: { [id]: [] },
    },
  );
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);

  useEffect(() => {
    (async () => {
      const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setData(meals[0]);
    })();
    setIsFavorite(checkFavoriteRecipes('favoriteRecipes', id));
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

  const saveInLocalStorageAndRedirect = () => {
    const doneDate = new Date();
    setDoneRecipes([
      ...doneRecipes,
      {
        id,
        doneDate,
        name: data.strMeal,
        type: 'meal',
        nationality: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        image: data.strMealThumb,
        tags: data.strTags,
      },
    ]);
    push('/done-recipes');
  };

  const copyToClipboard = () => {
    copy(window.location.href.replace('/in-progress', ''));
    toast.success('Link copied!');
  };

  const handleChange = ({ name, checked }) => {
    const originalRecipes = JSON.parse(JSON.stringify(inProgressRecipes));
    const mealList = originalRecipes.meals[id];
    const index = mealList?.indexOf(name);

    if (!checked) {
      mealList.splice(index, 1);
      if (mealList.length === 0) delete originalRecipes.meals[id];
      setInProgressRecipes({ ...originalRecipes });
      return;
    }

    setInProgressRecipes({
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [id]: mealList ? [...mealList, name] : [name],
      },
    });
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
      <main className={ styles.Main }>
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
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ value }
                key={ value }
              >
                <input
                  type="checkbox"
                  id={ value }
                  name={ value }
                  checked={
                    inProgressRecipes?.meals[id]
                      ?.some((recipe) => recipe === value)
                  }
                  onChange={ ({ target }) => handleChange(target) }
                />
                <li>{value}</li>
              </label>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p
          className={ styles.Instructions }
          data-testid="instructions"
        >
          {data.strInstructions}
        </p>
        <Button
          className={ styles.StartButton }
          dataTestId="finish-recipe-btn"
          buttonName="Finish Recipe"
          isDisabled={
            reduceIngredients(data).length !== inProgressRecipes.meals[id]?.length
          }
          handleClick={ saveInLocalStorageAndRedirect }
        />
      </main>
    </>
  );
}
