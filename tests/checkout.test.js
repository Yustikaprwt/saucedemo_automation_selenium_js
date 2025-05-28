const { By } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const { errorMessage } = require("../resources/errorMessage.js");
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
    await driver.findElement(By.id(locators.products.addOnesieButton)).click();

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

  it("TC_CHECKOUT_004 - Attempt to checkout the product with empty fields for first name.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const getUrl = await driver.getCurrentUrl();
    const checkoutUrl = expectedUrl.checkoutUrl;
    assert.equal(getUrl, checkoutUrl);

    await driver
      .findElement(By.id(locators.inputField.lastNameField))
      .sendKeys(data.checkoutData.lastName);
    await driver
      .findElement(By.id(locators.inputField.zipCodeField))
      .sendKeys(data.checkoutData.zipCode);
    await driver.findElement(By.id(locators.button.continueCheckout)).click();

    const getErrorElement = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorMessage = await getErrorElement.getText();
    const message = errorMessage.requiredFirstName;
    assert.strictEqual(getErrorMessage, message);
  });

  it("TC_CHECKOUT_005 - Attempt to checkout the product with empty fields for last name.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const getUrl = await driver.getCurrentUrl();
    const checkoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(getUrl, checkoutUrl);

    await driver
      .findElement(By.id(locators.inputField.firstNameField))
      .sendKeys(data.checkoutData.firstName);
    await driver
      .findElement(By.id(locators.inputField.zipCodeField))
      .sendKeys(data.checkoutData.zipCode);
    await driver.findElement(By.id(locators.button.continueCheckout)).click();

    const getErrorElement = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorMessage = await getErrorElement.getText();
    const message = errorMessage.requiredLastName;
    assert.strictEqual(getErrorMessage, message);
  });

  it("TC_CHECKOUT_006 - Attempt to checkout the product with empty fields for zip/postal code.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();
    const getUrl = await driver.getCurrentUrl();
    const checkoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(getUrl, checkoutUrl);

    await driver
      .findElement(By.id(locators.inputField.firstNameField))
      .sendKeys(data.checkoutData.firstName);
    await driver
      .findElement(By.id(locators.inputField.lastNameField))
      .sendKeys(data.checkoutData.lastName);
    await driver.findElement(By.id(locators.button.continueCheckout)).click();

    const getErrorElement = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorMessage = await getErrorElement.getText();
    const message = errorMessage.requiredPostalCode;
    assert.strictEqual(getErrorMessage, message);
  });

  it("TC_CHECKOUT_007 - Redirect to the Cart page if the user cancels the checkout on the Checkout page.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const getUrl = await driver.getCurrentUrl();
    const checkoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(getUrl, checkoutUrl);

    await driver.findElement(By.id(locators.button.cancelCheckout)).click();

    const getActiveUrl = await driver.getCurrentUrl();
    const cartUrl = expectedUrl.cartPage;
    assert.strictEqual(getActiveUrl, cartUrl);
  });

  it("TC_CHECKOUT_008 - Redirect to the Inventory page if the users cancels the checkout on the Payment page.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const checkoutPageUrl = await driver.getCurrentUrl();
    const expectedCheckoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(checkoutPageUrl, expectedCheckoutUrl);

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

    const paymentUrl = await driver.getCurrentUrl();
    const expectedPaymentUrl = expectedUrl.paymentUrl;
    assert.strictEqual(paymentUrl, expectedPaymentUrl);

    await driver.findElement(By.id(locators.button.cancelCheckout)).click();

    const inventoryUrl = await driver.getCurrentUrl();
    const expectedInventoryUrl = expectedUrl.inventoryUrl;
    assert.strictEqual(inventoryUrl, expectedInventoryUrl);
  });

  it("TC_CHECKOUT_009 - Correctly calculate the item total for product purchased on the Payment page.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const checkoutUrl = await driver.getCurrentUrl();
    const expectedCheckoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(checkoutUrl, expectedCheckoutUrl);

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

    const paymentUrl = await driver.getCurrentUrl();
    const expectedPaymentUrl = expectedUrl.paymentUrl;
    assert.strictEqual(paymentUrl, expectedPaymentUrl);

    const getProductsPrice = await driver.findElements(
      By.xpath(locators.products.detailPrice)
    );

    const listProductsPrice = [];
    for (const price of getProductsPrice) {
      const productPrice = await price.getText();
      const convertPrice = parseFloat(productPrice.replace(/[^0-9.]/g, ""));
      listProductsPrice.push(convertPrice);
    }

    let sum = 0;
    listProductsPrice.forEach((price) => {
      sum += price;
    });

    const expectedItemTotal = 37.98;
    assert.strictEqual(sum, expectedItemTotal);
  });

  it("TC_CHECKOUT_010 - Correctly calculate the total payment with tax for product purchased on the Payment page.", async () => {
    await driver.findElement(By.id(locators.button.checkoutButton)).click();

    const checkoutUrl = await driver.getCurrentUrl();
    const expectedCheckoutUrl = expectedUrl.checkoutUrl;
    assert.strictEqual(checkoutUrl, expectedCheckoutUrl);

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

    const paymentUrl = await driver.getCurrentUrl();
    const expectedPaymentUrl = expectedUrl.paymentUrl;
    assert.strictEqual(paymentUrl, expectedPaymentUrl);

    const getProductsPrice = await driver.findElements(
      By.xpath(locators.products.detailPrice)
    );

    const listProductsPrice = [];
    for (const price of getProductsPrice) {
      const productPrice = await price.getText();
      const convertPrice = parseFloat(productPrice.replace(/[^0-9.]/g, ""));
      listProductsPrice.push(convertPrice);
    }

    const getTax = await driver.findElement(
      By.xpath(locators.products.taxLabel)
    );
    const taxLabel = await getTax.getText();
    const convertTax = parseFloat(taxLabel.replace(/[^0-9.]/g, ""));

    let sum = 0;
    listProductsPrice.forEach((price) => {
      sum += price;
    });

    const totalPayment = parseFloat((sum + convertTax).toFixed(2));
    const expectedTotalPayment = 41.02;
    assert.strictEqual(totalPayment, expectedTotalPayment);
  });

  afterEach(async () => {
    if (driver) {
      await driver.close();
    }
  });
});
