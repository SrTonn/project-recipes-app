import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
// jest.mock('clipboard-copy', () => jest.fn());
// const copy = require('clipboard-copy');

let IsAlcoholicId;
// let clipboard;

beforeEach(() => {
  window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  renderPath('/done-recipes');
  IsAlcoholicId = '1-horizontal-top-text';
  // clipboard = navigator.clipboard.writeText(window.location.href).resolves('http://localhost:3000/done-recipes');
});

afterEach(() => {
  window.localStorage.clear();
});

describe('54. Os elementos da tela devem estar de acordo ao protótipo', () => {
  it('Todos os elementos estão na tela', () => {
    const clearFilterBtn = screen.getByRole('button', { name: /all/i });
    const foodsBtn = screen.getByRole('button', { name: /foods/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const recipeImg = screen.getByTestId('0-horizontal-image');
    const recipeOrigin = screen.getByTestId('0-horizontal-top-text');
    const recipeName = screen.getByTestId('0-horizontal-name');
    const recipeDate = screen.getByTestId('0-horizontal-done-date');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const foodTags1 = screen.getByText(/pasta/i);
    const foodTags2 = screen.getByText(/curry/i);
    expect(
      clearFilterBtn
      && foodsBtn
      && drinksBtn
      && recipeImg
      && recipeOrigin
      && recipeName
      && recipeDate
      && shareBtn
      && foodTags1
      && foodTags2,
    ).toBeInTheDocument();
  });
});

describe('55. Com a receita de comida a tela deve possuir os elementos corretos', () => {
  it('O card possui os atributos corretos de uma comida', () => {
    const foodTags1 = screen.getByText(/pasta/i);
    const foodTags2 = screen.getByText(/curry/i);
    expect(foodTags1 && foodTags2).toBeInTheDocument();
  });
});

describe('56. Com a receita de bebida a tela deve possuir os elementos corretos', () => {
  it('O card possui os atributos corretos de uma bebida', () => {
    const isAlcoholicText = screen.getByTestId(IsAlcoholicId);
    expect(isAlcoholicText).toBeInTheDocument();
  });
});

// describe('57. O botão de compartilhar deve funcionar corretamente', () => {
//   it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', async () => {
//     copy.mockImplementation(() => null);
//     console.log(copy);
//     copy.mockImplementation(() => null);
//     const shareBtn = await screen.getByRole('button', { name: /shareButton/i });
//     screen.getByTestId('0-horizontal-share-btn');
//     expect(shareBtn).toBeInTheDocument();
//     console.log(shareBtn);
//     userEvent.click(shareBtn);
//     const shareMessage = screen.getByRole('banner');
//     await waitFor(() => {}, { timeout: 2000 });
//     // console.log(window.navigator.clipboard);
//     expect(shareMessage).toBeInTheDocument();
//   });

//   it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
//     const shareBtn = screen.getByTestId('0-horizontal-share-btn');
//     userEvent.click(shareBtn);
//     // pegando o clipboard
//     expect(clipboard).toHaveTextContent('http://localhost:3000/foods/52771');
//   });
// });

describe('58. Os botões de filtro devem funcionar corretamente', () => {
  it('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas', () => {
    const foodsBtn = screen.getByRole('button', { name: /foods/i });
    userEvent.click(foodsBtn);
    const isAlcoholicText = screen.queryByTestId(IsAlcoholicId);
    expect(isAlcoholicText).toBeNull();
  });

  it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(drinksBtn);
    const foodTags1 = screen.queryByText(/pasta/i);
    const foodTags2 = screen.queryByText(/curry/i);
    expect(foodTags1 && foodTags2).toBeNull();
  });

  it('Ao clicar no botão "All" o filtro deve ser removido', () => {
    const foodsBtn = screen.getByRole('button', { name: /foods/i });
    userEvent.click(foodsBtn);
    const clearFilterBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(clearFilterBtn);
    const isAlcoholicText = screen.queryByTestId(IsAlcoholicId);
    expect(isAlcoholicText).toBeInTheDocument();
  });
});

describe('59 - A foto ou nome da receita devem levar à tela com os seus detalhes', () => {
  it('Quando clicada, a foto da receita deve levar à tela com os seus detalhes', () => {
    const recipeImg = screen.getByTestId('0-horizontal-image');
    userEvent.click(recipeImg);
    expect(document.location.pathname).toBe('/foods/52771');
  });

  it('Quando clicado, o nome da receita deve levar à tela com os seus detalhes', () => {
    const recipeName = screen.getByTestId('0-horizontal-name');
    userEvent.click(recipeName);
    expect(document.location.pathname).toBe('/foods/52771');
  });
});
