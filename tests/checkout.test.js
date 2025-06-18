const createDriver = require("../resources/driver.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const { errorMessage } = require("../resources/errorMessage.js");
const { expect } = require("chai");
const LoginPage = require("../page/loginPage.js");
const InventoryPage = require("../page/inventoryPage.js");
const CartPage = require("../page/CartPage.js");
const CheckoutPage = require("../page/CheckoutPage.js");
const AlertComponent = require("../page/components/AlertComponent.js");
const PriceComponent = require("../page/components/PriceComponent.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of checkout feature with empty product", async function () {
  this.timeout(30000);
  let driver;
  let loginPage;
  let inventoryPage;
  let cartPage;
  let alertComponent;

  before(async () => {
    try {
      driver = await createDriver();
      await driver.get(BASE_URL);

      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      cartPage = new CartPage(driver);
      alertComponent = new AlertComponent(driver);

      await loginPage.login(data.login.standardUser, data.login.password);

      const getURL = await driver.getCurrentUrl();
      const expectedURL = expectedUrl.inventoryUrl;
      expect(getURL).to.equal(expectedURL);
    } catch (err) {
      throw err;
    }
  });

  it.skip("TC_CHECKOUT_001 - Failed redirected to the Checkout page by clicking the 'Checkout' button on the Cart page when the cart is empty", async () => {
    await inventoryPage.clickCartIcon();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("cart");

    await cartPage.clickCheckoutButton();
    const message = await alertComponent.getErrorMessageText();
    const expected =
      "Can't proceed to the checkout process. Your cart must not be empty if you want to checkout.";
    expect(message).to.equal(expected);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});

describe("Test the functionality of the checkout feature with at least one product in the cart.", async function () {
  this.timeout(30000);
  let driver;
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let alertComponent;
  let priceComponent;

  beforeEach(async () => {
    driver = await createDriver();
    await driver.get(BASE_URL);

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    alertComponent = new AlertComponent(driver);
    priceComponent = new PriceComponent(driver);

    await loginPage.login(data.login.standardUser, data.login.password);

    await inventoryPage.clickAddBackpackButton();
    await inventoryPage.clickAddOnesieButton();

    await inventoryPage.clickCartIcon();
    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(getURL).to.equal(expectedURL);
  });

  it("TC_CHECKOUT_002 - Successfully redirected to the checkout page by clicking the 'Checkout' button on the Cart page when the cart contains products", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");
  });

  it("TC_CHECKOUT_003 - Successfully completed the product checkout.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.fillCheckoutForm(
      data.checkoutData.firstName,
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).to.include("step-two");
  });

  it("TC_CHECKOUT_004 - Attempt to checkout the product with empty fields for first name.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.checkoutWithEmptyFirstName(
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const message = await alertComponent.getErrorMessageText();
    const expected = errorMessage.requiredFirstName;
    expect(message).to.equal(expected);
  });

  it("TC_CHECKOUT_005 - Attempt to checkout the product with empty fields for last name.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.checkoutWithEmptyLastName(
      data.checkoutData.firstName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const message = await alertComponent.getErrorMessageText();
    const expected = errorMessage.requiredLastName;
    expect(message).to.equal(expected);
  });

  it("TC_CHECKOUT_006 - Attempt to checkout the product with empty fields for zip/postal code.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.checkoutWithEmptyPostalCode(
      data.checkoutData.firstName,
      data.checkoutData.lastName
    );
    await checkoutPage.clickContinueCheckout();

    const message = await alertComponent.getErrorMessageText();
    const expected = errorMessage.requiredPostalCode;
    expect(message).to.equal(expected);
  });

  it("TC_CHECKOUT_007 - Redirect to the Cart page if the user cancels the checkout on the Checkout page.", async () => {
    await cartPage.clickCheckoutButton();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.clickCancelCheckout();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(currentURL).to.equal(expectedURL);
  });

  it("TC_CHECKOUT_008 - Redirect to the Inventory page if the users cancels the checkout on the Payment page.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.fillCheckoutForm(
      data.checkoutData.firstName,
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).to.include("step-two");

    await checkoutPage.clickCancelCheckout();
    const actualURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;
    expect(actualURL).to.equal(expectedURL);
  });

  it("TC_CHECKOUT_009 - Correctly calculate the item total for product purchased on the Payment page.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.fillCheckoutForm(
      data.checkoutData.firstName,
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.paymentUrl;
    expect(currentURL).to.equal(expectedURL);

    const totalItem = await priceComponent.calculateItemTotal();
    expect(totalItem).to.equal(37.98);
  });

  it("TC_CHECKOUT_010 - Correctly calculate the total payment with tax for product purchased on the Payment page.", async () => {
    await cartPage.clickCheckoutButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.fillCheckoutForm(
      data.checkoutData.firstName,
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.paymentUrl;
    expect(currentURL).to.equal(expectedURL);

    const totalPayment = await priceComponent.calculateTotalPayment();
    expect(totalPayment).to.equal("41.02");
  });

  it("TC_CHECKOUT_011 - Display a success message after the user successfully completes the checkout and payment process.", async () => {
    await cartPage.clickCheckoutButton();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("checkout");

    await checkoutPage.fillCheckoutForm(
      data.checkoutData.firstName,
      data.checkoutData.lastName,
      data.checkoutData.postalCode
    );
    await checkoutPage.clickContinueCheckout();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.paymentUrl;
    expect(currentURL).to.equal(expectedURL);

    await checkoutPage.clickFinishPayment();

    const message = await checkoutPage.getCompleteOrderMessage();
    const expectedMessage = "Thank you for your order!";
    expect(message).to.deep.equal(expectedMessage);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
