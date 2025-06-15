const { By } = require("selenium-webdriver");
const { expect } = require("chai");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const LoginPage = require("../page/loginPage.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with valid credentials", async function () {
  let driver;

  before(async function () {
    driver = await createDriver();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get(BASE_URL);
  });

  it.only("TC_LGN_001 - Login account as user with 'standard_user' username and valid password", async function () {
    const validLoginTest = new LoginPage(driver);
    await validLoginTest.login("standard_user", "secret_sauce");

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;
    expect(getURL).to.equal(expectedURL).that.is.an("string");

    const getElementTitle = await driver.findElement(
      By.css(locators.title.inventoryTitle)
    );

    const getTitle = await getElementTitle.getText();
    const expectedTitle = data.title.inventoryTitle;
    expect(getTitle).to.include(expectedTitle).that.is.an("string");
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
