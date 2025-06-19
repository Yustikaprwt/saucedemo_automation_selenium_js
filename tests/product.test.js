const createDriver = require("../resources/driver.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const { expect } = require("chai");
const InventoryPage = require("../pages/InventoryPage.js");
const LoginPage = require("../pages/LoginPage.js");
const PriceComponent = require("../pages/components/PriceComponent.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of view product and product detail", async function () {
  this.timeout(10000);

  let driver;
  let loginPage;
  let inventoryPage;
  let priceComponent;

  beforeEach(async () => {
    try {
      driver = await createDriver();
      await driver.get(BASE_URL);

      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      priceComponent = new PriceComponent(driver);

      await loginPage.login(data.login.standardUser, data.login.password);
    } catch (err) {
      console.log("Before failed", err);
      throw err;
    }
  });

  it("TC_PRD_001 - Display all products on the Inventory page", async () => {
    const listProductsName = await inventoryPage.getListProductsName();
    expect(listProductsName).to.be.an("array").and.have.lengthOf(6);

    const expectedListProductsName = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    expect(listProductsName).to.deep.equal(expectedListProductsName);
  });

  it("TC_PRD_002 - Display the products price details on the Inventory page", async () => {
    const listProductsPrice =
      await priceComponent.getListProductPriceInString();
    expect(listProductsPrice).to.be.an("array").and.have.lengthOf(6);

    const expectedProductsPrice = [
      data.products.backpackPrice,
      data.products.bikeLightPrice,
      data.products.boltTshirtPrice,
      data.products.fleeceJacketPrice,
      data.products.onesiePrice,
      data.products.tshirtPrice,
    ];

    expect(listProductsPrice).to.deep.equal(expectedProductsPrice);
  });

  it("TC_PRD_003 - Display product description when a product is clicked", async () => {
    await inventoryPage.clickProductImg();

    const productName = await inventoryPage.getProductName();
    const expectedProductName = data.products.backpackDetailName;
    expect(productName).to.equal(expectedProductName);

    const productDesc = await inventoryPage.getProductDesc();
    const expectedProductDesc = data.products.backpackDesc;
    expect(productDesc).to.equal(expectedProductDesc);

    const productPrice = await priceComponent.getProductPrice();
    const expectedProductPrice = data.products.backpackPrice;
    expect(productPrice).to.equal(expectedProductPrice);
  });

  it("TC_PRD_004 - Display a 'Back to products' button to return to the Inventory page", async () => {
    await inventoryPage.clickProductImg();
    await inventoryPage.clickBackButton();

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;
    expect(getURL).to.equal(expectedURL);
  });

  it("TC_PRD_005 - Display the products that have been sorted by name in ascending order (A-Z)", async () => {
    await inventoryPage.sortProductsByNameAsc();

    const sortedProducts = await inventoryPage.getListProductsName();

    const expectedProducts = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    expect(sortedProducts).to.be.an("array").and.have.lengthOf(6);
    expect(sortedProducts).to.deep.equal(expectedProducts);
  });

  it("TC_PRD_006 - Display the products that have been sorted by name in descending order (Z-A)", async () => {
    await inventoryPage.sortProductsByNameDesc();

    const sortedProducts = await inventoryPage.getListProductsName();

    const expectedProducts = [
      data.products.tshirtDetailName,
      data.products.onesieDetailName,
      data.products.fleeceJacketDetailName,
      data.products.boltTshirtDetailName,
      data.products.bikeLightDetailName,
      data.products.backpackDetailName,
    ];

    expect(sortedProducts).to.be.an("array");
    expect(sortedProducts).to.deep.equal(expectedProducts);
  });

  it("TC_PRD_007 - Display the products that have been sorted by price in ascending order (low to high)", async () => {
    await inventoryPage.sortProductsByPriceAsc();

    const sortedProducts = await inventoryPage.getListProductsName();

    const expectedProducts = [
      data.products.onesieDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.tshirtDetailName,
      data.products.backpackDetailName,
      data.products.fleeceJacketDetailName,
    ];

    expect(sortedProducts).to.be.an("array");
    expect(sortedProducts).to.deep.equal(expectedProducts);
  });

  it("TC_PRD_008 - Display the products that have been sorted by price in descending order (high to low)", async () => {
    await inventoryPage.sortProductsByPriceDesc();

    const sortedProducts = await inventoryPage.getListProductsName();

    const expectedProducts = [
      data.products.fleeceJacketDetailName,
      data.products.backpackDetailName,
      data.products.boltTshirtDetailName,
      data.products.tshirtDetailName,
      data.products.bikeLightDetailName,
      data.products.onesieDetailName,
    ];

    expect(sortedProducts).to.be.an("array");
    expect(sortedProducts).to.deep.equal(expectedProducts);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
