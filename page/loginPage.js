const { By } = require("selenium-webdriver");
const { locators } = require("../resources/locators.js");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id(locators.login.username);
    this.passwordField = By.id(locators.login.password);
    this.loginButton = By.id(locators.login.buttonLogin);
  }

  async inputUsername(username) {
    await this.driver.findElement(this.usernameField).sendKeys(username);
  }

  async inputPassword(password) {
    await this.driver.findElement(this.passwordField).sendKeys(password);
  }

  async clickLoginButton() {
    await this.driver.findElement(this.loginButton).click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;
