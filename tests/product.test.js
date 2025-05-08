const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators, data, expectedUrl } = require("../resources/locators.js");
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
        .findElement(By.id(locators.username))
        .sendKeys(data.standardUser);
      await driver
        .findElement(By.id(locators.password))
        .sendKeys(data.password);
      await driver.findElement(By.id(locators.buttonLogin)).click();

      const getUrl = await driver.getCurrentUrl();
      const getExpectedUrl = await expectedUrl.dashboardUrl;

      assert.equal(getUrl, getExpectedUrl);
    } catch (err) {
      throw err;
    }
  });

  it("PRD_001 - Display all products on the Inventory page", async () => {
    const detailProductName = await driver.findElements(
      By.xpath(locators.detailProductsName)
    );

    assert.strictEqual(detailProductName.length, 6);

    const expectedListProductName = [
      data.backpackDetailName,
      data.bikeLightDetailName,
      data.boltTshirtDetailName,
      data.fleeceJacketDetailName,
      data.onesieDetailName,
      data.tshirtDetailName,
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

  it("PRD_002 - Display the products price details on the Inventory page", async () => {
    const productsPrice = await driver.findElements(
      By.xpath(locators.detailPrice)
    );

    assert.strictEqual(productsPrice.length, 6);

    const expectedProductsPrice = [
      data.backpackPrice,
      data.bikeLightPrice,
      data.boltTshirtPrice,
      data.fleeceJacketPrice,
      data.onesiePrice,
      data.tshirtPrice,
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

  it("PRD_003 - Display product description when a product is clicked", async () => {
    const getProductImg = await driver.findElement(
      By.className(locators.detailProductsImg)
    );

    await getProductImg.click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = await expectedUrl.backpackProductUrl;
    assert.equal(getUrl, getExpectedUrl);

    const productName = await driver.findElement(
      By.xpath(locators.detailProductsName)
    );
    const getProductName = await productName.getText();
    const expectedProductName = await data.backpackDetailName;
    assert.equal(getProductName, expectedProductName);

    const productDesc = await driver.findElement(By.xpath(locators.detailDesc));
    const getProductDesc = await productDesc.getText();
    const expectedProductDesc = await data.backpackDesc;
    assert.equal(getProductDesc, expectedProductDesc);

    const productPrice = await driver.findElement(
      By.xpath(locators.detailPrice)
    );
    const getProductPrice = await productPrice.getText();
    const getExpectedProductPrice = await data.backpackPrice;
    assert.equal(getProductPrice, getExpectedProductPrice);
  });

  it("PRD_004 - Display a 'Back to products' button to return to the Inventory page", async () => {
    const getProductImg = await driver.wait(
      until.elementIsVisible(
        await driver.wait(until.elementLocated(By.xpath(locators.onesieImage)))
      ),
      30000
    );

    await getProductImg.click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = await expectedUrl.oneSieProductUrl;
    assert.equal(getUrl, getExpectedUrl);

    const getButton = await driver.findElement(
      By.xpath(locators.backToProductsButton)
    );

    await getButton.click();

    const getNowUrl = await driver.getCurrentUrl();
    const getInventoryUrl = await expectedUrl.dashboardUrl;
    assert.equal(getNowUrl, getInventoryUrl);
  });

  after(async () => {
    if (driver) {
      await driver.close();
    }
  });
});
