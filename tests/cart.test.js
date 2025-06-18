const createDriver = require("../resources/driver.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const LoginPage = require("../page/LoginPage.js");
const InventoryPage = require("../page/InventoryPage.js");
const { expect } = require("chai");
const CartPage = require("../page/cartPage.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of cart", async function () {
  this.timeout(60000);

  let driver;
  let loginPage;
  let inventoryPage;
  let cartPage;

  beforeEach(async () => {
    try {
      driver = await createDriver();
      await driver.get(BASE_URL);

      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      cartPage = new CartPage(driver);

      await loginPage.login(data.login.standardUser, data.login.password);

      const getURL = await driver.getCurrentUrl();
      const expectedURL = expectedUrl.inventoryUrl;
      expect(getURL).to.equal(expectedURL);
    } catch (err) {
      throw err;
    }
  });

  it("TC_CART_001 - Cart page is displayed when cart icon is clicked on Inventory page", async () => {
    await inventoryPage.clickCartIcon();

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(getURL).to.equal(expectedURL);

    const headerTitle = await cartPage.getCartTitle();
    expect(headerTitle).to.equal("Your Cart");
  });

  it("TC_CART_002 - User successfully added the product to the cart", async () => {
    await inventoryPage.clickAddTshirtButton();
    await inventoryPage.clickCartIcon();

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(getURL).to.equal(expectedURL);

    const quantity = await cartPage.getProductQuantityOnBadge();
    expect(quantity).to.deep.equal("1");

    const productName = await cartPage.getProductName();
    const expectedItemName = data.products.boltTshirtDetailName;
    expect(productName).to.include(expectedItemName);
  });

  it("TC_CART_003 - User successfully added multiple product to the cart", async () => {
    await inventoryPage.clickAddBackpackButton();
    await inventoryPage.clickAddTshirtButton();
    await inventoryPage.clickCartIcon();

    const quantity = await cartPage.getProductQuantityOnBadge();
    expect(quantity).to.deep.equal("2");

    const cartProducts = await cartPage.getListProductOfCart();
    const backpack = data.products.backpackDetailName;
    const tshirt = data.products.boltTshirtDetailName;
    expect(cartProducts).to.include.members([backpack, tshirt]);
  });

  it("TC_CART_004 - User successfully added all products from the Inventory page to the cart", async () => {
    await inventoryPage.addAllProductToCart();

    const quantity = await cartPage.getProductQuantityOnBadge();
    expect(quantity).to.deep.equal("6");

    await inventoryPage.clickCartIcon();

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(getURL).to.equal(expectedURL);

    const cartProducts = await cartPage.getListProductOfCart();

    const expectedCartProducts = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    expect(cartProducts).to.deep.equal(expectedCartProducts);
  });

  it("TC_CART_005 - User successfully removed a product from the Cart page", async () => {
    await inventoryPage.clickAddBackpackButton();

    const quantity = await cartPage.getProductQuantityOnBadge();
    expect(quantity).to.deep.equal("1");

    await cartPage.clickRemoveBackpack();
    const isEmpty = await cartPage.checkIfCartEmpty();
    expect(isEmpty).to.be.true;
  });

  it("TC_CART_006 - Display a 'Continue Shopping' button to return to the Inventory page", async () => {
    await inventoryPage.clickAddBackpackButton();

    await inventoryPage.clickCartIcon();
    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.cartPage;
    expect(getURL).to.deep.equal(expectedURL);

    await cartPage.clickContinueShoppingButton();

    const url = await driver.getCurrentUrl();
    expect(url).to.include("inventory");
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
