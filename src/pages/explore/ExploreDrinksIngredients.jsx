import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import styles from '../../styles/pageExploreIngredients.module.css';

export default function ExploreDrinksIngredients() {
  const { setRecipesInfo } = useContext(Context);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await response.json();
      const TWELVE = 12;
      setData(drinks.slice(0, TWELVE));
    })();
  }, []);

  const handleClick = ({ target: { name: query } }) => {
    setRecipesInfo({
      canUpdate: true,
      canRedirect: false,
      pathname: '/drinks',
      endpoint: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
    });
  };

  return (
    <>
      <Header />
      <main className={ styles.Main }>
        {data && data.map(({ strIngredient1 }, index) => (
          <Link
            to="/drinks"
            key={ strIngredient1 }
            onClick={ handleClick }
            name={ strIngredient1 }
          >
            <Card
              key={ strIngredient1 }
              index={ index }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              name={ strIngredient1 }
              dataTestId={ {
                container: '-ingredient-card',
                img: '-card-img',
                paragraph: '-card-name',
              } }
            />
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
}
