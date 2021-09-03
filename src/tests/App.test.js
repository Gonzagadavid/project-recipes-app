import { screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import fetchMock from './mocks/fecthMock';

const SEARCH_INPUT = 'search-input';
const RADIO_NAME = 'name-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';
const BUSCA_ICON = 'search-top-btn';
const callsNumber = 3;

global.fetch = jest.fn(fetchMock);
describe('verifica a renderização e o funcionamento da aplicação', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Ao falhar a requisição de comidas uma messagem aprecena tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />, '/comidas');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const buscaIcon = screen.getByTestId(BUSCA_ICON);
    fireEvent.click(buscaIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'ERROR' } });
    expect(searchInput).toHaveValue('ERROR');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerComidas.error).toContain('Ocorreu um erro');

    const error = screen.getByTestId('error-msg');

    expect(error).toBeInTheDocument();

    const alertbtn = screen.getByTestId('alert-btn');

    expect(alertbtn).toBeInTheDocument();

    fireEvent.click(alertbtn);

    expect(error).not.toBeInTheDocument();
  });

  it('Ao falhar a requisição de bebidas uma messagem aprecena tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />, '/bebidas');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const buscaIcon = screen.getByTestId(BUSCA_ICON);
    fireEvent.click(buscaIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'ERROR' } });
    expect(searchInput).toHaveValue('ERROR');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerBebidas.error).toContain('Ocorreu um erro');

    const error = screen.getByTestId('error-msg');

    expect(error).toBeInTheDocument();

    const alertbtn = screen.getByTestId('alert-btn');

    expect(alertbtn).toBeInTheDocument();

    fireEvent.click(alertbtn);

    expect(error).not.toBeInTheDocument();
  });
});
