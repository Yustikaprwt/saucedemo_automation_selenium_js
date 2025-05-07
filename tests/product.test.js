const { By } = require("selenium-webdriver");
const assert = require("assert");
const driver = require("../resources/driver.js");
const { locators, data, expectedUrl } = require("../resources/locators.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of view product and product detail", async function () {
  this.timeout(30000);

  before(async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.standardUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = await expectedUrl.dashboardUrl;

    assert.equal(getUrl, getExpectedUrl);
  });

  it("PRD_001 - Display all products on the Inventory page", async () => {
    const detailProductName = await driver.findElements(
      By.xpath(locators.detailProductName)
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

  it.only("PRD_002 - Display the products price details on the Inventory page", async () => {
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

  after(async () => driver.close());
});
