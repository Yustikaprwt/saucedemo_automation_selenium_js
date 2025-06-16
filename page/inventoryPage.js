const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.inventoryHeader = By.css(locators.title.inventoryTitle);
    this.addBackpackButton = By.id(locators.products.addBackpackButton);
    this.removeProductButton = By.id(locators.products.removeBackpackButton);
    this.addTshirtButton = By.id(locators.products.addTshirtButton);
  }

  async getInventoryTitle(timeout = 5000) {
    const headerText = await this.driver.wait(
      until.elementLocated(this.inventoryHeader),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(headerText), timeout);
    return await headerText.getText();
  }

  async clickTshirtButton(timeout = 5000) {
    const addProductButton = await this.driver.wait(
      until.elementLocated(this.addTshirtButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(addProductButton), timeout);
    await addProductButton.click();
  }

  async doubleClickBackpackButton(timeout = 5000) {
    const actions = this.driver.actions({ async: true });
    const addProductButton = await this.driver.wait(
      until.elementLocated(this.addBackpackButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(addProductButton), timeout);
    await actions.doubleClick(addProductButton).perform();
  }

  async getAddToCartText(timeout = 5000) {
    const addToCart = await this.driver.wait(
      until.elementLocated(this.addTshirtButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(addToCart), 5000);
    return await addToCart.getText();
  }

  async getRemoveButtonText(timeout = 5000) {
    const remove = await this.driver.wait(
      until.elementLocated(this.removeProductButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(remove), timeout);
    return await remove.getText();
  }
}

module.exports = InventoryPage;
