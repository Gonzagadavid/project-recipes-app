import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { ExplorarBebidas } from '../../pages';
import ExplorarComidas from '../../pages/Explorar/ExplorarComidas';
import Explore from '../../pages/Explore/Explore';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock from '../mocks/fecthMock';

global.fetch = jest.fn(fetchMock);

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Verifica a rederização e o funcionamento do Explore', () => {
  it('verifica a renrização e o funcionamento do botão Explora bebidas', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const explorarBebidas = screen.getByTestId('explore-drinks');

    expect(explorarBebidas).toBeInTheDocument();
    expect(explorarBebidas).toHaveTextContent('Explorar Bebidas');

    fireEvent.click(explorarBebidas);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });

  it('verifica a renrização e o funcionamento do botão Explora comidas', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);

    const explorarComidas = screen.getByTestId('explore-food');

    expect(explorarComidas).toBeInTheDocument();
    expect(explorarComidas).toHaveTextContent('Explorar Comidas');

    fireEvent.click(explorarComidas);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });
});

describe('Verifica a renderização e o funcionamento de ExplorarComidas', () => {
  it('verifica a renderização e o funcionamento do botão  por local de origem', () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const areaBtn = screen.getByTestId('explore-by-area');

    expect(areaBtn).toBeInTheDocument();
    expect(areaBtn).toHaveTextContent('Por Local de Origem');

    fireEvent.click(areaBtn);

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  it('verifica a renderização e o funcionamento do botão  por ingrediente', () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const ingredienteBtn = screen.getByTestId('explore-by-ingredient');

    expect(ingredienteBtn).toBeInTheDocument();
    expect(ingredienteBtn).toHaveTextContent('Por Ingredientes');

    fireEvent.click(ingredienteBtn);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('verifica a renderização e o funcionamento do botão me surpreenda', async () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const surpriseBtn = screen.getByTestId('explore-surprise');

    expect(surpriseBtn).toBeInTheDocument();
    expect(surpriseBtn).toHaveTextContent('Me Surpreenda!');

    fireEvent.click(surpriseBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(history.location.pathname).toBe('/comidas/52771');
  });
});

describe('Verifica a renderização e o funcionamento de ExplorarComidas', () => {
  it('verifica a renderização e o funcionamento do botão  por ingrediente', () => {
    const { history } = renderWithRouterAndRedux(<ExplorarBebidas />);

    const ingredienteBtn = screen.getByTestId('explore-by-ingredient');

    expect(ingredienteBtn).toBeInTheDocument();
    expect(ingredienteBtn).toHaveTextContent('Por Ingredientes');

    fireEvent.click(ingredienteBtn);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  it('verifica a renderização e o funcionamento do botão me surpreenda', async () => {
    const { history } = renderWithRouterAndRedux(<ExplorarBebidas />);

    const surpriseBtn = screen.getByTestId('explore-surprise');

    expect(surpriseBtn).toBeInTheDocument();
    expect(surpriseBtn).toHaveTextContent('Me Surpreenda!');

    fireEvent.click(surpriseBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(history.location.pathname).toBe('/bebidas/178319');
  });
});
