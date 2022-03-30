import React, { useContext } from 'react';
import BarraDeBusca from '../../components/BarraDeBusca/BarraDeBusca';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

export default function Drinks() {
  const { recipesToRender } = useContext(Context);
  console.log('recipes to render no drinks', recipesToRender);
  const MAX_RECIPES = 12;
  // const drinksToRender = recipesToRender.drinks;
  // console.log('drinks to render no drinks', drinksToRender);

  return (
    <main>
      <Header />
      <BarraDeBusca />
      <div>
        {recipesToRender.length > 0
          && (recipesToRender
            .slice(0, MAX_RECIPES)
            .map(({ strDrink, strDrinkThumb }) => (
              <div key={ strDrink }>
                <img src={ strDrinkThumb } alt={ `Imagem da receita ${strDrink}` } />
                <p>{ strDrink }</p>
              </div>)))}
      </div>
    </main>
  );
}
