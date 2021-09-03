import { screen } from '@testing-library/dom';
import React from 'react';
import App from '../../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('verifica a renderização da mensagem not found caso não exista rota', () => {
  it('verifica se a pagina é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/nao-existe');

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
