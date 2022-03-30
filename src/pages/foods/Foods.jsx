import React, { useContext } from 'react';
import BarraDeBusca from '../../components/BarraDeBusca/BarraDeBusca';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

export default function Foods() {
  const { recipesToRender } = useContext(Context);
  console.log('recipes to render no foods', recipesToRender);
  const MAX_RECIPES = 12;
  // const mealsToRender = recipesToRender.meals;

  return (
    <main>
      <Header />
      <BarraDeBusca />
      <div>
        {recipesToRender.length > 0
          && (recipesToRender
            .slice(0, MAX_RECIPES)
            .map(({ strMeal, strMealThumb }) => (
              <div key={ strMeal }>
                <img src={ strMealThumb } alt={ `Imagem da receita ${strMeal}` } />
                <p>{ strMeal }</p>
              </div>)))}
        {/* // : <p>Nenhuma receita listada</p> */}
      </div>
    </main>
  );
}
