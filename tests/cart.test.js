const { By } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators, data, expectedUrl } = require("../resources/locators.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of cart", async function () {
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

  it("CART_001 - Cart page is displayed when cart icon is clicked on Inventory page", async () => {
    await driver.findElement(By.xpath(locators.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = await expectedUrl.cartPage;

    assert.equal(getUrl, url);
  });

  it("CART_002 - User successfully added the product to the cart", async () => {
    await driver.findElement(By.id(locators.addTshirtButton)).click();
    await driver.findElement(By.xpath(locators.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = await expectedUrl.cartPage;
    assert.equal(getUrl, url);

    const getBadgeIcon = await driver.findElement(By.xpath(locators.cartBadge));
    const quantityOfCart = await getBadgeIcon.getText();
    const expectedQuantity = "1";
    assert.equal(quantityOfCart, expectedQuantity);

    const getItem = await driver.findElement(By.className(locators.cartItem));
    const getItemName = await getItem.getText();

    const expectedItemName = data.boltTshirtDetailName;
    assert.ok(getItemName.includes(expectedItemName));
  });

  after(async () => {
    if (driver) {
      await driver.close();
    }
  });
});
