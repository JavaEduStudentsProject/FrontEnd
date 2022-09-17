describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('filter works', () => {
    cy.visit('http://localhost:3000')
    // cy.findByRole('button', {name: /каталог/i}).click();
    // cy.get('.dropbtn').click();

    // cy.get('.dropdown-content > :nth-child(2)').click({force: true});
    cy.get('.dropdown-content > :nth-child(2)').click();
    cy.get(':nth-child(5) > :nth-child(3) > .row').check();
    cy.findByRole('button', {name: /найти/i}).click();
    expect(cy.findAllByText(/iPhone/i)).to.exist;
    cy.findAllByText(/iPhone/i).its('length').should('eq', 2);
  })
})