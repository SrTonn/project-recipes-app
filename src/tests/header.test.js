import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

// let profileBtn;
// beforeEach(() => {
//   profileBtn = screen.getByRole('button', { name: 'Profile' });
// });

describe('9 - Implemente o header na tela principal respeitando os atributos ', () => {
  beforeEach(() => {
    renderPath('/foods');
  });
  it('Tem o botão de perfil na tela principal', () => {
    const profileBtn = screen.getByRole('button', { name: 'profile-icon' });
    expect(profileBtn).toBeInTheDocument();
  });
  it('Tem o título na tela principal', () => {
    const mainTitle = screen.getByRole('heading', { name: /foods/i });
    expect(mainTitle).toBeInTheDocument();
  });
  it('Tem o botão de pesquisa na tela principal', () => {
    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('10.1 - Implemente um ícone para o botão de perfil, busca e título', () => {
  it('Não tem header na tela de login', () => {
    renderPath('/');
    const headerComponent = screen.queryByRole('banner');
    expect(headerComponent).toBeNull();
  });

  it('O header tem os ícones corretos na tela de receitas de comidas', () => {
    renderPath('/foods');
    const foodTitle = screen.getByRole('heading', { name: /foods/i });
    expect(foodTitle).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas de bebidas', () => {
    renderPath('/drinks');
    const drinksTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinksTitle).toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    renderPath('/foods/:id');
    const headerComponent = screen.queryByRole('banner');
    expect(headerComponent).toBeNull();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    renderPath('/drinks/:id');
    const headerComponent = screen.queryByRole('banner');
    expect(headerComponent).toBeNull();
  });

  it('Não tem header na tela de receita em progresso de comida', () => {
    renderPath('/foods/:id/in-progress');
    const headerComponent = screen.queryByRole('banner');
    expect(headerComponent).toBeNull();
  });

  it('Não tem header na tela de receita em progresso de bebida', () => {
    renderPath('/drinks/:id/in-progress');
    const headerComponent = screen.queryByRole('banner');
    expect(headerComponent).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    renderPath('/explore');
    const exploreTitle = screen.getByRole('heading', { name: /explore/i });
    expect(exploreTitle).toBeInTheDocument();
  });
});

describe('10.2 - Implemente um ícone para o botão de perfil, busca e título', () => {
  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    renderPath('/explore/foods');
    const exploreFoodsTitle = screen.getByRole('heading', { name: /explore foods/i });
    expect(exploreFoodsTitle).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    renderPath('/explore/drinks');
    const exploreDrinksTitle = screen.getByRole('heading', { name: /explore drinks/i });
    expect(exploreDrinksTitle).toBeInTheDocument();
  });

  it('O header tem os ícones na tela de explorar comidas por ingrediente', () => {
    renderPath('/explore/foods/ingredients');
    const exploreFoodsIngredientsTitle = screen
      .getByRole('heading', { name: /explore ingredients/i });
    expect(exploreFoodsIngredientsTitle).toBeInTheDocument();
  });

  it('O header tem os ícones na tela de explorar bebidas por ingrediente', () => {
    renderPath('/explore/drinks/ingredients');
    const exploreDrinksIngredientsTitle = screen
      .getByRole('heading', { name: /explore ingredients/i });
    expect(exploreDrinksIngredientsTitle).toBeInTheDocument();
  });

  it('O header tem os ícones na tela de explorar comidas por nacionalidade', () => {
    renderPath('/explore/foods/nationalities');
    const exploreFoodsNationalitiesTitle = screen
      .getByRole('heading', { name: /explore nationalities/i });
    expect(exploreFoodsNationalitiesTitle).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    renderPath('/profile');
    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    renderPath('/done-recipes');
    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitle).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    renderPath('/favorite-recipes');
    const favoriteTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(favoriteTitle).toBeInTheDocument();
  });
});

describe('11. Redirecione para a tela de perfil clicando no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    renderPath('/favorite-recipes');
    const profileBtn = screen.getByRole('button', { name: 'profile-icon' });
    userEvent.click(profileBtn);
    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
  });
});
describe('12 - Desenvolva o botão de busca que, ao ser clicado,'
  + 'a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    renderPath('/drinks');
    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(searchBtn);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    renderPath('/foods');
    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(searchBtn);
    userEvent.click(searchBtn);
    const searchBar = screen.queryByRole('textbox');
    expect(searchBar).toBeNull();
  });
});
