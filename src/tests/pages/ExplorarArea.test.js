import { cleanup } from '@testing-library/react';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import React from 'react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock2 from '../mocks/fecthMock2';
import { areas } from '../mocks/respMoks';
import ExplorarComidasArea from '../../pages/Area/ExplorarComidasArea';

global.fetch = jest.fn(fetchMock2);

const limit = 12;

describe('verifica a renderização e o funcionamento de'
  + 'Explorar por Areas', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('verifica se a rederização e o funcionamento de comidas', async () => {
    const { store } = renderWithRouterAndRedux(
      <ExplorarComidasArea />, '/explorar/comidas/area',
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(store.getState().reducerComidas.regioes).toEqual(areas.meals);

    const area = screen.getByTestId('American-option');

    expect(area).toBeInTheDocument();

    fireEvent.click(area);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const cards = screen.getAllByTestId(/recipe-card/i);

    expect(cards).toHaveLength(limit);
    expect(screen.getAllByTestId(/-option/i)).toHaveLength(areas.meals.length + 1);
  });
});
