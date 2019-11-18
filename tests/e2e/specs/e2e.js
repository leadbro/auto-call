describe('Project setup page', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Автообзвон')
  })
})
