/// <reference types="Cypress" />

const loginPage = require("../../support/login/login.Page")

describe('Validação das ações na tela de login', () => {
  before(() => {
    cy.limparBanco()
    cy.visit('https://backoffice-test.kuru.com.br/')
  })
  afterEach(() => {
    cy.reload()
  })

  it('Devo validar mensagem de obrigatóriedade quando "Ambos campos estão vazios"', () => {
    loginPage.escreverUsuario('test-rsi@rsitecnologia.com.br')
    loginPage.limparCampoUsuario()
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemCamposVazios()
  })

  //a mensagem senha vazia só aparece quando é preenchido o campo uma vez, e depois limpando
  it('Devo validar mensagem de obrigatóriedade quando o "Campo senha está vazio"', () => {
    loginPage.escreverUsuario('test-user-rsi@rsitecnologia.com.br')
    loginPage.escreverSenha('12345')
    loginPage.limparCampoSenha()
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemCampoSenhaVazio()
  })

  it('Devo validar mensagem de obrigatóriedade quando o "Campo usuário não está preenchido"', () => {
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemUsuarioObrigatorio()
  })

  it('Devo validar mensagem de obrigatóriedade quando o "Campo senha não está preenchido"', () => {
    loginPage.escreverUsuario('test-user-rsi@rsitecnologia.com.br')
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemSenhaObrigatoria()
  })



  it('Devo validar mensagem de obrigatóriedade quando "Usuário deve ser um e-mail válido"', () => {
    loginPage.escreverUsuario('emailinvalido')
    loginPage.escreverSenha('123456')
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemUsuarioDeveSerEmailValido()
  })

  it('Devo validar mensagem de obrigatóriedade quando o "Senha ou Usuário inválido"', () => {
    loginPage.escreverUsuario('test-rsi@rsitecnologia.com.br')
    loginPage.escreverSenha('123456')
    loginPage.clicarNoBotaoLogin()
    loginPage.mensagemSenhaOuUsuarioInvalido()
  })

})
//para logar é preciso cadastrar empresa
describe('Validação das ações na tela de login em conjunto a tela Inicial', () => {
  before(() => {
    cy.visit('https://backoffice-test.kuru.com.br/')
    cy.prepararTeste(true)
  })
  it('Devo validar mensagem de "login realizado com sucesso"', () => {
    loginPage.escreverUsuario('test-user-rsi@rsitecnologia.com.br')
    loginPage.escreverSenha('123456')
    loginPage.clicarNoBotaoLogin()
    loginPage.estaNoModalDeSelecionarEmpresa()
    loginPage.selecionarEmpresa('CHEFF KURU')
    loginPage.exibiTelaInicial()
  })
  afterEach(() => {
    cy.deslogar()
  })

})






