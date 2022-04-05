import React, { useContext } from 'react';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import styles from './styles.module.css';

export default function Foods() {
  const { recipes } = useContext(Context);
  const MAX_RECIPES = 12;

  return (
    <>
      <Header />
      <main className={ styles.Main }>
        {console.log(recipes)}
        {recipes?.length > 0 && (
          recipes
            .slice(0, MAX_RECIPES)
            .map(({ strMeal, strMealThumb }, index) => (
              <Card
                key={ strMeal }
                index={ index }
                src={ strMealThumb }
                name={ strMeal }
                dataTestId={ {
                  container: '-recipe-card',
                  img: '-card-img',
                  paragraph: '-card-name',
                } }
              />
            ))
        )}
      </main>
      <Footer />
    </>
  );
}
