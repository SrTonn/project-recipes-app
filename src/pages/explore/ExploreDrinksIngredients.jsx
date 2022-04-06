import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from '../../styles/pageExploreIngredients.module.css';

export default function ExploreDrinksIngredients() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await response.json();
      const TWELVE = 12;
      setData(drinks.slice(0, TWELVE));
    })();
  }, []);

  return (
    <>
      <Header />
      <main className={ styles.Main }>
        {console.log(data)}
        {data && data.map(({ strIngredient1 }, index) => (
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
        ))}
      </main>
      <Footer />
    </>
  );
}
