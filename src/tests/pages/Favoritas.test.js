import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import ReceitasFavoritas from '../../pages/Favoritas/ReceitasFavoritas';
import setLocalStorage from '../../services/localStorage/setLocalStorage';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { favoriteRecipesMock, favoriteBebida, favoriteComida }
  from '../mocks/favoriteRecipesMock';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import getLocalStorage from '../../services/localStorage/getLocalStorage';

setLocalStorage('favoriteRecipes', favoriteRecipesMock);

describe('verifica a renderização de o funcionamento de ReceitasFavoritas', () => {
  it('verifica se as receitas são rederizadas corretamente', () => {
    renderWithRouterAndRedux(<ReceitasFavoritas />);

    favoriteRecipesMock.forEach(({
      area, alcoholicOrNot, category, image, name, type,
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
    });
  });

  it('ao clicar drink, apresenta apenas receitas feitas de bebidas', () => {
    renderWithRouterAndRedux(<ReceitasFavoritas />);

    const { category, image, name } = favoriteBebida;

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
  });

  it('ao clicar drink, apresenta apenas receitas feitas de comidas', () => {
    renderWithRouterAndRedux(<ReceitasFavoritas />);

    const { category, image, name } = favoriteComida;

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
  });

  it('verifica a renderização e funcionamento do icon favorito', async () => {
    renderWithRouterAndRedux(<ReceitasFavoritas />);

    const comidaButton = screen.getByTestId('filter-by-food-btn');
    fireEvent.click(comidaButton);

    const favoriteIcon = screen.getByTestId(/horizontal-favorite-btn/i);

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.parentElement.tagName).toBe('BUTTON');
    expect(favoriteIcon.tagName).toBe('IMG');
    expect(favoriteIcon).toHaveAttribute('src', blackHeartIcon);

    expect(getLocalStorage('favoriteRecipes')[0].id).toBe(favoriteComida.id);

    fireEvent.click(favoriteIcon);

    expect(getLocalStorage('favoriteRecipes')[0].id).not.toBe(favoriteComida.id);
  });
});
