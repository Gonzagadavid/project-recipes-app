import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, ButtonRedirect } from '../../components';
import {
  actionEmail, actionTokenDrinks, actionTokenMeals,
} from '../../redux/actions/actionsUser';
import setLocalStorage from '../../services/localStorage/setLocalStorage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [verify, setVerify] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const min = 6;
    const regexpEmail = /\w+@\w+.com(.br)?/g;
    const verifyEmail = regexpEmail.test(email);
    const verifyPassword = password.length > min;
    const verification = (verifyEmail && verifyPassword);
    setVerify(!verification);
  }, [email, password]);

  const submitUser = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', { email });
    dispatch(actionEmail(email));
    dispatch(actionTokenDrinks(1));
    dispatch(actionTokenMeals(1));
  };

  return (
    <form className="Login">
      <Input
        labelText="Email:"
        id="email-input"
        type="email"
        onChange={ ({ target: { value } }) => setEmail(value) }
        value={ email }
      />
      <Input
        labelText="Senha:"
        id="password-input"
        type="password"
        onChange={ ({ target: { value } }) => setPassWord(value) }
        value={ password }
      />
      <ButtonRedirect
        to="/comidas"
        btnText="Entrar"
        id="login-submit-btn"
        disabled={ verify }
        onClick={ submitUser }
      />
    </form>
  );
};

export default Login;
