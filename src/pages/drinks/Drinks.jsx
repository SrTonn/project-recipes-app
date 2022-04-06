import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import Categories from '../../components/CategoriesFilter/Categories';

export default function Drinks() {
  const { recipes, recipesInfo, setRecipesInfo } = useContext(Context);
  const MAX_RECIPES = 12;

  useEffect(() => {
    if (!recipesInfo.endpoint) {
      setRecipesInfo({
        canUpdate: true,
        pathname: '/drinks',
        endpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Categories />
      <main>
        {recipes?.length > 0
          && (recipes
            .slice(0, MAX_RECIPES)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <Link to={ `/drinks/${idDrink}` } key={ strDrink }>
                <Card
                  key={ strDrink }
                  index={ index }
                  src={ strDrinkThumb }
                  name={ strDrink }
                  dataTestId={ {
                    container: '-recipe-card',
                    img: '-card-img',
                    paragraph: '-card-name',
                  } }
                />
              </Link>
            ))
          )}
      </main>
      <Footer />
    </>
  );
}
