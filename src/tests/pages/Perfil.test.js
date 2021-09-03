import { fireEvent, screen } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { Perfil } from '../../pages';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import setLocalStorage from '../../services/localStorage/setLocalStorage';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('verifica renderização e funcionamento do Perfil', () => {
  afterEach(cleanup);

  setLocalStorage('user', { email: 'test@jest.com' });

  it('verifica se ao carregar o email aparece na tela', () => {
    renderWithRouterAndRedux(<Perfil />);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('test@jest.com');
  });

  it('verifica o redirecionamento ao clicar em receitas feitas', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const doneRecipe = screen.getByTestId('profile-done-btn');
    expect(doneRecipe).toBeInTheDocument();
    expect(doneRecipe).toHaveTextContent('Receitas Feitas');

    fireEvent.click(doneRecipe);

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('verifica o redirecionamento ao clicar em receitas favoritas', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const doneRecipe = screen.getByTestId('profile-favorite-btn');
    expect(doneRecipe).toBeInTheDocument();
    expect(doneRecipe).toHaveTextContent('Receitas Favoritas');

    fireEvent.click(doneRecipe);

    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('verifica o redirecionamento ao clicar em sair', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const doneRecipe = screen.getByTestId('profile-logout-btn');
    expect(doneRecipe).toBeInTheDocument();
    expect(doneRecipe).toHaveTextContent('Sair');

    fireEvent.click(doneRecipe);

    expect(history.location.pathname).toBe('/');

    expect(getLocalStorage('user')).toBeNull();
  });
});
