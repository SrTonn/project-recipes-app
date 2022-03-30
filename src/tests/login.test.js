import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from './helpers/renderPath';

let emailInput;
let passwordInput;
let submitButton;
beforeEach(() => {
  renderPath('/');
  emailInput = screen.getByTestId('email-input');
  passwordInput = screen.getByTestId('password-input');
  submitButton = screen.getByTestId('login-submit-btn');
});

describe(
  'Crie todos os elementos que devem respeitar os atributos descritos no protótipo'
    + 'para a tela de login',
  () => {
    it('O input de email deve possuir o atributo data-testid="email-input"', () => {
      expect(emailInput).toBeInTheDocument();
    });
    it('O input de senha deve possuir o atributo data-testid="password-input"', () => {
      expect(passwordInput).toBeInTheDocument();
    });
    it('O botão "Enter" deve possuir o atributo data-testid="login-submit-btn"', () => {
      expect(submitButton).toBeInTheDocument();
    });
  },
);
/*  */

describe(
  'Desenvolva a tela de maneira que a pessoa deve conseguir escrever'
    + 'seu email e sua senha nos seus respectivos inputs',
  () => {
    it('A pessoa deve conseguir escrever seu email no input de email', () => {
      userEvent.type(emailInput, 'trybe@teste.com');
      expect(emailInput).toHaveValue('trybe@teste.com');
    });
    it('A pessoa deve conseguir escrever sua senha no input de senha', () => {
      userEvent.type(passwordInput, '12345678');
      expect(passwordInput).toHaveValue('12345678');
    });
  },
);

describe(
  'Desenvolva a tela de maneira que o formulário só seja válido'
    + ' após um email válido e uma senha de mais de 6 caracteres serem preenchidos',
  () => {
    it('O botão deve estar desativado se o email for inválido', () => {
      userEvent.type(emailInput, 'email@teste');
      userEvent.type(passwordInput, '12345678');
      expect(submitButton).toHaveAttribute('disabled');
    });
    it('O botão deve estar desativado se a senha tiver 6 ou menos caracteres', () => {
      userEvent.type(emailInput, 'emailtestado@teste.com');
      userEvent.type(passwordInput, '123456');
      expect(submitButton).toHaveAttribute('disabled');
    });
  },
);

describe(
  'Salve 2 tokens no localStorage após a submissão, identificados'
    + ' pelas chaves mealsToken e cocktailsToken ',
  () => {
    it('- Após submeter mealsToken e cocktailsToken devem estar salvos em localStorage',
      () => {
        userEvent.type(emailInput, 'email@teste.com');
        userEvent.type(passwordInput, '12345678');
        userEvent.click(submitButton);
        expect(window.localStorage.getItem('mealsToken')).toEqual('1');
        expect(window.localStorage.getItem('cocktailsToken')).toEqual('1');
      });
    it('Salve o e-mail da pessoa usuária no localStorage na chave user após a submissão',
      () => {
        userEvent.type(emailInput, 'email@teste.com');
        userEvent.type(passwordInput, '12345678');
        userEvent.click(submitButton);
        expect(window.localStorage.getItem('user')).toEqual(
          '{"email":"email@teste.com"}',
        );
      });
  },
);

describe(
  'Redirecione a pessoa usuária para a tela principal de receitas'
    + ' de comidas após a submissão e validação com sucesso do login ',
  () => {
    it('- A rota muda para a tela principal de receitas de comidas', () => {
      userEvent.type(emailInput, 'emailteste@teste.com');
      userEvent.type(passwordInput, '12345678');
      userEvent.click(submitButton);
      const tittleNewPage = screen.getByText('Foods');
      expect(tittleNewPage).toBeInTheDocument();
    });
  },
);
