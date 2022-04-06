import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';
import shareIcon from '../../images/shareIcon.svg';
import { loadStorage } from '../../services/storage';

export default function DoneRecipes() {
  const [recipeType, setRecipeType] = useState('all');
  const doneRecipes = loadStorage('doneRecipes');
  const copyToClipboard = ({ id }) => {
    copy(`http://localhost:3000/${id}`);
    toast.success('Link copied!');
  };

  const handleClick = ({ name }) => {
    setRecipeType(name);
  };

  return (
    <main>
      <Toaster />
      <Header />
      <section className={ styles.DoneRecipes }>
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
      {doneRecipes && doneRecipes.filter((recipe) => (
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
            </div>
            <Link to={ `/${item.type}s/${item.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {item.name}
              </h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {item.doneDate}
            </h4>
            {console.log('=>', item)}
            <div className={ styles.TagsContainer }>
              {(item.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              )))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
