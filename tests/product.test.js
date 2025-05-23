const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of view product and product detail", async function () {
  this.timeout(30000);

  let driver;

  before(async () => {
    driver = await createDriver();

    try {
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

  it("TC_PRD_001 - Display all products on the Inventory page", async () => {
    const detailProductName = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );
    assert.strictEqual(detailProductName.length, 6);

    const expectedListProductName = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    const actualProductName = [];
    for (const el of detailProductName) {
      const text = await el.getText();
      actualProductName.push(text);
    }

    for (const expected of expectedListProductName) {
      assert.ok(actualProductName.includes(expected));
    }
  });

  it("TC_PRD_002 - Display the products price details on the Inventory page", async () => {
    const productsPrice = await driver.findElements(
      By.xpath(locators.products.detailPrice)
    );

    assert.strictEqual(productsPrice.length, 6);

    const expectedProductsPrice = [
      data.products.backpackPrice,
      data.products.bikeLightPrice,
      data.products.boltTshirtPrice,
      data.products.fleeceJacketPrice,
      data.products.onesiePrice,
      data.products.tshirtPrice,
    ];

    const actualProductsPrice = [];
    for (const price of productsPrice) {
      const text = await price.getText();
      actualProductsPrice.push(text);
    }

    for (const expected of expectedProductsPrice) {
      assert.ok(actualProductsPrice.includes(expected));
    }
  });

  it("TC_PRD_003 - Display product description when a product is clicked", async () => {
    const getProductImg = await driver.findElement(
      By.className(locators.products.detailProductsImg)
    );

    await getProductImg.click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.backpackProductUrl;
    assert.equal(getUrl, getExpectedUrl);

    const productName = await driver.findElement(
      By.xpath(locators.products.detailProductsName)
    );
    const getProductName = await productName.getText();
    const expectedProductName = data.products.backpackDetailName;
    assert.equal(getProductName, expectedProductName);

    const productDesc = await driver.findElement(
      By.xpath(locators.products.detailDesc)
    );
    const getProductDesc = await productDesc.getText();
    const expectedProductDesc = data.products.backpackDesc;
    assert.equal(getProductDesc, expectedProductDesc);

    const productPrice = await driver.findElement(
      By.xpath(locators.products.detailPrice)
    );
    const getProductPrice = await productPrice.getText();
    const getExpectedProductPrice = data.products.backpackPrice;
    assert.equal(getProductPrice, getExpectedProductPrice);
  });

  it("TC_PRD_004 - Display a 'Back to products' button to return to the Inventory page", async () => {
    const getProductImg = await driver.wait(
      until.elementIsVisible(
        await driver.wait(
          until.elementLocated(By.xpath(locators.products.onesieImage))
        )
      ),
      30000
    );

    await getProductImg.click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.oneSieProductUrl;
    assert.equal(getUrl, getExpectedUrl);

    const getButton = await driver.findElement(
      By.xpath(locators.button.backToProductsButton)
    );

    await getButton.click();

    const getNowUrl = await driver.getCurrentUrl();
    const getInventoryUrl = expectedUrl.inventoryUrl;
    assert.equal(getNowUrl, getInventoryUrl);
  });

  it("TC_PRD_005 - Display the products that have been sorted by name in ascending order (A-Z)", async () => {
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortedIcon))
      .click();
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortAscByName))
      .click();

    const expectedProductSorted = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    const getProductSortedByName = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );

    const actualProductSorted = [];
    for (const products of getProductSortedByName) {
      const productName = await products.getText();
      actualProductSorted.push(productName);
    }

    assert.deepStrictEqual(actualProductSorted, expectedProductSorted);
  });

  it("TC_PRD_006 - Display the products that have been sorted by name in descending order (Z-A)", async () => {
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortedIcon))
      .click();
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortDescByName))
      .click();

    const expectedProductDesc = [
      data.products.tshirtDetailName,
      data.products.onesieDetailName,
      data.products.fleeceJacketDetailName,
      data.products.boltTshirtDetailName,
      data.products.bikeLightDetailName,
      data.products.backpackDetailName,
    ];

    const getProductDesc = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );

    const actualProductDesc = [];
    for (const products of getProductDesc) {
      const productName = await products.getText();
      actualProductDesc.push(productName);
    }

    assert.deepStrictEqual(actualProductDesc, expectedProductDesc);
  });

  it("TC_PRD_007 - Display the products that have been sorted by price in ascending order (low to high)", async () => {
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortedIcon))
      .click();
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortAscByPrice))
      .click();

    const expectedProductAscByPrice = [
      data.products.onesieDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.tshirtDetailName,
      data.products.backpackDetailName,
      data.products.fleeceJacketDetailName,
    ];

    const getProductAsc = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );

    const actualProductAscByPrice = [];
    for (products of getProductAsc) {
      const productName = await products.getText();
      actualProductAscByPrice.push(productName);
    }

    assert.deepStrictEqual(actualProductAscByPrice, expectedProductAscByPrice);
  });

  it("TC_PRD_008 - Display the products that have been sorted by price in descending order (high to low)", async () => {
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortedIcon))
      .click();
    await driver
      .findElement(By.xpath(locators.sortedDropdown.sortDescByPrice))
      .click();

    const expectedProductsDescByPrice = [
      data.products.fleeceJacketDetailName,
      data.products.backpackDetailName,
      data.products.boltTshirtDetailName,
      data.products.tshirtDetailName,
      data.products.bikeLightDetailName,
      data.products.onesieDetailName,
    ];

    const getProductsDesc = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );

    const actualProductsDescByPrice = [];
    for (product of getProductsDesc) {
      const productName = await product.getText();
      actualProductsDescByPrice.push(productName);
    }

    assert.deepStrictEqual(
      actualProductsDescByPrice,
      expectedProductsDescByPrice
    );
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
