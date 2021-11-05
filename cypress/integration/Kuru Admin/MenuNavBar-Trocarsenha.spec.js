/// <reference types="Cypress" />
describe('Cadastrar e depois  logar em empresa', () => {
  beforeEach(() => {
    cy.prepararTeste(true)
  })


  it('Devo validar a mensagem de alerta quando o campo senha atual não está preenchidos', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 5000 }).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(1) > :nth-child(1)').click()
    cy.get('.modal-title', { timeout: 3000 }).should('be.visible').contains('Trocar Senha')
    cy.get('.btn-outline-dark').click()
    cy.get('.toast-message').contains('"Senha Atual" é obrigatório')


  })


  it('Devo validar a mensagem de alerta quando o campo senha atual está vazio "campos preenchidos e apagados"', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 5000 }).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(1) > :nth-child(1)').click()
    cy.get('.modal-title', { timeout: 3000 }).should('be.visible').contains('Trocar Senha')
    cy.get('#txtCurrentPassword').type('1234567').clear()
    cy.get('.btn-outline-dark').click()
    cy.get('#toast-container div').contains('"Senha Atual" não pode estar vazio')

  })

  it('Devo validar a mensagem de alerta quando os campos estão preenchidos incorretamente', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 10000 }).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(1) > :nth-child(1)').click()
    cy.get('.modal-title', { timeout: 10000 }).should('be.visible').contains('Trocar Senha')
    cy.get('#txtCurrentPassword').type('1234')
    cy.get('#txtNewPassword').type('12347')
    cy.get('#txtConfirmNewPassword').type('1234567')
    cy.get('.btn-outline-dark').click()
    cy.get('#toast-container div').contains('A senha e a confirmação de senha são diferentes')
  })

  it('Devo conseguir realizar a troca de senha no menu Trocar Senha navbar(1) quando os campos estão preenchidos corretamente', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 10000}).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(1) > :nth-child(1)').click()
    cy.get('.modal-title', { timeout: 10000 }).should('be.visible').contains('Trocar Senha')
    cy.get('#txtCurrentPassword').type('123456')
    cy.get('#txtNewPassword').type('1234567')
    cy.get('#txtConfirmNewPassword').type('1234567')
    cy.get('.btn-outline-dark').click()
    cy.get('#toast-container div').contains('Senha alterada com sucesso')
  })

  it('Devo conseguir realizar o cancelamento da troca de senha quando os campos estão preenchidos corretamente', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 10000 }).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(1) > :nth-child(1)').click()
    cy.get('.modal-title', { timeout: 10000 }).should('be.visible').contains('Trocar Senha')
    cy.get('#txtCurrentPassword').type('123456')
    cy.get('#txtNewPassword').type('1234567')
    cy.get('#txtConfirmNewPassword').type('123456')
    cy.get('.btn-fill').click()
    cy.get('.navbar-brand').contains('Início')
  })


})

