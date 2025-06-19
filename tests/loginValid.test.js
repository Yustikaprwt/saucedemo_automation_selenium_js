const { expect } = require("chai");
const createDriver = require("../resources/driver.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
const LoginPage = require("../pages/LoginPage.js");
const InventoryPage = require("../pages/InventoryPage.js");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Login with valid credentials", async function () {
  this.timeout(10000);

  let driver;
  let loginPage;
  let inventoryPage;

  before(async function () {
    driver = await createDriver();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get(BASE_URL);

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  it("TC_LGN_001 - Login account as user with 'standard_user' username and valid password", async () => {
    await loginPage.login(data.login.standardUser, data.login.password);

    const getURL = await driver.getCurrentUrl();
    const expectedURL = expectedUrl.inventoryUrl;

    expect(getURL).to.equal(expectedURL);

    const inventoryTitle = await inventoryPage.getInventoryTitle();
    const expectedTitle = data.title.inventoryTitle;

    expect(inventoryTitle).to.include(expectedTitle);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
