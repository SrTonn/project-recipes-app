import { screen } from '@testing-library/react';

import renderPath from './helpers/renderPath';

describe('Adicione um footer a tela.', () => {
  beforeEach(() => {
    renderPath('/foods');
  });

  it('Verifica se contém footer na rota \'/foods\'', async () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se a página contém os botões de \'drinks\' \'explore\' e \'food\'',
    async () => {
      const drinksBtn = screen.getByTestId('drinks-bottom-btn');
      const exploreBtn = screen.getByTestId('explore-bottom-btn');
      const foodBtn = screen.getByTestId('food-bottom-btn');
      expect(drinksBtn && exploreBtn && foodBtn).toBeInTheDocument();
    });

  it('Verifica se ao clicar no botão \'explore\' a página é redirecionada corretamente',
    async () => {
      const exploreImg = screen.getByRole('img', { name: /exploreicon/i });
      exploreImg.click();
      const exploreText = screen.getByText(/explore/i);
      expect(exploreText).toBeInTheDocument();
    });
});
