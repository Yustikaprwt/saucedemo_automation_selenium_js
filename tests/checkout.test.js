const { By } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of checkout feature with empty product", async function () {
  this.timeout(30000);
  let driver;

  beforeEach(async () => {
    try {
      driver = await createDriver();
      await driver.get(BASE_URL);

      await driver
        .findElement(By.id(locators.login.username))
        .sendKeys(data.login.standardUser);
      await driver
        .findElement(By.id(locators.login.password))
        .sendKeys(data.login.password);
      await driver.findElement(By.id(locators.login.buttonLogin)).click();

      const getUrl = await driver.getCurrentUrl();
      const getExpectedUrl = expectedUrl.inventoryUrl;
      assert.equal(getUrl, getExpectedUrl);
    } catch (err) {
      throw err;
    }
  });

  it("TC_CHECKOUT_001 - Failed redirected to the Checkout page by clicking the 'Checkout' button on the Cart page when the cart is empty", async () => {
    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const getExpctedUrl = expectedUrl.cartPage;
    assert.equal(getUrl, getExpctedUrl);

    await driver.findElement(By.id(locators.button.checkoutButton)).click();
    const getErrorMessage = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorText = await getErrorMessage.getText();
    const errorMessage =
      "Can't proceed to the checkout process. Your cart must not be empty if you want to checkout.";
    assert.equal(getErrorText, errorMessage);
  });

  after(async () => {
    if (driver) {
      await driver.close();
    }
  });
});

describe("Test the functionality of the checkout feature with at least one product in the cart.", async function () {
  this.timeout(30000);
  let driver;

  beforeEach(async () => {
    driver = await createDriver();
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.standardUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.inventoryUrl;
    assert.equal(getUrl, getExpectedUrl);

    await driver
      .findElement(By.id(locators.products.addBackpackButton))
      .click();

    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();
    const getCartUrl = await driver.getCurrentUrl();
    const cartUrl = expectedUrl.cartPage;
    assert.equal(getCartUrl, cartUrl);
  });

  it("TC_CHECKOUT_002 - Successfully redirected to the checkout page by clicking the 'Checkout' button on the Cart page when the cart contains products", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.checkoutUrl;
    assert.equal(getUrl, url);
  });

  it("TC_CHECKOUT_003 - Successfully completed the product checkout.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.checkoutUrl;
    assert.equal(getUrl, url);

    await driver
      .findElement(By.id(locators.inputField.firstNameField))
      .sendKeys(data.checkoutData.firstName);
    await driver
      .findElement(By.id(locators.inputField.lastNameField))
      .sendKeys(data.checkoutData.lastName);
    await driver
      .findElement(By.id(locators.inputField.zipCodeField))
      .sendKeys(data.checkoutData.zipCode);

    await driver.findElement(By.id(locators.button.continueCheckout)).click();

    const getPaymentUrl = await driver.getCurrentUrl();
    const paymentUrl = expectedUrl.paymentUrl;
    assert.equal(getPaymentUrl, paymentUrl);
  });

  afterEach(async () => {
    if (driver) {
      await driver.close();
    }
  });
});
