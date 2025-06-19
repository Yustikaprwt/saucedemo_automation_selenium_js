const { By, until } = require("selenium-webdriver");
const { locators } = require("../resources/locators");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.inventoryHeader = By.css(locators.title.headerTitle);
    this.addBackpackButton = By.id(locators.products.addBackpackButton);
    this.addTshirtButton = By.id(locators.products.addTshirtButton);
    this.addBikeLightButton = By.id(locators.products.addBikeLightButton);
    this.addJacketButton = By.id(locators.products.addFleeceJacketButton);
    this.addOnesieButton = By.id(locators.products.addOnesieButton);
    this.addRedTshirtButton = By.id(locators.products.addRedTshirtButton);
    this.removeProductButton = By.id(locators.products.removeBackpackButton);
    this.productsName = By.css(locators.products.detailProductsName);
    this.productImg = By.className(locators.products.detailProductsImg);
    this.productDesc = By.css(locators.products.detailDesc);
    this.backButton = By.css(locators.button.backToProductsButton);
    this.sortIcon = By.css(locators.sortedDropdown.sortedIcon);
    this.sortedNameAsc = By.css(locators.sortedDropdown.sortAscByName);
    this.sortedNameDesc = By.css(locators.sortedDropdown.sortDescByName);
    this.sortedPriceAsc = By.css(locators.sortedDropdown.sortAscByPrice);
    this.sortedPriceDesc = By.css(locators.sortedDropdown.sortDescByPrice);
    this.cartIcon = By.css(locators.cart.cartIcon);
    this.burgerMenu = By.id(locators.button.burgerMenuButton);
    this.logoutLink = By.id(locators.optionLink.logoutLink);
  }

  async getInventoryTitle(timeout = 5000) {
    const headerText = await this.driver.wait(
      until.elementLocated(this.inventoryHeader),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(headerText), timeout);
    return await headerText.getText();
  }

  async clickAddTshirtButton(timeout = 5000) {
    const addProductButton = await this.driver.wait(
      until.elementLocated(this.addTshirtButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(addProductButton), timeout);
    await addProductButton.click();
  }

  async clickAddBackpackButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.addBackpackButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickAddBikeLightButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.addBikeLightButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickAddJacketButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.addJacketButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickAddOnesieButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.addOnesieButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async clickAddRedTshirtButton(timeout = 5000) {
    const button = await this.driver.wait(
      until.elementLocated(this.addRedTshirtButton),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(button), timeout);
    await button.click();
  }

  async addAllProductToCart() {
    await this.clickAddBackpackButton();
    await this.clickAddBikeLightButton();
    await this.clickAddTshirtButton();
    await this.clickAddJacketButton();
    await this.clickAddOnesieButton();
    await this.clickAddRedTshirtButton();
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

  async clickCartIcon(timeout = 5000) {
    const icon = await this.driver.wait(
      until.elementLocated(this.cartIcon),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(icon), timeout);
    await icon.click();
  }

  async clickBurgerMenu(timeout = 5000) {
    const icon = await this.driver.wait(
      until.elementLocated(this.burgerMenu),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(icon), timeout);
    await icon.click();
  }

  async clickLogout(timeout = 5000) {
    await this.clickBurgerMenu();

    const linkText = await this.driver.wait(
      until.elementLocated(this.logoutLink),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(linkText), timeout);
    await this.driver.wait(until.elementIsEnabled(linkText), timeout);
    await linkText.click();
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
