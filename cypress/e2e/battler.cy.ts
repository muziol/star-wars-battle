/// <reference types="cypress" />

const localhostUrl = 'http://localhost:4200/';
const getAPIUrl = (dataType: 'people' | 'starships') =>
  `https://www.swapi.tech/api/${dataType}?page=1&limit=10`;

describe('battler game', () => {
  beforeEach(() => {
    cy.visit(localhostUrl);
  });

  it('game area', () => {
    cy.get('.button-group button[start-game-button]').should(
      'have.text',
      'start',
    );
    cy.get('.button-group button[clear-score-button]').should(
      'have.text',
      'clear score',
    );
    const players = cy.get('div.battle').children();
    players.should('have.length', 2);
    players.each((p, index) => {
      cy.wrap(p)
        .find('.player p.indicator')
        .should('have.text', ` P${index + 1} | Score: 0 `);
      cy.wrap(p).find('.empty-card-msg span').should('have.text', 'Empty');
    });
  });

  describe('data type - people: ', () => {
    it('start game', () => {
      const startGameButton = cy.get('.button-group button[start-game-button]');
      startGameButton.should('have.text', 'start');
      startGameButton.click();

      cy.request(getAPIUrl('people')).then((r1) => {
        cy.request(getAPIUrl('people')).then((r2) => {
          cy.wait(3000);
          const players = cy.get('div.battle').children();
          players.should('have.length', 2);
          players.each((p, index) => {
            cy.wrap(p)
              .find('.player .mat-mdc-card-content')
              .should('be.visible');
          });
        });
      });
    });
  });

  describe('data type - starships: ', () => {
    it('start game', () => {
      cy.get('.radio-group').contains('starships').click();

      cy.wait(100);

      const startGameButton = cy.get('.button-group button[start-game-button]');
      startGameButton.should('have.text', 'start');
      startGameButton.click();

      cy.request(getAPIUrl('starships')).then((r1) => {
        cy.request(getAPIUrl('starships')).then((r2) => {
          cy.wait(3000);
          const players = cy.get('div.battle').children();
          players.should('have.length', 2);
          players.each((p, index) => {
            cy.wrap(p)
              .find('.player .mat-mdc-card-content')
              .should('be.visible');
          });
        });
      });
    });
  });
});
