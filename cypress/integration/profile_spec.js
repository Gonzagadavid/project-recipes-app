/// <reference types="cypress" />

describe('Profile screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/perfil', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', '{ "email": "email@mail.com" }');
        win.localStorage.setItem('mealsToken', '1');
        win.localStorage.setItem('cocktailsToken', '1');
        win.localStorage.setItem('doneRecipes', '[]');
        win.localStorage.setItem('favoriteRecipes', '[]');
        win.localStorage.setItem('inProgressRecipes', '{}');
      },
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('82 - Implemente os elementos da a tela de perfil respeitando os atributos descritos no protótipo', () => {
    it('Todos o data-testid do email e de todos os botões', () => {
      cy.get('[data-testid="profile-email"]');
      cy.get('[data-testid="profile-done-btn"]');
      cy.get('[data-testid="profile-favorite-btn"]');
      cy.get('[data-testid="profile-logout-btn"]');
    });
  });

  describe('83 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível', () => {
    it('O e-mail armazenado em localStorage está visível', () => {
      cy.get('[data-testid="profile-email"]').contains('email@mail.com');
    });
  });

  describe('84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair"', () => {
    it('A tela contêm todos os 3 botões', () => {
      cy.get('[data-testid="profile-done-btn"]').contains('Receitas Feitas');
      cy.get('[data-testid="profile-favorite-btn"]').contains('Receitas Favoritas');
      cy.get('[data-testid="profile-logout-btn"]').contains('Sair');
    });
  });

  describe('85 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas', () => {
    it('Redireciona para a rota correta', () => {
      cy.get('[data-testid="profile-done-btn"]').click();
      cy.location().should((loc) => expect(loc.pathname).to.eq('/receitas-feitas'));
    });
  });

  describe('86 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas', () => {
    it('Redireciona para a rota correta', () => {
      cy.get('[data-testid="profile-favorite-btn"]').click();
      cy.location().should((loc) => expect(loc.pathname).to.eq('/receitas-favoritas'));
    });
  });

  describe('87 - Redirecione a pessoa usuária que, ao clicar no botão de "Sair", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login', () => {
    it('Limpa todas as chaves da localStorage', () => {
      cy.window().then((win) => {
        expect(win.localStorage.getItem('user')).to.eq('{ "email": "email@mail.com" }');
        expect(win.localStorage.getItem('mealsToken')).to.eq('1');
        expect(win.localStorage.getItem('cocktailsToken')).to.eq('1');
        expect(win.localStorage.getItem('doneRecipes')).to.eq('[]');
        expect(win.localStorage.getItem('favoriteRecipes')).to.eq('[]');
        expect(win.localStorage.getItem('inProgressRecipes')).to.eq('{}');
      });

      cy.get('[data-testid="profile-logout-btn"]').click();

      cy.window().then((win) => {
        expect(win.localStorage.getItem('email')).to.be.null;
        expect(win.localStorage.getItem('mealsToken')).to.be.null;
        expect(win.localStorage.getItem('cocktailsToken')).to.be.null;
        expect(win.localStorage.getItem('doneRecipes')).to.be.null;
        expect(win.localStorage.getItem('favoriteRecipes')).to.be.null;
        expect(win.localStorage.getItem('inProgressRecipes')).to.be.null;
      });
    });

    it('A rota muda para a tela de login', () => {
      cy.get('[data-testid="profile-logout-btn"]').click();

      cy.location().should((loc) => expect(loc.pathname).to.eq('/'));
    });
  });
});
