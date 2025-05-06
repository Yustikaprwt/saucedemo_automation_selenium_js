const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const driver = require("../resources/driver.js");
const assert = require("assert");
const { locators, data, errorMessage } = require("../resources/locators.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with invalid credentials", async () => {
  //   this.timeout(30000);

  before(async () => {
    const option = new chrome.Options();

    option.addArguments("--disable-save-password-bubble");
  });

  it("LGN_002 - Login account as user with 'locked_out_user' username and valid password", async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.lockedOutUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getErrorElement = await driver.findElement(
      By.xpath(locators.errorBoxAllert)
    );
    const getErrorMessage = await getErrorElement.getText();
    const expectedErrorMessage = await errorMessage.lockedOutUser;

    assert.equal(getErrorMessage, expectedErrorMessage);
  });
});
