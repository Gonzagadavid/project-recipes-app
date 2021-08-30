import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from '../../components';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';

const DRINK_BTN = 'drinks-bottom-btn';
const MEAL_BTN = 'food-bottom-btn';
const EXPLORE_BTN = 'explore-bottom-btn';
const FOOTER = 'footer';

describe('verifica a renderização e o funcionamento do componente Footer', () => {
  it('verifica se todos os elementos são renderizados corretamente', () => {
    renderWithRouterAndRedux(<Footer />);

    const drinkBtn = screen.getByTestId(DRINK_BTN);
    const mealBtn = screen.getByTestId(MEAL_BTN);
    const exploreBtn = screen.getByTestId(EXPLORE_BTN);
    const footer = screen.getByTestId(FOOTER);

    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  it('verifica se os icones do elementos estão corretos', () => {
    renderWithRouterAndRedux(<Footer />);

    const drinkBtn = screen.getByTestId(DRINK_BTN);
    const mealBtn = screen.getByTestId(MEAL_BTN);
    const exploreBtn = screen.getByTestId(EXPLORE_BTN);

    expect(drinkBtn.tagName).toBe('IMG');
    expect(drinkBtn).toHaveAttribute('src', drinkIcon);

    expect(mealBtn.tagName).toBe('IMG');
    expect(mealBtn).toHaveAttribute('src', mealIcon);

    expect(exploreBtn.tagName).toBe('IMG');
    expect(exploreBtn).toHaveAttribute('src', exploreIcon);
  });

  it('Ao clicar no icone de comida a pagina é redirecionada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);

    const mealBtn = screen.getByTestId(MEAL_BTN);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(mealBtn);

    expect(history.location.pathname).toBe('/comidas');
  });

  it('Ao clicar no icone de bebida a pagina é redirecionada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);

    const drinkBtn = screen.getByTestId(DRINK_BTN);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(drinkBtn);

    expect(history.location.pathname).toBe('/bebidas');
  });

  it('Ao clicar no icone de explorar a pagina é redirecionada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);

    const exploreBtn = screen.getByTestId(EXPLORE_BTN);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(exploreBtn);

    expect(history.location.pathname).toBe('/explorar');
  });
});
