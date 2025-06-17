const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.inventoryHeader = By.css(locators.title.inventoryTitle);
    this.addBackpackButton = By.id(locators.products.addBackpackButton);
    this.removeProductButton = By.id(locators.products.removeBackpackButton);
    this.addTshirtButton = By.id(locators.products.addTshirtButton);
    this.productsName = By.css(locators.products.detailProductsName);
    this.productsPrice = By.css(locators.products.detailPrice);
    this.productImg = By.className(locators.products.detailProductsImg);
    this.productDesc = By.css(locators.products.detailDesc);
    this.backButton = By.css(locators.button.backToProductsButton);
    this.sortIcon = By.css(locators.sortedDropdown.sortedIcon);
    this.sortedNameAsc = By.css(locators.sortedDropdown.sortAscByName);
    this.sortedNameDesc = By.css(locators.sortedDropdown.sortDescByName);
    this.sortedPriceAsc = By.css(locators.sortedDropdown.sortAscByPrice);
    this.sortedPriceDesc = By.css(locators.sortedDropdown.sortDescByPrice);
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

  async clickProductImg(timeout = 5000) {
    const img = await this.driver.wait(
      until.elementLocated(this.productImg),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(img), timeout);
    await img.click();
  }

  async clickBackButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.backButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickSortProductIcon(timeout = 5000) {
    const icon = await this.driver.wait(
      until.elementLocated(this.sortIcon),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(icon), timeout);
    await icon.click();
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

  async getProductName(timeout = 5000) {
    const productName = await this.driver.wait(
      until.elementLocated(this.productsName),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(productName), timeout);
    return await productName.getText();
  }

  async getListProductsName(timeout = 5000) {
    const listProductsName = await this.driver.wait(
      until.elementsLocated(this.productsName),
      timeout
    );

    for (const productName of listProductsName) {
      await this.driver.wait(until.elementIsVisible(productName), timeout);
    }

    const names = [];
    for (const elements of listProductsName) {
      const name = await elements.getText();
      names.push(name);
    }
    return names;
  }

  async getProductPrice(timeout = 5000) {
    const price = await this.driver.wait(
      until.elementLocated(this.productsPrice),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(price), timeout);
    return await price.getText();
  }

  async getListProductsPrice(timeout = 5000) {
    const listProductsPrice = await this.driver.wait(
      until.elementsLocated(this.productsPrice),
      timeout
    );

    for (const productPrice of listProductsPrice) {
      await this.driver.wait(until.elementIsVisible(productPrice), timeout);
    }

    const prices = [];
    for (const elements of listProductsPrice) {
      const price = await elements.getText();
      prices.push(price);
    }

    return prices;
  }

  async getProductDesc(timeout = 5000) {
    const desc = await this.driver.wait(
      until.elementLocated(this.productDesc),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(desc), timeout);
    return await desc.getText();
  }

  async sortProductsByNameAsc(timeout = 5000) {
    await this.clickSortProductIcon();

    const sorted = await this.driver.wait(
      until.elementLocated(this.sortedNameAsc),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(sorted), timeout);
    await sorted.click();
  }

  async sortProductsByNameDesc(timeout = 5000) {
    await this.clickSortProductIcon();

    const sorted = await this.driver.wait(
      until.elementLocated(this.sortedNameDesc),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(sorted), timeout);
    await sorted.click();
  }

  async sortProductsByPriceAsc(timeout = 5000) {
    await this.clickSortProductIcon();

    const sorted = await this.driver.wait(
      until.elementLocated(this.sortedPriceAsc),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(sorted), timeout);
    await sorted.click();
  }

  async sortProductsByPriceDesc(timeout = 5000) {
    await this.clickSortProductIcon();

    const sorted = await this.driver.wait(
      until.elementLocated(this.sortedPriceDesc),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(sorted), timeout);
    await sorted.click();
  }
}

module.exports = InventoryPage;
