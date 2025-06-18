const { By, until } = require("selenium-webdriver");
const { locators } = require("../../resources/locators");

class AlertComponent {
  constructor(driver) {
    this.driver = driver;
    this.message = By.css(locators.message.errorBoxAllert);
  }

  async getErrorMessageText(timeout = 5000) {
    const errorElement = await this.driver.wait(
      until.elementLocated(this.message),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(errorElement), timeout);
    return await errorElement.getText();
  }
}

module.exports = AlertComponent;
