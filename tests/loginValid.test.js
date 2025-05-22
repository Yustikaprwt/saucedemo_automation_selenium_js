const { By } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with valid credentials", async function () {
  this.timeout(30000);

  let driver;

  before(async function () {
    driver = await createDriver();
    console.log("Running test login with valid credentials");
  });

  it("TC_LGN_001 - Login account as user with 'standard_user' username and valid password", async function () {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.standardUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getURL = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.inventoryUrl;
    assert.equal(getURL, getExpectedUrl);

    const getElementTitle = await driver.findElement(
      By.xpath(locators.title.inventoryTitle)
    );
    const getTitle = await getElementTitle.getText();
    const expectedTitle = data.title.inventoryTitle;
    assert.equal(getTitle, expectedTitle);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
