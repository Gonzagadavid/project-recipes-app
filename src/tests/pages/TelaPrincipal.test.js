import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Bebidas from '../../pages/Principal/Bebidas';
import Comidas from '../../pages/Principal/Comidas';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import fetchMock from '../mocks/fecthMock';
import {
  mealCategories, drinkCategories, chickenMeals, cocktailDrinks, meals, drinks,
  oneDrink, oneMeal,
} from '../mocks/respMoks';

const maxCards = 12;
const callsNumber = 3;
const btnCategories = 6;
const ALL = 'All-category-filter';
const SEARCH_INPUT = 'search-input';
const RADIO_NAME = 'name-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';
const BUSCA_ICON = 'search-top-btn';

global.fetch = jest.fn(fetchMock);

describe('verifica a renderização e o funcionamento da tela principal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('verifica se contém 12 cards na pagina de comidas', async () => {
    renderWithRouterAndRedux(<Comidas />, '/comidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const cards = screen.getAllByTestId(/card-name/i);

    expect(cards).toHaveLength(maxCards);
  });

  it('verifica se contém 12 cards na pagina de bebidas', async () => {
    renderWithRouterAndRedux(<Bebidas />, '/bebidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const cards = screen.getAllByTestId(/card-name/i);

    expect(cards).toHaveLength(maxCards);
  });

  it('Contém 5 botões de categorias e 1 All na pagina de comidas', async () => {
    const { store } = renderWithRouterAndRedux(<Comidas />, '/comidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    expect(store.getState().reducerComidas.categorias).toEqual(mealCategories.meals);

    const categoriasBtns = screen.getAllByTestId(/category-filter/i);

    expect(categoriasBtns).toHaveLength(btnCategories);
    expect(screen.getByTestId(ALL)).toBeInTheDocument();
  });

  it('Contém 5 botões de categorias e 1 All na pagina de bebidas', async () => {
    const { store } = renderWithRouterAndRedux(<Bebidas />, '/bebidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    expect(store.getState().reducerBebidas.categorias).toEqual(drinkCategories.drinks);

    const categoriasBtns = screen.getAllByTestId(/category-filter/i);

    expect(categoriasBtns).toHaveLength(btnCategories);
    expect(screen.getByTestId(ALL)).toBeInTheDocument();
  });

  it('Clicar no botão chicken em comidas a requisição é feita de acordo'
    + 'e ao clicar em all o filtro é retirado', async () => {
    const { store, history } = renderWithRouterAndRedux(<Comidas />, '/comidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    const all = screen.getByTestId(ALL);

    expect(chickenBtn).toBeInTheDocument();

    fireEvent.click(chickenBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerComidas.comidas).toEqual(chickenMeals.meals);
    expect(history.location.pathname).toBe('/comidas');

    fireEvent.click(all);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 2));

    expect(store.getState().reducerComidas.comidas).toEqual(meals.meals);
    expect(history.location.pathname).toBe('/comidas');
  });

  it('Clicar no botão cocktail em bebidas a requisição é feita de acordo'
    + 'e ao clicar em all o filtro é retirado', async () => {
    const { store, history } = renderWithRouterAndRedux(<Bebidas />, '/bebidas');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber));

    const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
    const all = screen.getByTestId(ALL);

    expect(cocktailBtn).toBeInTheDocument();

    fireEvent.click(cocktailBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerBebidas.bebidas).toEqual(cocktailDrinks.drinks);
    expect(history.location.pathname).toBe('/bebidas');

    fireEvent.click(all);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 2));

    expect(store.getState().reducerBebidas.bebidas).toEqual(drinks.drinks);
    expect(history.location.pathname).toBe('/bebidas');
  });

  it('verifica redirecionamento caso ocorra apenas um resultado com comida', async () => {
    const { store, history } = renderWithRouterAndRedux(<Comidas />, '/comidas');
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

    fireEvent.change(searchInput, { target: { value: 'Arrabiata' } });
    expect(searchInput).toHaveValue('Arrabiata');
    fireEvent.click(searchBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerComidas.comidas).toEqual(oneMeal.meals);
    expect(history.location.pathname).toBe('/comidas/52771');
  });

  it('verifica redirecionamento caso ocorra apenas um resultado com bebida', async () => {
    const { store, history } = renderWithRouterAndRedux(<Bebidas />, '/bebidas');
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

    fireEvent.change(searchInput, { target: { value: 'Aquamarine' } });
    expect(searchInput).toHaveValue('Aquamarine');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(callsNumber + 1));

    expect(store.getState().reducerBebidas.bebidas).toEqual(oneDrink.drinks);
    expect(history.location.pathname).toBe('/bebidas/178319');
  });
});
