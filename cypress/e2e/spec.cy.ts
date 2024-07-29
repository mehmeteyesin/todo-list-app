describe('To-Do List App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should render the initial UI correctly', () => {
    cy.contains('h1', 'To-Do List').should('be.visible');
    cy.get('input[placeholder="Enter new to-do (max 50 characters)"]').should('be.visible');
    cy.contains('button', 'Add').should('be.visible');
  });

  it('should add a new todo item', () => {
    cy.get('input[placeholder="Enter new to-do (max 50 characters)"]').type('My First Todo Item');
    cy.get('button').contains('Add').click();
    cy.contains('td', 'My First Todo Item').should('be.visible');
  });

  it('should show an error message when adding more than 10 items', () => {
    for (let i = 0; i < 10; i++) {
      cy.get('input[placeholder="Enter new to-do (max 50 characters)"]').type(`Test Todo ${i + 1}`);
      cy.get('button').contains('Add').click();
    }

    cy.get('input[placeholder="Enter new to-do (max 50 characters)"]').type('Test Todo 11');
    cy.get('button').contains('Add').click();
    cy.contains('You can only have a maximum of 10 items in the to-do list.').should('be.visible');
  });

  it('should not allow adding a todo item with more than 50 characters', () => {
    const longText = 'a'.repeat(51);
    cy.get('input[placeholder="Enter new to-do (max 50 characters)"]').type(longText);
    cy.get('button').contains('Add').click();
    cy.contains('td', longText).should('not.exist');
  });

});