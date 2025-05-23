const { By, until } = require("selenium-webdriver");
const createDriver = require("../resources/driver.js");
const assert = require("assert");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { errorMessage } = require("../resources/errorMessage.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with invalid credentials", async function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await createDriver();
  });

  beforeEach(async () => {
    try {
      await driver.get(BASE_URL);
    } catch (err) {
      throw err;
    }
  });

  it("TC_LGN_002 - Login account as user with 'locked_out_user' username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.lockedOutUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getErrorElement = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorMessage = await getErrorElement.getText();
    const expectedErrorMessage = errorMessage.lockedOutUser;

    assert.equal(getErrorMessage, expectedErrorMessage);
  });

  it("TC_LGN_003 - Login account as user with 'problem_user' username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.problemUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.inventoryUrl;
    assert.equal(getUrl, getExpectedUrl);

    const addBackpackButton = await driver.wait(
      until.elementIsVisible(
        await driver.wait(
          until.elementLocated(By.id(locators.products.addBackpackButton))
        )
      ),
      30000
    );

    await addBackpackButton.click();

    await driver.wait(async () => {
      const removeButton = await driver.findElement(
        By.id(locators.products.removeBackpackButton)
      );
      const text = await removeButton.getText();
      return text === "Remove";
    }, 30000);

    const removeBackpackButton = await driver.findElement(
      By.id(locators.products.removeBackpackButton)
    );
    await removeBackpackButton.click();

    await driver.wait(async () => {
      const buttonText = await driver.findElement(
        By.id(locators.products.removeBackpackButton)
      );
      const text = await buttonText.getText();
      return text === "Remove";
    }, 30000);
  });

  it("TC_LGN_004 - Login account as user with 'performance_glitch_user' username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.glitchUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);

    const navigationStart = Date.now();

    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = expectedUrl.inventoryUrl;
    assert.equal(getUrl, dashboardUrl);

    const navigationEnd = Date.now();
    const loadPageDuration = navigationEnd - navigationStart;

    assert.ok(loadPageDuration > 5000);
  });

  it("TC_LGN_005 - Login account as user with 'error_user' username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.errorUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = expectedUrl.inventoryUrl;
    assert.equal(getUrl, dashboardUrl);

    const addTshirtButton = await driver.findElement(
      By.id(locators.products.addTshirtButton)
    );

    await addTshirtButton.click();

    const afterClickText = await addTshirtButton.getText();
    const expectedAfterClickText = data.products.addTocartTextButton;

    assert.equal(afterClickText, expectedAfterClickText);
  });

  it("TC_LGN_006 - Login account as user with 'visual_user' username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.visualUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = expectedUrl.inventoryUrl;
    assert.equal(getUrl, dashboardUrl);
  });

  it("TC_LGN_007 - Login account as user with 'standard_user' username but with incorect password", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.standardUser);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.invalidPassword);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getErrorAlertBox = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorText = await getErrorAlertBox.getText();

    const expectedErrorText = errorMessage.invalidInput;
    assert.equal(getErrorText, expectedErrorText);
  });

  it("TC_LGN_008 - Login account as user using 'standard_user' username and empty password field", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.standardUser);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getErrorAlertBox = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorText = await getErrorAlertBox.getText();

    const expectedErrorText = errorMessage.requiredPassword;
    assert.equal(getErrorText, expectedErrorText);
  });

  it("TC_LGN_009 - Login account as user by input an invalid username", async () => {
    await driver
      .findElement(By.id(locators.login.username))
      .sendKeys(data.login.invalidUsername);
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getErrorAlertBox = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorText = await getErrorAlertBox.getText();

    const expectedErrorText = errorMessage.invalidInput;
    assert.equal(getErrorText, expectedErrorText);
  });

  it("TC_LGN_010 - Login account as user with an empty username and valid password", async () => {
    await driver
      .findElement(By.id(locators.login.password))
      .sendKeys(data.login.password);
    await driver.findElement(By.id(locators.login.buttonLogin)).click();

    const getErrorAlertBox = await driver.findElement(
      By.xpath(locators.message.errorBoxAllert)
    );
    const getErrorMessage = await getErrorAlertBox.getText();

    const expectedErrorMessage = errorMessage.requiredUsername;
    assert.equal(getErrorMessage, expectedErrorMessage);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
