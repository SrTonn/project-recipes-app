import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from '../../styles/pageExploreIngredients.module.css';

export default function ExploreFoodsIngredients() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = await response.json();
      const TWELVE = 12;
      setData(meals.slice(0, TWELVE));
    })();
  }, []);

  return (
    <>
      <Header />
      <main className={ styles.Main }>
        {console.log(data)}
        {data && data.map(({ idIngredient, strIngredient }, index) => (
          <Card
            key={ idIngredient }
            index={ index }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            name={ strIngredient }
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
