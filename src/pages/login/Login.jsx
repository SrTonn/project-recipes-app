import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

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
        inputText.password.length > MAX_CHARACTER_LENGTH,
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

  const { push } = useHistory();
  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: inputText.email }));
    push('/foods');
  };

  return (
    <div className={ styles.formContainer }>
      <form className={ styles.form }>
        <label htmlFor="loginInput">
          Login
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => handleChange(target) }
            value={ inputText.email }
            placeholder="Email"
          />
        </label>
        <label htmlFor="passwordInput">
          <input
            type="text"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => handleChange(target) }
            value={ inputText.password }
            placeholder="Senha"
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
