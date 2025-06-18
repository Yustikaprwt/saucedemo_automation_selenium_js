const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators");

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.cartHeader = By.css(locators.title.headerTitle);
    this.badgeIcon = By.css(locators.cart.cartBadge);
    this.tshirtProductName = By.className(locators.cart.cartItem);
    this.cartListProduct = By.className(locators.cart.cartItemList);
    this.removeBackpackButton = By.id(locators.products.removeBackpackButton);
    this.continueShoppingButton = By.id(locators.button.continueShoppingButton);
    this.checkoutButton = By.id(locators.button.checkoutButton);
  }

  async getCartTitle(timeout = 5000) {
    const title = await this.driver.wait(
      until.elementLocated(this.cartHeader),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(title), timeout);
    return await title.getText();
  }

  async getProductQuantityOnBadge(timeout = 5000) {
    const icon = await this.driver.wait(
      until.elementLocated(this.badgeIcon),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(icon), timeout);
    return await icon.getText();
  }

  async checkIfCartEmpty() {
    const quantity = await this.driver.findElements(this.badgeIcon);

    return (await quantity.length) === 0;
  }

  async getProductName(timeout = 5000) {
    const name = await this.driver.wait(
      until.elementLocated(this.tshirtProductName),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(name), timeout);
    return await name.getText();
  }

  async getListProductOfCart(timeout = 5000) {
    const listProduct = await this.driver.wait(
      until.elementsLocated(this.cartListProduct),
      timeout
    );

    for (const list of listProduct) {
      await this.driver.wait(until.elementIsVisible(list), timeout);
    }

    const products = [];
    for (const elements of listProduct) {
      const name = await elements.getText();
      products.push(name);
    }

    const rawText = products[0];
    const lines = rawText.split("\n");

    const productNames = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "1" && typeof lines[i + 1] === "string") {
        productNames.push(lines[i + 1]);
      }
    }

    const listProductNames = productNames.filter(
      (name) =>
        name.includes("Sauce Labs") || name.includes("Test.allTheThings()")
    );

    return listProductNames;
  }

  async clickRemoveBackpack(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.removeBackpackButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickContinueShoppingButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.continueShoppingButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickCheckoutButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.checkoutButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }
}

module.exports = CartPage;
