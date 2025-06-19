const createDriver = require("../resources/driver.js");
const { expect } = require("chai");
const { data } = require("../resources/data.js");
const { errorMessage } = require("../resources/errorMessage.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const LoginPage = require("../pages/LoginPage.js");
const InventoryPage = require("../pages/InventoryPage.js");
const AlertComponent = require("../pages/components/AlertComponent.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with invalid credentials", async function () {
  this.timeout(10000);

  let driver;
  let loginPage;
  let inventoryPage;
  let alertComponent;

  beforeEach(async () => {
    driver = await createDriver();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get(BASE_URL);

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    alertComponent = new AlertComponent(driver);
  });

  it("TC_LGN_002 - Login account as user with 'locked_out_user' username and valid password", async () => {
    await loginPage.login(data.login.lockedOutUser, data.login.password);

    const errorMessageText = await alertComponent.getErrorMessageText();
    const expectedErrorMessage = errorMessage.lockedOutUser;

    expect(errorMessageText).to.equal(expectedErrorMessage);
  });

  it("TC_LGN_003 - Login account as user with 'problem_user' username and valid password", async () => {
    await loginPage.login(data.login.problemUser, data.login.password);

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;
    expect(getURL).to.equal(expectedURL);

    await inventoryPage.doubleClickBackpackButton();

    const buttonText = await inventoryPage.getRemoveButtonText();

    expect(buttonText).to.equal("Remove");
  });

  it("TC_LGN_004 - Login account as user with 'performance_glitch_user' username and valid password", async function () {
    this.timeout(6000);

    const startTime = Date.now();

    await loginPage.login(data.login.glitchUser, data.login.password);
    await inventoryPage.getInventoryTitle();

    const endTime = Date.now();
    const durationToLoad = endTime - startTime;

    expect(durationToLoad).to.be.greaterThan(5000);
  });

  it("TC_LGN_005 - Login account as user with 'error_user' username and valid password", async () => {
    await loginPage.login(data.login.errorUser, data.login.password);

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;

    expect(getURL).to.equal(expectedURL);

    const buttonText = await inventoryPage.getAddToCartText();
    const expectedText = data.products.addTocartTextButton;

    expect(buttonText).to.equal(expectedText);
  });

  it("TC_LGN_006 - Login account as user with 'visual_user' username and valid password", async () => {
    await loginPage.login(data.login.visualUser, data.login.password);

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;
    expect(getURL).to.equal(expectedURL);
  });

  it("TC_LGN_007 - Login account as user with 'standard_user' username but with incorect password", async () => {
    await loginPage.login(data.login.standardUser, data.login.invalidPassword);

    const errorMessageText = await alertComponent.getErrorMessageText();
    const expectedErrorMessage = errorMessage.invalidInput;

    expect(errorMessageText).to.equal(expectedErrorMessage);
  });

  it("TC_LGN_008 - Login account as user using 'standard_user' username and empty password field", async () => {
    await loginPage.loginWithEmptyPassword(data.login.standardUser);

    const errorMessageText = await alertComponent.getErrorMessageText();
    const expectedErrorText = errorMessage.requiredPassword;

    expect(errorMessageText).to.equal(expectedErrorText);
  });

  it("TC_LGN_009 - Login account as user by input an invalid username", async () => {
    await loginPage.login(data.login.invalidUsername, data.login.password);

    const errorMessageText = await alertComponent.getErrorMessageText();
    const expectedErrorText = errorMessage.invalidInput;

    expect(errorMessageText).to.equal(expectedErrorText);
  });

  it("TC_LGN_010 - Login account as user with an empty username and valid password", async () => {
    await loginPage.loginWithEmptyUsername(data.login.password);

    const errorMessageText = await alertComponent.getErrorMessageText();
    const expectedErrorMessage = errorMessage.requiredUsername;

    expect(errorMessageText).to.equal(expectedErrorMessage);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
