import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import Header from '../../components/Header/Header';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

describe('verifica a renderização e o funcionamento do componente Header', () => {
  it('ao passar um titulo como props ele é renderizado  corretamente', () => {
    renderWithRouterAndRedux(<Header title="Titulo de exemplo" />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Titulo de exemplo');
  });

  it('verifica se possui o icone de perfil, e se redireciona para /perfil', () => {
    const { history } = renderWithRouterAndRedux(<Header title="Titulo de exemplo" />);

    const perfilIcon = screen.getByTestId('profile-top-btn');

    expect(perfilIcon).toBeInTheDocument();
    expect(perfilIcon.tagName).toBe('IMG');
    expect(perfilIcon).toHaveAttribute('src', ProfileIcon);

    fireEvent.click(perfilIcon);

    expect(history.location.pathname).toBe('/perfil');
  });

  it('verifica a renderização e o funcionamento do botão de busca', () => {
    renderWithRouterAndRedux(<Header title="Titulo de exemplo" />);

    const buscaIcon = screen.getByTestId('search-top-btn');

    expect(buscaIcon).toBeInTheDocument();
    expect(buscaIcon.parentNode.tagName).toBe('BUTTON');
    expect(buscaIcon.tagName).toBe('IMG');
    expect(buscaIcon).toHaveAttribute('src', SearchIcon);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    fireEvent.click(buscaIcon);

    expect(screen.queryByRole('textbox')).toBeInTheDocument();

    fireEvent.click(buscaIcon);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
