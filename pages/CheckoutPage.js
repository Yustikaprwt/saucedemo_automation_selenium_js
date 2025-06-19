const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.firstNameField = By.id(locators.inputField.firstName);
    this.lastNameField = By.id(locators.inputField.lastName);
    this.postalCodeField = By.id(locators.inputField.postalCode);
    this.continueButton = By.id(locators.button.continueCheckout);
    this.cancelButton = By.id(locators.button.cancelCheckout);
    this.finishButton = By.id(locators.button.finishPaymentButton);
    this.completeOrderText = By.css(locators.message.completeOrder);
  }

  async inputFirstName(firstName, timeout = 5000) {
    const inputField = await this.driver.wait(
      until.elementLocated(this.firstNameField),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(inputField), timeout);
    await inputField.sendKeys(firstName);
  }

  async inputLastName(lastName, timeout = 5000) {
    const inputField = await this.driver.wait(
      until.elementLocated(this.lastNameField),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(inputField), timeout);
    await inputField.sendKeys(lastName);
  }

  async inputPostalCode(postalCode, timeout = 5000) {
    const inputField = await this.driver.wait(
      until.elementLocated(this.postalCodeField),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(inputField), timeout);
    await inputField.sendKeys(postalCode);
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.inputFirstName(firstName);
    await this.inputLastName(lastName);
    await this.inputPostalCode(postalCode);
  }

  async checkoutWithEmptyFirstName(lastName, postalCode) {
    await this.inputLastName(lastName);
    await this.inputPostalCode(postalCode);
  }

  async checkoutWithEmptyLastName(firstName, postalCode) {
    await this.inputFirstName(firstName);
    await this.inputPostalCode(postalCode);
  }

  async checkoutWithEmptyPostalCode(firstName, lastName) {
    await this.inputFirstName(firstName);
    await this.inputLastName(lastName);
  }

  async clickContinueCheckout(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.continueButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickCancelCheckout(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.cancelButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickFinishPayment(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.finishButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async getCompleteOrderMessage(timeout = 5000) {
    const message = await this.driver.wait(
      until.elementLocated(this.completeOrderText),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(message), timeout);
    return await message.getText();
  }
}

module.exports = CheckoutPage;
