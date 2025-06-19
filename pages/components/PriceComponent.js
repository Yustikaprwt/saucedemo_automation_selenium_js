const { By, until } = require("selenium-webdriver");
const { locators } = require("../../resources/locators");

class PriceComponent {
  constructor(driver) {
    this.driver = driver;
    this.productPrice = By.css(locators.products.detailPrice);
    this.taxLabel = By.css(locators.products.taxLabel);
  }

  async getProductPrice(timeout = 5000) {
    const price = await this.driver.wait(
      until.elementLocated(this.productPrice),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(price), timeout);
    return await price.getText();
  }

  async getListProductPrice(timeout = 5000) {
    const listProductPrice = await this.driver.wait(
      until.elementsLocated(this.productPrice),
      timeout
    );

    for (const productsPrice of listProductPrice) {
      await this.driver.wait(until.elementIsVisible(productsPrice), timeout);

      const prices = [];
      for (const elements of listProductPrice) {
        const price = await elements.getText();
        const convertToFloat = parseFloat(price.replace(/[^0-9.]/g, ""));
        prices.push(convertToFloat);
      }

      return prices;
    }
  }

  async getListProductPriceInString(timeout = 5000) {
    const listProductPrice = await this.driver.wait(
      until.elementsLocated(this.productPrice),
      timeout
    );

    for (const productsPrice of listProductPrice) {
      await this.driver.wait(until.elementIsVisible(productsPrice), timeout);

      const prices = [];
      for (const elements of listProductPrice) {
        const price = await elements.getText();
        prices.push(price);
      }

      return prices;
    }
  }

  async calculateItemTotal() {
    const productsPrice = await this.getListProductPrice();

    let sum = 0;
    productsPrice.forEach((price) => {
      sum += price;
    });
    return sum;
  }

  async calculateTotalPayment(timeout = 5000) {
    const itemTotal = await this.calculateItemTotal();

    const tax = await this.driver.wait(
      until.elementLocated(this.taxLabel),
      timeout
    );

    await this.driver.wait(until.elementIsVisible(tax), timeout);

    const taxText = await tax.getText();
    const convertTax = parseFloat(taxText.replace(/[^0-9.]/g, ""));
    const totalPayment = (itemTotal + convertTax).toFixed(2);

    return totalPayment;
  }
}

module.exports = PriceComponent;
