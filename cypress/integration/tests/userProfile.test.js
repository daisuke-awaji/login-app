/* eslint-disable no-undef */
describe('ログイン', () => {
  it('ユーザプロフィール画面にて、ユーザ情報が更新できる', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
    cy.get('input[name="email"]')
      .type('usera@email.com')
      .should('have.value', 'usera@email.com')
    cy.get('input[name="password"]').type('a').should('have.value', 'a')
    cy.get('button[name="submit"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/')

    cy.get('button[data-test="profileButton"]').click()
    cy.url().should('contain', '/users')
    cy.contains('usera@email.com')
    cy.get('button[data-test="profileEditButton"]').click()

    cy.get('input[name="name"]').should('have.value', 'janedoe_')
    cy.get('input[name="email"]').should('have.value', 'usera@email.com')
    cy.get('textarea[name="description"]').should('have.value', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit📷✈️🏕️')

    cy.get('input[name="email"]').focus().clear().type('NEWUSER@email.com')

    cy.get('button[data-test="profileSaveButton"]').click()
    cy.contains('NEWUSER@email.com')
  })
})
