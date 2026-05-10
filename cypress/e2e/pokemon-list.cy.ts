describe('template spec', () => {
  it('teste input', () => {
    cy.intercept('GET', '**/v2/pokemon/*').as('pokemon');

    cy.visit('http://localhost:4200');

    cy.get('input').click().type('gengar');

    cy.get('button').click();

    cy.wait('@pokemon');

    expect(cy.get('ul').contains('Gengar'));
  });

  it('test select', () => {
    cy.intercept('GET', '**/v2/pokemon').as('pokemon');

    cy.visit('http://localhost:4200');

    cy.wait('@pokemon');

    cy.get('body').click();

    cy.get('mat-select').should('be.visible').click();

    cy.get('mat-option').should('be.visible').contains('bulbasaur').click();

    cy.get('.mat-mdc-select-trigger').should('be.visible').click();

    cy.get('mat-option > span').should('be.visible').contains('charmander').click();
  });
});
