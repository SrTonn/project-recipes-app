import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function FavoriteRecipes() {
  const [recipeType, setRecipeType] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);

  const copyToClipboard = ({ id }) => {
    copy(window.location.href.replace('favorite-recipes', id));
    toast.success('Link copied!');
  };

  const handleClick = ({ name }) => {
    setRecipeType(name);
  };

  const removeFavorite = ({ id }) => {
    const favoriteFiltered = favoriteRecipes.filter((favorite) => favorite.id !== id);
    setFavoriteRecipes(favoriteFiltered);
  };

  return (
    <main>
      <Toaster />
      <Header />
      <section className={ styles.FavoriteRecipes }>
        <Button
          name="all"
          buttonName="All"
          dataTestId="filter-by-all-btn"
          handleClick={ handleClick }
        />
        <Button
          name="food"
          buttonName="Foods"
          dataTestId="filter-by-food-btn"
          handleClick={ handleClick }
        />
        <Button
          name="drink"
          buttonName="Drinks"
          dataTestId="filter-by-drink-btn"
          handleClick={ handleClick }
        />
      </section>
      <section>
        { favoriteRecipes.filter((recipe) => (
          recipeType !== 'all' ? recipe.type === recipeType : true
        )).map((item, index) => (
          <div key={ item.id } className={ styles.CardContainer }>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                alt={ `Imagem da receita ${item.name}` }
                src={ item.image }
                className={ styles.MealImage }
              />
            </Link>
            <div>
              {item.alcoholicOrNot ? (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </h4>
              )
                : (
                  <h4 data-testid={ `${index}-horizontal-top-text` }>
                    {`${item.nationality} - ${item.category}`}
                  </h4>)}
              <Link to={ `/${item.type}s/${item.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>
                  {item.name}
                </h3>
              </Link>
              <Button
                dataTestId={ `${index}-horizontal-share-btn` }
                src="shareIcon"
                className={ styles.SharedButton }
                handleClick={ copyToClipboard }
              >
                <img
                  id={ `${item.type}s/${item.id}` }
                  src={ shareIcon }
                  alt="Ícone de compartilhar"
                />
              </Button>
              <Button
                dataTestId={ `${index}-horizontal-favorite-btn` }
                src="blackHeartIcon"
                handleClick={ removeFavorite }
              >
                <img
                  id={ item.id }
                  src={ blackHeartIcon }
                  alt="Ícone de desfavoritar"
                />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
