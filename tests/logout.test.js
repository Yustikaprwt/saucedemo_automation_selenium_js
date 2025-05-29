const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of the logout feature.", async function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    try {
      driver = await createDriver();

      await driver.get(BASE_URL);
      const loginUrl = await driver.getCurrentUrl();
      const expectedLoginUrl = expectedUrl.loginUrl;
      assert.strictEqual(loginUrl, expectedLoginUrl);

      await driver
        .findElement(By.id(locators.login.username))
        .sendKeys(data.login.standardUser);
      await driver
        .findElement(By.id(locators.login.password))
        .sendKeys(data.login.password);
      await driver.findElement(By.id(locators.login.buttonLogin)).click();

      const inventoryUrl = await driver.getCurrentUrl();
      const expectedInventoryUrl = expectedUrl.inventoryUrl;
      assert.strictEqual(inventoryUrl, expectedInventoryUrl);
    } catch (err) {
      throw err;
    }
  });

  it("TC_LOGOUT_001 - Redirected to the login page after logout account", async () => {
    const burgerMenu = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.id(locators.button.burgerMenuButton))
      ),
      5000
    );
    await burgerMenu.click();

    const logoutLink = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.id(locators.optionLink.logoutLink))
      ),
      5000
    );
    await logoutLink.click();

    const loginUrl = await driver.getCurrentUrl();
    const expectedLoginUrl = expectedUrl.loginUrl;
    assert.strictEqual(loginUrl, expectedLoginUrl);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
