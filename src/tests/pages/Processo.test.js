import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import * as copyBoard from 'clipboard-copy';
import fetchMock from '../mocks/fecthMock';
import { oneDrink, oneMeal } from '../mocks/respMoks';
import renderPathWithRedux from '../helpers/renderPathWithRedux';
import ClipBoardMock from '../mocks/clipBoardMock';
import { favoriteComida, favoriteDrink } from '../mocks/favorites';

const { meals: [{ strMealThumb, strMeal, strCategory }] } = oneMeal;
const { drinks: [{ strDrinkThumb, strDrink, strCategory: categoryDrink }] } = oneDrink;

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BUTTON = 'share-btn';
const FAVORITE_BUTTON = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';

const mockClipboard = new ClipBoardMock();

jest.mock('clipboard-copy');

copyBoard.mockImplementation((item) => mockClipboard.copy(item));

global.fetch = jest.fn(fetchMock);

const describeText = 'verifica a renderização e o funcionamento das Telas de detalhes';
const telaComidas = ' na tela de detalhes de comidas';
const telaBebidas = ' na tela de detalhes de bebidas';
const idComidas = '/comidas/52771/in-progress';
const idBebidas = '/bebidas/178319/in-progress';

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica se ao renderizar o store é preenchido corretamente${
    telaComidas}`, async () => {
    const { store } = renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerComidas.receita).toEqual(oneMeal.meals[0]);
  });

  it(`verifica se ao renderizar o store é preenchido corretamente${
    telaBebidas}`, async () => {
    const { store } = renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(store.getState().reducerBebidas.bebida).toEqual(oneDrink.drinks[0]);
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica  a renderização da imagem de receita${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const recipePhoto = screen.getByTestId(RECIPE_PHOTO);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.tagName).toBe('IMG');
    expect(recipePhoto).toHaveAttribute('src', strMealThumb);
  });

  it(`verifica  a renderização da imagem de receita${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const recipePhoto = screen.getByTestId(RECIPE_PHOTO);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.tagName).toBe('IMG');
    expect(recipePhoto).toHaveAttribute('src', strDrinkThumb);
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica  a renderização do nome e categoria da receita${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const recipeTitle = screen.getByTestId(RECIPE_TITLE);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY);

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    expect(recipeTitle).toHaveTextContent(strMeal);
    expect(recipeCategory).toHaveTextContent(strCategory);
  });

  it(`verifica  a renderização do nome e se é alcoólico de receita${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const recipeTitle = screen.getByTestId(RECIPE_TITLE);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY);

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    expect(recipeTitle).toHaveTextContent(strDrink);
    expect(recipeCategory).toHaveTextContent(categoryDrink);
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`Ao clicar no botão share a url é copiada para o clipboar exbindo a mensagem${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const shareButton = screen.getByTestId(SHARE_BUTTON);

    expect(shareButton).toBeInTheDocument();

    fireEvent.click(shareButton);

    await waitFor(() => expect(copyBoard).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Link copiado!')).toBeInTheDocument();

    expect(mockClipboard.paste()).toBe('http://localhost:3000/comidas/52771');
  });

  it(`Ao clicar no botão share a url é copiada para o clipboar exbindo a mensagem${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const shareButton = screen.getByTestId(SHARE_BUTTON);

    expect(shareButton).toBeInTheDocument();

    fireEvent.click(shareButton);

    await waitFor(() => expect(copyBoard).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Link copiado!')).toBeInTheDocument();

    expect(mockClipboard.paste()).toBe('http://localhost:3000/bebidas/178319');
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`Ao clicar no botão favoritar os dados da recita são salvos no localStore${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON);

    expect(favoriteButton).toBeInTheDocument();

    fireEvent.click(favoriteButton);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0])
      .toEqual(favoriteComida);

    localStorage.clear();
  });

  it(`Ao clicar no botão favoritar os dados da recita são salvos no localStore${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const favoriteButton = screen.getByTestId(FAVORITE_BUTTON);

    expect(favoriteButton).toBeInTheDocument();

    fireEvent.click(favoriteButton);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0])
      .toEqual(favoriteDrink);

    localStorage.clear();
  });
});
