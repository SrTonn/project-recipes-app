import React, { useContext, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Categories from '../../components/CategoriesFilter/Categories';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import styles from './styles.module.css';

export default function Foods() {
  const { recipes, setRecipesInfo } = useContext(Context);

  const MAX_RECIPES = 12;

  useEffect(() => {
    setRecipesInfo({
      canUpdate: true,
      pathname: '/foods',
      endpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    });
  }, []);

  return (
    <>
      <Header />
      <Categories />
      <main className={ styles.Main }>
        {recipes?.length > 0 && (
          recipes
            .slice(0, MAX_RECIPES)
            .map(({ strMeal, strMealThumb }, index) => (
              <Card
                key={ strMeal }
                index={ index }
                src={ strMealThumb }
                strType={ strMeal }
              />
            ))
        )}

      </main>
      <Footer />
    </>
  );
}
