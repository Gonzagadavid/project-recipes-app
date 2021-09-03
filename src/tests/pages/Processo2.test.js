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
const qtyIngredientesComidas = 8;
const qtyIngredientesBebidas = 3;
const FINHISH_BUTTON = 'finish-recipe-btn';

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

  it(`verifica se os ingredientes são renderizadas corretamente${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const ingredientesList = screen.getByRole('list');
    const ingredientes = screen.getAllByTestId(/ingredient-step/i);

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
    const ingredientes = screen.getAllByTestId(/ingredient-step/i);

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

  it(`Se o botão finalizar receita habiltia somente quando todos itens foram marcados${
    telaComidas}`, async () => {
    renderPathWithRedux(idComidas);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const finalizarBtn = screen.getByTestId(FINHISH_BUTTON);
    const ingredientes = screen.getAllByRole('checkbox');
    expect(finalizarBtn).toBeDisabled();
    expect(ingredientes[0]).not.toBeChecked();
    fireEvent.click(ingredientes[0]);
    expect(ingredientes[0]).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))
      .meals['52771'][0]).toBeTruthy();

    fireEvent.click(ingredientes[0]);
    expect(ingredientes[0]).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))
      .meals['52771'][0]).toBeFalsy();

    ingredientes.forEach((ingrediente) => { fireEvent.click(ingrediente); });
    expect(finalizarBtn).toBeEnabled();
    expect(ingredientes).toHaveLength(qtyIngredientesComidas);
  });

  it(`Se o botão finalizar receita habiltia somente quando todos itens foram marcados${
    telaBebidas}`, async () => {
    renderPathWithRedux(idBebidas);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const finalizarBtn = screen.getByTestId(FINHISH_BUTTON);
    const ingredientes = screen.getAllByRole('checkbox');
    expect(finalizarBtn).toBeDisabled();
    expect(ingredientes[0]).not.toBeChecked();
    fireEvent.click(ingredientes[0]);
    expect(ingredientes[0]).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))
      .cocktails['178319'][0]).toBeTruthy();

    fireEvent.click(ingredientes[0]);
    expect(ingredientes[0]).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))
      .cocktails['178319'][0]).toBeFalsy();

    ingredientes.forEach((ingrediente) => { fireEvent.click(ingrediente); });
    expect(finalizarBtn).toBeEnabled();
    expect(ingredientes).toHaveLength(qtyIngredientesBebidas);
  });
});
