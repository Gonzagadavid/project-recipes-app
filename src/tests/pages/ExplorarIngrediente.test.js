import { cleanup } from '@testing-library/react';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import React from 'react';
import { ExplorarIngredientesBebidas, ExplorarIngredientesComidas } from '../../pages';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock from '../mocks/fecthMock';
import { drinkIngredients, mealIngredients } from '../mocks/respMoks';

global.fetch = jest.fn(fetchMock);

const limit = 12;

describe('verifica a renderização e o funcionamento de'
  + 'Explorar por Ingredientes', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('verifica se a rederização e o funcionamento de bebidas', async () => {
    const { history, store } = renderWithRouterAndRedux(
      <ExplorarIngredientesBebidas />, '/explorar/bebidas/ingredientes',
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerBebidas.ingredientes).toEqual(drinkIngredients.drinks);

    const cards = screen.getAllByTestId(/ingredient-card/);
    expect(cards).toHaveLength(limit);

    fireEvent.click(cards[0]);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe('/bebidas');
  });

  it('verifica se a rederização e o funcionamento de comiidas', async () => {
    const { history, store } = renderWithRouterAndRedux(
      <ExplorarIngredientesComidas />, '/explorar/comidas/ingredientes',
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerComidas.ingredientes).toEqual(mealIngredients.meals);

    const cards = screen.getAllByTestId(/ingredient-card/);
    expect(cards).toHaveLength(limit);

    fireEvent.click(cards[0]);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe('/comidas');
  });
});
