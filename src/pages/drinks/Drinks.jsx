import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

export default function Drinks() {
  const { recipes, setRecipesInfo } = useContext(Context);
  const MAX_RECIPES = 12;

  useEffect(() => {
    setRecipesInfo({
      canUpdate: true,
      pathname: '/drinks',
      endpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        {recipes?.length > 0
          && (recipes
            .slice(0, MAX_RECIPES)
            .map(({ strDrink, strDrinkThumb }, index) => (
              <Card
                key={ strDrink }
                index={ index }
                src={ strDrinkThumb }
                strType={ strDrink }
              />
            ))
          )}
      </main>
      <Footer />
    </>
  );
}
