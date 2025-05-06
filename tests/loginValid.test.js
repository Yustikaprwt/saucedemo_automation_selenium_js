const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const driver = require("../resources/driver.js");
const { locators, data, expectedUrl } = require("../resources/locators.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with valid credentials", async function () {
  this.timeout(30000);

  before(async function () {
    console.log("Running test login with valid credentials");
  });

  it("LGN_001 - Login account as user with 'standard_user' username and valid password", async function () {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.standardUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getURL = await driver.getCurrentUrl();
    const title = await driver.findElement(By.xpath(locators.dashboardTitle));
    const getTitle = await title.getText();
    const getExpectedUrl = await expectedUrl.dashboardUrl;

    assert.equal(getURL, getExpectedUrl);
    assert.equal(getTitle, data.dashboardTitle);
  });

  after(async () => await driver.close());
});
