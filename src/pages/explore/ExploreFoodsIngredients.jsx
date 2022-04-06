import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';
import styles from '../../styles/pageExploreIngredients.module.css';

export default function ExploreFoodsIngredients() {
  const { setRecipesInfo } = useContext(Context);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = await response.json();
      const TWELVE = 12;
      setData(meals.slice(0, TWELVE));
    })();
  }, []);

  const handleClick = ({ target: { name: query } }) => {
    setRecipesInfo({
      canUpdate: true,
      canRedirect: false,
      pathname: '/foods',
      endpoint: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    });
  };

  return (
    <>
      <Header />
      <main className={ styles.Main }>
        {data && data.map(({ idIngredient, strIngredient }, index) => (
          <Link
            to="/foods"
            key={ idIngredient }
            onClick={ handleClick }
            name={ strIngredient }
          >
            <Card
              index={ index }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              name={ strIngredient }
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
