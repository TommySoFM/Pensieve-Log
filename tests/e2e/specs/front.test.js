const website = 'http://localhost:8080/'
const loginUrl = website + 'login'
const signupUrl = website + 'signup'
const homeUrl = website + 'post/1'

module.exports = {
  'Front page - Test for Redirection:': browser => {
    const titleSelector = 'h3[data-e2e=title]'
    const loginButton = 'h3[data-e2e=login-button]'
    const signupButton = 'h3[data-e2e=signup-button]'
    const navIndication = '.nav-indication'
    const pageRedirect = '.page-redir'
    browser
      .url(website)
      .waitForElementVisible(titleSelector)
      .assert.containsText(titleSelector, 'Pensieve Log')
      .waitForElementVisible(loginButton)
      .click(loginButton)
      .assert.urlEquals(loginUrl)
      .waitForElementVisible(pageRedirect)
      .assert.containsText(pageRedirect, 'Click Here!')
      .click(navIndication)
      .assert.urlEquals(website)
      .waitForElementVisible(signupButton)
      .click(signupButton)
      .assert.urlEquals(signupUrl)
      .waitForElementVisible(pageRedirect)
      .assert.containsText(pageRedirect, 'Here to Login!')
      .click(pageRedirect)
      .waitForElementVisible(navIndication)
      .assert.containsText(navIndication, 'Login')
      .click(pageRedirect)
      .waitForElementVisible(navIndication)
      .assert.containsText(navIndication, 'Sign-up')
      .click(navIndication)
      .assert.urlEquals(website)
      .end()
  },
  'Front page - Test to Login then Back:': browser => {
    const formLogin = '.form-login'
    const failureNotice = '.notice-error-title'
    const usernameField = 'input[name="username"]'
    const username = 'banaji'
    const passwordField = 'input[name="password"]'
    const password = 'links'
    const submitButton = '.button-confirm'
    browser
      .url(loginUrl)
      .waitForElementVisible(formLogin)
      .click(submitButton)
      .waitForElementVisible(failureNotice)
      .setValue(usernameField, username)
      .setValue(passwordField, password)
      .click(submitButton)
      .assert.urlEquals(homeUrl)
      .back()
      .pause(1000)
      .acceptAlert()
      .assert.urlEquals(homeUrl)
      .end()
  },
  'Front page - Signup with wrong Username format': browser => {
    const formSignup = '.form-signup'
    const usernameField = 'input[data-e2e=signup-username]'
    const usernameFeedbackInvalid = 'div[data-e2e=username-invalid]'
    const usernameFeedbackUsed = 'div[data-e2e=username-used]'
    const submitButton = '.button-confirm'
    const usernameShort = 'tommy'
    const usernameUsed = 'banaji'
    browser
      .url(signupUrl)
      .waitForElementVisible(formSignup)
      .setValue(usernameField, usernameUsed)
      .pause(300)
      .assert.containsText(usernameFeedbackUsed, 'Username is Used!')
      .clearValue(usernameField)
      .setValue(usernameField, usernameShort)
      .click(submitButton)
      .assert.containsText(usernameFeedbackInvalid, 'Invalid Username!')
      .end()
  },
  'Front page - Signup with wrong Password format': browser => {
    const formSignup = '.form-signup'
    const passwordField = 'div[data-e2e=signup-field]'
    const passwordInput = 'input[data-e2e=signup-password]'
    const passwordFeedback = 'div[data-e2e=signup-field] .invalid-feedback'
    const submitButton = '.button-confirm'
    const passwordShort = 'pass'
    const passwordNoUppercase = 'password'
    const passwordNoLowercase = 'PASSWORD'
    const passwordWithSpace = 'PASS WORD'
    const passwordValid = 'Password'
    browser
      .url(signupUrl)
      .waitForElementVisible(formSignup)
      .setValue(passwordInput, passwordShort)
      .click(submitButton)
      .assert.containsText(passwordFeedback, 'Length Should Be in 8-25 Units')
      .clearValue(passwordInput)
      .setValue(passwordInput, passwordNoLowercase)
      .click(submitButton)
      .assert.containsText(passwordFeedback, 'At least 1 Lower-cased character')
      .clearValue(passwordInput)
      .setValue(passwordInput, passwordNoUppercase)
      .click(submitButton)
      .assert.containsText(passwordFeedback, 'At least 1 Upper-cased character')
      .clearValue(passwordInput)
      .setValue(passwordInput, passwordWithSpace)
      .click(submitButton)
      .assert.containsText(passwordFeedback, 'No Space Allowed')
      .clearValue(passwordInput)
      .setValue(passwordInput, passwordValid)
      .click(submitButton)
      .assert.not.cssClassPresent(passwordField, '.invalid-feedback')
      .end()
  },
  'Test entering main page without valid session': browser => {
    browser
      .url(homeUrl)
      .pause(300)
      .acceptAlert()
      .assert.urlEquals(website)
      .end()
  }
}
