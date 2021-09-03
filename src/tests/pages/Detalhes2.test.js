import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import fetchMock from '../mocks/fecthMock';
import { oneDrink, oneMeal } from '../mocks/respMoks';
import renderPathWithRedux from '../helpers/renderPathWithRedux';
import {
  bebidaIngredientes, bebidaMedidas, comidaIngredientes, comidaMedidas,
} from '../data/ingredientes';

const { meals: [{ strInstructions: mealInstructions }] } = oneMeal;
const { drinks: [{ strInstructions: drinkInstructions }] } = oneDrink;

const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';
const qtyIngredientesComidas = 8;
const qtyIngredientesBebidas = 3;
const START_BUTTON = 'start-recipe-btn';
const inProgressDrink = JSON.stringify({ cocktails: { 178319: [] } });
const inProgressMeal = JSON.stringify({ meals: { 52771: [] } });

global.fetch = jest.fn(fetchMock);

const describeText = 'verifica a renderização e o funcionamento das Telas de detalhes';
const telaComidas = ' na tela de detalhes de comidas';
const telaBebidas = ' na tela de detalhes de bebidas';
const idComidas = '/comidas/52771';
const idBebidas = '/bebidas/178319';

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica se as intruções são renderizadas corretamente${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const instrucoes = screen.getByTestId(INSTRUCTIONS);

    expect(instrucoes).toBeInTheDocument();
    expect(instrucoes.tagName).toBe('P');
    expect(instrucoes.textContent).toBe(mealInstructions);
  });

  it(`verifica se as intruções são renderizadas corretamente${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const instrucoes = screen.getByTestId(INSTRUCTIONS);

    expect(instrucoes).toBeInTheDocument();
    expect(instrucoes.tagName).toBe('P');
    expect(instrucoes.textContent).toBe(drinkInstructions);
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica se o video embedado é renderizadas corretamente na pagina de comidas${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const video = screen.getByTestId(VIDEO);

    expect(video).toBeInTheDocument();
    expect(video.tagName).toBe('IFRAME');
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica se os ingredientes são renderizadas corretamente${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const ingredientesList = screen.getByRole('list');
    const ingredientes = screen.getAllByTestId(/ingredient-name-and-measure/i);

    ingredientes.forEach((ingrediente, index) => {
      expect(ingrediente.tagName).toBe('LI');

      expect(ingrediente.textContent)
        .toBe(`${comidaIngredientes[index]} ${comidaMedidas[index] || ''}`);
    });

    expect(ingredientes).toHaveLength(qtyIngredientesComidas);

    expect(ingredientesList).toBeInTheDocument();
  });

  it(`verifica se os ingredientes são renderizadas corretamente${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const ingredientesList = screen.getByRole('list');
    const ingredientes = screen.getAllByTestId(/ingredient-name-and-measure/i);

    ingredientes.forEach((ingrediente, index) => {
      expect(ingrediente.tagName).toBe('LI');

      expect(ingrediente.textContent)
        .toBe(`${bebidaIngredientes[index]} ${bebidaMedidas[index] || ''}`);
    });

    expect(ingredientes).toHaveLength(qtyIngredientesBebidas);

    expect(ingredientesList).toBeInTheDocument();
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica o funcionamento do botão iniciar receita${
    telaComidas}`, async () => {
    const { history } = renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.getByTestId(START_BUTTON);

    expect(iniciarButton).toBeInTheDocument();
    expect(iniciarButton).toHaveTextContent('Iniciar Receita');

    fireEvent.click(iniciarButton);

    expect(history.location.pathname).toBe('/comidas/52771/in-progress');
  });

  it(`verifica o funcionamento do botão iniciar receita${
    telaBebidas}`, async () => {
    const { history } = renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.getByTestId(START_BUTTON);

    expect(iniciarButton).toBeInTheDocument();
    expect(iniciarButton).toHaveTextContent('Iniciar Receita');

    fireEvent.click(iniciarButton);

    expect(history.location.pathname).toBe('/bebidas/178319/in-progress');
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica o funcionamento do botão continuar receita${
    telaComidas}`, async () => {
    localStorage.setItem('inProgressRecipes', inProgressMeal);
    const { history } = renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.getByTestId(START_BUTTON);

    expect(iniciarButton).toBeInTheDocument();
    expect(iniciarButton).toHaveTextContent('Continuar Receita');

    fireEvent.click(iniciarButton);

    expect(history.location.pathname).toBe('/comidas/52771/in-progress');

    localStorage.clear();
  });

  it(`verifica o funcionamento do botão continuar receita${
    telaBebidas}`, async () => {
    localStorage.setItem('inProgressRecipes', inProgressDrink);

    const { history } = renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.getByTestId(START_BUTTON);

    expect(iniciarButton).toBeInTheDocument();
    expect(iniciarButton).toHaveTextContent('Continuar Receita');

    fireEvent.click(iniciarButton);

    expect(history.location.pathname).toBe('/bebidas/178319/in-progress');

    localStorage.clear();
  });
});

describe(describeText, () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it(`verifica o funcionamento do botão continuar receita${
    telaComidas}`, async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52771' }]));

    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.queryByTestId(START_BUTTON);

    expect(iniciarButton).not.toBeInTheDocument();
  });

  it(`verifica o funcionamento do botão continuar receita${
    telaBebidas}`, async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '178319' }]));

    renderPathWithRedux(idBebidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const iniciarButton = screen.queryByTestId(START_BUTTON);

    expect(iniciarButton).not.toBeInTheDocument();

    localStorage.clear();
  });
});
