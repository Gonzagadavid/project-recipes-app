/// <reference types="cypress" />

describe('67 - Implemente os elementos da tela de explorar respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids explore-food e explore-drinks', () => {
    cy.visit('http://localhost:3000/explorar');

    cy.get('[data-testid="explore-food"]');
    cy.get('[data-testid="explore-drinks"]');
  });
});

describe('68 - Desenvolva a tela de maneira que tenha 2 botões: um para explorar comidas e o outro para explorar bebidas', () => {
  it('O nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas"', () => {
    cy.visit('http://localhost:3000/explorar');

    cy.get('[data-testid="explore-food"]').contains('Explorar Comidas');
    cy.get('[data-testid="explore-drinks"]').contains('Explorar Bebidas');
  });
});


describe('69 - Redirecione a pessoa usuária ao clicar em um dos botões, a rota deve mudar para a página de explorar comidas ou de explorar bebidas', () => {
  it('Os nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas"', () => {
    cy.visit('http://localhost:3000/explorar');

    cy.get('[data-testid="explore-food"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar/comidas'));
  });

  it('Os nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas"', () => {
    cy.visit('http://localhost:3000/explorar');

    cy.get('[data-testid="explore-drinks"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar/bebidas'));
  });
});
