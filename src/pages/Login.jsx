import React from 'react';
import Button from '../components/Button/Button';

export default function Login() {
  return (
    <div>
      <form>
        <label htmlFor="loginInput">
          Email:
          <input type="text" name="login" data-testid="email-input" />
        </label>
        <label htmlFor="passwordInput">
          Senha:
          <input type="text" name="password" data-testid="password-input" />
        </label>
        <Button dataTestId="login-submit-btn" buttonName="Entrar" />
      </form>
    </div>
  );
}
