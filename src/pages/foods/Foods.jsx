import React, { useContext, useEffect } from 'react';
import BarraDeBusca from '../../components/BarraDeBusca/BarraDeBusca';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

export default function Foods() {
  const { recipesToRender } = useContext(Context);
  console.log('recipes to render no foods', recipesToRender);

  useEffect(() => {
  }, [recipesToRender]);

  return (
    <main>
      <Header />
      <BarraDeBusca />
      {/* <div>Foods</div> */}
      <div>
        {recipesToRender.length > 0
          && (recipesToRender.map((recipe) => (
            <div key={ recipe.strMeal }>
              <p>Teste</p>
              <p>{ recipe.strMeal }</p>
            </div>)))}
        {/* // : <p>Nenhuma receita listada</p> */}
      </div>
    </main>
  );
}
