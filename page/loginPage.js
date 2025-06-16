const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators.js");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id(locators.login.username);
    this.passwordField = By.id(locators.login.password);
    this.loginButton = By.id(locators.login.buttonLogin);
    this.errorMessage = By.css(locators.message.errorBoxAllert);
  }

  async inputUsername(username, timeout = 5000) {
    const getUsernameField = await this.driver.wait(
      until.elementLocated(this.usernameField),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(getUsernameField), timeout);
    await getUsernameField.sendKeys(username);
  }

  async inputPassword(password, timeout = 5000) {
    const getPasswordField = await this.driver.wait(
      until.elementLocated(this.passwordField),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(getPasswordField), timeout);
    await getPasswordField.sendKeys(password);
  }

  async clickLoginButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.loginButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }

  async loginWithEmptyPassword(username) {
    await this.inputUsername(username);
    await this.clickLoginButton();
  }

  async loginWithEmptyUsername(password) {
    await this.inputPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessageText(timeout = 5000) {
    const errorElement = await this.driver.wait(
      until.elementLocated(this.errorMessage),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(errorElement), timeout);
    return await errorElement.getText();
  }
}

module.exports = LoginPage;
