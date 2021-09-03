import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Login } from '../../pages';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('verifica a renderização e o funcionamento do pagina login', () => {
  const ID_BUTTON = 'login-submit-btn';
  const ID_EMAIL = 'email-input';
  const ID_SENHA = 'password-input';
  const userEmail = 'patriciaDev@server.com';
  const userEmailInvalido = 'patriciaDevserver.com';
  const senhaValida = '1234565';
  const senhaInvalida = '1234';

  it('verifica a url da pagina', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('verifica se renderiza com o botão desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId(ID_BUTTON);
    expect(button).toBeDisabled();
  });

  it('Se ao digitar um email e a senha invalida o botao continua desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId(ID_BUTTON);
    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);

    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(senha, { target: { value: senhaInvalida } });

    expect(email).toHaveValue(userEmail);
    expect(button).toBeDisabled();
  });

  it('Se ao digitar email invalido e senha o botao é desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);
    const button = screen.getByTestId(ID_BUTTON);

    fireEvent.change(email, { target: { value: userEmailInvalido } });
    fireEvent.change(senha, { target: { value: senhaValida } });

    expect(button).toBeDisabled();
  });

  it('Se ao digitar email e senha o botao é habilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);
    const button = screen.getByTestId(ID_BUTTON);

    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(senha, { target: { value: senhaValida } });

    expect(button).toBeEnabled();
  });

  it('Ao clicar no botão a pagina é redirecionada para a tela principal', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);
    const button = screen.getByTestId(ID_BUTTON);

    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(senha, { target: { value: senhaValida } });

    expect(button).toBeEnabled();

    expect(history.location.pathname).toBe('/');

    fireEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });

  it('Ao clicar no botão a informações são salvas no localStorage', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);
    const button = screen.getByTestId(ID_BUTTON);

    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(senha, { target: { value: senhaValida } });

    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(JSON.parse(localStorage.getItem('user')).email).toBe(userEmail);
    expect(JSON.parse(localStorage.getItem('cocktailsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('mealsToken'))).toBe(1);
  });

  it('Ao clicar no botão a informações são salvas no store do redux', () => {
    const { store } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const senha = screen.getByTestId(ID_SENHA);
    const button = screen.getByTestId(ID_BUTTON);

    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(senha, { target: { value: senhaValida } });

    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(store.getState().reducerUser.email).toBe(userEmail);
    expect(store.getState().reducerUser.cocktailsToken).toBe(1);
    expect(store.getState().reducerUser.mealsToken).toBe(1);
  });
});
