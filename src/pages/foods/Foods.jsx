import React, { useContext } from 'react';
import BarraDeBusca from '../../components/BarraDeBusca/BarraDeBusca';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

export default function Foods() {
  const { recipes } = useContext(Context);
  const MAX_RECIPES = 12;

  return (
    <main>
      <Header />
      <BarraDeBusca />
      <div>
        {recipes?.length > 0
          && (recipes
            .slice(0, MAX_RECIPES)
            .map(({ strMeal, strMealThumb }, index) => (
              <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strMealThumb }
                  alt={ `Imagem da receita ${strMeal}` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </div>)))}
      </div>
    </main>
  );
}
