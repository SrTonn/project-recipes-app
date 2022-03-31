import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

export default function Drinks() {
  const { recipes } = useContext(Context);
  const MAX_RECIPES = 12;

  return (
    <main>
      <Header />
      <div>
        {recipes?.length > 0
          && (recipes
            .slice(0, MAX_RECIPES)
            .map(({ strDrink, strDrinkThumb }, index) => (
              <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strDrinkThumb }
                  alt={ `Imagem da receita ${strDrink}` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </div>)))}
      </div>
    </main>
  );
}
