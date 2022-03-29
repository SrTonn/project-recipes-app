import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';

export default function Login() {
  const [inputText, setInputText] = useState({
    email: '',
    password: '',
  });

  const [button, setButton] = useState({ isDisable: true });

  useEffect(() => {
    const validateLogin = () => {
      const MAX_CHARACTER_LENGTH = 6;
      const conditions = [
        /^[a-z._-]{3,26}@[a-z]{3,16}\.[a-z]{2,3}$/i.test(inputText.email),
        inputText.password.length >= MAX_CHARACTER_LENGTH,
      ];

      setButton({ isDisable: conditions.includes(false) });
    };
    validateLogin();
  }, [inputText]);

  const handleChange = ({ name, value }) => {
    setInputText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('coctailsToken', '1');
    localStorage.setItem('email:', inputText.email);
  };

  return (
    <div>
      <form>
        <label htmlFor="loginInput">
          Email:
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => handleChange(target) }
            value={ inputText.email }
          />
        </label>
        <label htmlFor="passwordInput">
          Senha:
          <input
            type="text"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => handleChange(target) }
            value={ inputText.password }
          />
        </label>
        <Button
          dataTestId="login-submit-btn"
          buttonName="Entrar"
          isDisabled={ button.isDisable }
          type="button"
          handleClick={ handleSubmit }
        />
      </form>
    </div>
  );
}
