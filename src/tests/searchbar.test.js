import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';


describe('Verificação dos elementos da barra de busca', () => {
  renderPath('/foods');
  const showSearchBarButton = screen.getByTestId('search-top-btn');
  userEvent.click(showSearchBarButton);

  it('Verifica se os elementos da barra de busca são exibidos na tela', () => {
    const ingredientRadioBtn = screen.getByRole('radio', { name: /ingredient/i });
    const nameRadioBtn = screen.getByRole('radio', { name: /name/i });
    const firstLetterRadioBtn = screen.getByRole('radio', { name: /first letter/i });
    const searchBtn = screen.getByRole('button', { name: /buscar/i });
    expect(ingredientRadioBtn && nameRadioBtn && firstLetterRadioBtn && searchBtn)
      .toBeInTheDocument();
  });
});

describe('Verificação do funcionamento da barra de busca', () => {
  beforeEach(() => {
    renderPath('/foods');
    const showSearchBarButton = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);
  });
  // it('Verifica se o botão ingredient seleciona o modo de busca correto', () => {
  //   const searchInput = screen.getByTestId('search-input');
  //   const ingredientRadioBtn = screen.getByRole('radio', { name: /ingredient/i });
  //   const searchBtn = screen.getByRole('button', { name: /buscar/i });
  //   expect(searchInput && ingredientRadioBtn).toBeInTheDocument();
  //   userEvent.click(ingredientRadioBtn);
  //   userEvent.type(searchInput, 'chicken');
  //   userEvent.click(searchBtn);
  //   expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  // });

  it('Verifica se o botão name seleciona o modo de busca corretamente', () => {
    const searchInput = screen.getByTestId('search-input');
    const nameRadioBtn = screen.getByRole('radio', { name: /name/i });
    const searchBtn = screen.getByRole('button', { name: /buscar/i });
    expect(searchInput && nameRadioBtn && searchBtn).toBeInTheDocument();
    userEvent.click(nameRadioBtn);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(searchBtn);
    const results = screen.getAllByTestId(/recipe-card/i);
    const resultsFiltered = results.every((recipe) => )
    
  });

  it('Verifica se o botão first letter seleciona o modo de busca corretamente', () => {
    expect(searchInput && firstLetterRadioBtn).toBeInTheDocument();
    userEvent.click(firstLetterRadioBtn);
    userEvent.type(searchInput, 'c');
    expect(fetch()).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
  });

  // it('Escolhido o botão first letter, mostra um alert ao buscar mais de uma letra',
  //   () => {
  //     expect(searchInput && firstLetterRadioBtn && searchBtn).toBeInTheDocument();
  //     userEvent.click(firstLetterRadioBtn);
  //     userEvent.type(searchInput, 'ca');
  //     userEvent.click(searchBtn);
  //     //Descobrir como testar alert
  //   });
});
