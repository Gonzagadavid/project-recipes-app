import { fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock from '../mocks/fecthMock';
import { soupMeals, ginDrinks } from '../mocks/respMoks';

const SEARCH_INPUT = 'search-input';
const RADIO_NAME = 'name-search-radio';
const RADIO_INGREDIENT = 'ingredient-search-radio';
const FIRST_LETTER = 'first-letter-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';

global.fetch = jest.fn(fetchMock);

describe('verifica a renderização e o funcionamento componente SearchBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('verifica se todos componentes são renderizados', () => {
    renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId(RADIO_INGREDIENT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const radioLetter = screen.getByTestId(FIRST_LETTER);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('verifica redirecionamento caso ocorra apenas um resultado com comida', async () => {
    const { store, history } = renderWithRouterAndRedux(<SearchBar />, '/comidas');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'Arrabiata' } });
    expect(searchInput).toHaveValue('Arrabiata');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerComidas.comidas).toHaveLength(1);
    expect(history.location.pathname).toBe('/comidas/52771');
  });

  it('verifica redirecionamento caso ocorra apenas um resultado com bebida', async () => {
    const { store, history } = renderWithRouterAndRedux(<SearchBar />, '/bebidas');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'Aquamarine' } });
    expect(searchInput).toHaveValue('Aquamarine');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerBebidas.bebidas).toHaveLength(1);
    expect(history.location.pathname).toBe('/bebidas/178319');
  });

  it('verifica busca por nome na pagina de comidas', async () => {
    const { store, history } = renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'Soup' } });
    expect(searchInput).toHaveValue('Soup');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerComidas.comidas).toHaveLength(soupMeals.meals.length);
    expect(history.location.pathname).toBe('/comidas');
  });

  it('verifica busca por nome na pagina de bebidas', async () => {
    const { store, history } = renderWithRouterAndRedux(<SearchBar />, '/bebidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioName);
    expect(radioName).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'gin' } });
    expect(searchInput).toHaveValue('gin');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerBebidas.bebidas).toHaveLength(ginDrinks.drinks.length);
    expect(history.location.pathname).toBe('/bebidas');
  });

  it('Chamada da requisição com primeira letra na pagina de comidas', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioLetter = screen.getByTestId(FIRST_LETTER);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioLetter);
    expect(radioLetter).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'a' } });
    expect(searchInput).toHaveValue('a');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('Chamada da requisição com primeira letra na pagina de bebidas', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/bebidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioLetter = screen.getByTestId(FIRST_LETTER);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioLetter);
    expect(radioLetter).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'a' } });
    expect(searchInput).toHaveValue('a');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('Chamada da requisição por ingrediente com na pagina de comidas', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/comidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId(RADIO_INGREDIENT);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'chilli' } });
    expect(searchInput).toHaveValue('chilli');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('Chamada da requisição com primeira letra na pagina de bebidas', async () => {
    renderWithRouterAndRedux(<SearchBar />, '/bebidas');

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId(RADIO_INGREDIENT);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    fireEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(searchInput, { target: { value: 'limon' } });
    expect(searchInput).toHaveValue('limon');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
