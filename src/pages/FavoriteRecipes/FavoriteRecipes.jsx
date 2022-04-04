import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';
import shareIcon from '../../images/shareIcon.svg';
// import favoritedIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [recipeType, setRecipeType] = useState('all');
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
    {
      id: '1111',
      type: 'aaaa',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'NO Alcoholiccccccc',
      name: 'Aquamarine',
      image: 'https://conteudo.imguol.com.br/c/entretenimento/e7/2017/03/24/teletubbies-1490373962319_v2_1x1.jpg',
      doneDate: '06/23/2077',
      tags: ['Tinky Winky', 'Laa-Laa', 'Poo', 'Dipsy'],
    },
  ];

  const copyToClipboard = ({ id }) => {
    copy(`http://localhost:3000/${id}`);
    toast.success('Link copied!');
  };

  const handleClick = ({ name }) => {
    setRecipeType(name);
  };

  return (
    <main>
      <div><Toaster /></div>
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
              >
                <img
                  id={ `${item.type}s/${item.id}` }
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
