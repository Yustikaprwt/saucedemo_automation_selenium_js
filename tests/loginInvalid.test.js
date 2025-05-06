const { By, until } = require("selenium-webdriver");
const driver = require("../resources/driver.js");
const assert = require("assert");
const {
  locators,
  data,
  errorMessage,
  expectedUrl,
} = require("../resources/locators.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with invalid credentials", async function () {
  this.timeout(30000);

  before(async () => {
    console.log("Running test login with invalid credentials");
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

  it("LGN_003 - Login account as user with 'problem_user' username and valid password", async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.problemUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const getExpectedUrl = await expectedUrl.dashboardUrl;
    assert.equal(getUrl, getExpectedUrl);

    const addBackpackButton = await driver.wait(
      until.elementIsVisible(
        await driver.wait(
          until.elementLocated(By.id(locators.addBackpackButton))
        )
      ),
      30000
    );

    await addBackpackButton.click();

    await driver.wait(async () => {
      const removeButton = await driver.findElement(
        By.id(locators.removeBackpackButton)
      );
      const text = await removeButton.getText();
      return text === "Remove";
    }, 30000);

    const removeBackpackButton = await driver.findElement(
      By.id(locators.removeBackpackButton)
    );
    await removeBackpackButton.click();

    await driver.wait(async () => {
      const buttonText = await driver.findElement(
        By.id(locators.removeBackpackButton)
      );
      const text = await buttonText.getText();
      return text === "Remove";
    }, 30000);
  });

  it("LGN_004 - Login account as user with 'performance_glitch_user' username and valid password", async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.glitchUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);

    const navigationStart = Date.now();

    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = await expectedUrl.dashboardUrl;
    assert.equal(getUrl, dashboardUrl);

    const navigationEnd = Date.now();
    const loadPageDuration = navigationEnd - navigationStart;

    assert.ok(loadPageDuration > 5000);
  });

  it("LGN_005 - Login account as user with 'error_user' username and valid password", async () => {
    await driver.get(BASE_URL);

    await driver.findElement(By.id(locators.username)).sendKeys(data.errorUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = await expectedUrl.dashboardUrl;
    assert.equal(getUrl, dashboardUrl);

    const addTshirtButton = await driver.findElement(
      By.id(locators.addTshirtButton)
    );

    await addTshirtButton.click();

    const afterClickText = await addTshirtButton.getText();
    const expectedAfterClickText = await data.addTocartTextButton;

    assert.equal(afterClickText, expectedAfterClickText);
  });

  it("LGN_006 - Login account as user with 'visual_user' username and valid password", async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.visualUser);
    await driver.findElement(By.id(locators.password)).sendKeys(data.password);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getUrl = await driver.getCurrentUrl();
    const dashboardUrl = await expectedUrl.dashboardUrl;
    assert.equal(getUrl, dashboardUrl);
  });

  it("LGN_007 - Login account as user with 'standard_user' username but with incorect password", async () => {
    await driver.get(BASE_URL);

    await driver
      .findElement(By.id(locators.username))
      .sendKeys(data.standardUser);
    await driver
      .findElement(By.id(locators.password))
      .sendKeys(data.invalidPassword);
    await driver.findElement(By.id(locators.buttonLogin)).click();

    const getErrorAlertBox = await driver.findElement(
      By.xpath(locators.errorBoxAllert)
    );
    const getErrorText = await getErrorAlertBox.getText();

    const expectedErrorText = await errorMessage.invalidPassword;
    assert.equal(getErrorText, expectedErrorText);
  });

  after(async () => await driver.close());
});
