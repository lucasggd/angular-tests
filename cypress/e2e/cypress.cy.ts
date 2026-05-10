describe('Description', () => {
  it('Test', () => {
    cy.visit('https://docs.cypress.io/');

    cy.get('.osano-cm-button--type_accept').click();

    cy.get('a').contains('Install Cypress').click();
  });
});
