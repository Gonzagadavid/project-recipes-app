import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import ReceitasFeitas from '../../pages/Feitas/ReceitasFeitas';
import setLocalStorage from '../../services/localStorage/setLocalStorage';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { doneRecipesMock, doneBebida, doneComida } from '../mocks/doneRecipesMock';

setLocalStorage('doneRecipes', doneRecipesMock);

describe('verifica a renderização de o funcionamento de ReceitasFeitas', () => {
  const checkTags = (tags) => {
    tags.forEach((tag) => {
      const recipesTags = screen.getByTestId(`0-${tag}-horizontal-tag`);
      expect(recipesTags).toBeInTheDocument();
      expect(recipesTags).toHaveTextContent(tag);
    });
  };

  it('verifica se as receitas são rederizadas corretamente', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);

    doneRecipesMock.forEach(({
      area, alcoholicOrNot, category, doneDate, image, name, tags, type,
    }, index) => {
      const expectText = type === 'comida' ? `${area} - ${category}` : alcoholicOrNot;

      const recipeImage = screen.getByTestId(`${index}-horizontal-image`);
      expect(recipeImage).toBeInTheDocument();
      expect(recipeImage.tagName).toBe('IMG');
      expect(recipeImage).toHaveAttribute('src', image);

      const recipeTexts = screen.getAllByTestId(`${index}-horizontal-top-text`);
      expect(recipeTexts[0]).toBeInTheDocument();
      expect(recipeTexts[0]).toHaveTextContent(expectText);

      expect(recipeTexts[1]).toBeInTheDocument();
      expect(recipeTexts[1]).toHaveTextContent(category);

      const recipeName = screen.getByTestId(`${index}-horizontal-name`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(name);

      const recipeDoneDate = screen.getByTestId(`${index}-horizontal-done-date`);
      expect(recipeDoneDate).toBeInTheDocument();
      expect(recipeDoneDate).toHaveTextContent(doneDate);

      tags.forEach((tag) => {
        const recipesTags = screen.getByTestId(`${index}-${tag}-horizontal-tag`);
        expect(recipesTags).toBeInTheDocument();
        expect(recipesTags).toHaveTextContent(tag);
      });
    });
  });

  it('ao clicar drink, apresenta apenas receitas feitas de bebidas', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);

    const { category, doneDate, image, name, tags } = doneBebida;

    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(drinkButton);

    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);

    const recipeImage = screen.getByTestId('0-horizontal-image');
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage.tagName).toBe('IMG');
    expect(recipeImage).toHaveAttribute('src', image);

    const recipeTexts = screen.getAllByTestId('0-horizontal-top-text');
    expect(recipeTexts[0]).toBeInTheDocument();

    expect(recipeTexts[1]).toBeInTheDocument();
    expect(recipeTexts[1]).toHaveTextContent(category);

    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent(name);

    const recipeDoneDate = screen.getByTestId('0-horizontal-done-date');
    expect(recipeDoneDate).toBeInTheDocument();
    expect(recipeDoneDate).toHaveTextContent(doneDate);

    checkTags(tags);
  });

  it('ao clicar drink, apresenta apenas receitas feitas de comidas', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);

    const { category, doneDate, image, name, tags } = doneComida;

    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);

    const comidaButton = screen.getByTestId('filter-by-food-btn');
    fireEvent.click(comidaButton);

    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);

    const recipeImage = screen.getByTestId('0-horizontal-image');
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage.tagName).toBe('IMG');
    expect(recipeImage).toHaveAttribute('src', image);

    const recipeTexts = screen.getAllByTestId('0-horizontal-top-text');
    expect(recipeTexts[0]).toBeInTheDocument();

    expect(recipeTexts[1]).toBeInTheDocument();
    expect(recipeTexts[1]).toHaveTextContent(category);

    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent(name);

    const recipeDoneDate = screen.getByTestId('0-horizontal-done-date');
    expect(recipeDoneDate).toBeInTheDocument();
    expect(recipeDoneDate).toHaveTextContent(doneDate);

    checkTags(tags);
  });
});
