import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

export default function Drinks() {
  const { recipes } = useContext(Context);
  const MAX_RECIPES = 12;

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
