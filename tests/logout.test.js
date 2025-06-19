const createDriver = require("../resources/driver.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const { errorMessage } = require("../resources/errorMessage.js");
const { expect } = require("chai");
const LoginPage = require("../pages/LoginPage.js");
const InventoryPage = require("../pages/InventoryPage.js");
const AlertComponent = require("../pages/components/AlertComponent.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of the logout feature.", async function () {
  this.timeout(10000);

  let driver;
  let loginPage;
  let inventoryPage;
  let alertComponent;

  before(async () => {
    try {
      driver = await createDriver();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      alertComponent = new AlertComponent(driver);

      await driver.get(BASE_URL);

      await loginPage.login(data.login.standardUser, data.login.password);
      const url = await driver.getCurrentUrl();
      expect(url).to.include("inventory");
    } catch (err) {
      throw err;
    }
  });

  it("TC_LOGOUT_001 - Redirected to the login page after logout account", async () => {
    await inventoryPage.clickLogout();

    const url = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.loginUrl;
    expect(url).to.equal(expectedURL);
  });

  it("TC_LOGOUT_002 - Display an error message when the user clicks the browser back button after logout account", async () => {
    await inventoryPage.clickLogout();

    await driver.navigate().back();

    const message = await alertComponent.getErrorMessageText();
    const expectedMessage = errorMessage.unauthorizedBackNavigation;
    expect(message).to.equal(expectedMessage);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
