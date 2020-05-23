/* eslint-disable no-undef */
describe('ログイン', () => {
  it('ログインして、Homeページに遷移する', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
    cy.get('input[name="email"]')
      .type('usera@email.com')
      .should('have.value', 'usera@email.com')
    cy.get('input[name="password"]').type('a').should('have.value', 'a')
    cy.get('button[name="submit"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/')
  })
  it('ログインに失敗し、エラーメッセージが表示される', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
    cy.get('input[name="email"]')
      .type('unauthorized_user@email.com')
      .should('have.value', 'unauthorized_user@email.com')
    cy.get('input[name="password"]').type('a').should('have.value', 'a')
    cy.get('button[name="submit"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/login')
    cy.get('.MuiFormHelperText-root').each(($el) => {
      expect($el.text()).equal('メールアドレスまたはパスワードが不正です。')
    })
  })
})
