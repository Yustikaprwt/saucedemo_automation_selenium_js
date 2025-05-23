const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const createDriver = require("../resources/driver.js");
const { locators } = require("../resources/locators.js");
const { data } = require("../resources/data.js");
const { expectedUrl } = require("../resources/expectedUrl.js");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

describe("Test the functionality of cart", async function () {
  this.timeout(60000);

  let driver;

  beforeEach(async () => {
    try {
      driver = await createDriver();
      await driver.get(BASE_URL);

      await driver
        .findElement(By.id(locators.login.username))
        .sendKeys(data.login.standardUser);
      await driver
        .findElement(By.id(locators.login.password))
        .sendKeys(data.login.password);
      await driver.findElement(By.id(locators.login.buttonLogin)).click();

      const getUrl = await driver.getCurrentUrl();
      const getExpectedUrl = expectedUrl.inventoryUrl;

      assert.equal(getUrl, getExpectedUrl);
    } catch (err) {
      throw err;
    }
  });

  it("TC_CART_001 - Cart page is displayed when cart icon is clicked on Inventory page", async () => {
    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.equal(getUrl, url);
  });

  it("TC_CART_002 - User successfully added the product to the cart", async () => {
    await driver.findElement(By.id(locators.products.addTshirtButton)).click();
    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.equal(getUrl, url);

    const getBadgeIcon = await driver.findElement(
      By.xpath(locators.cart.cartBadge)
    );
    const quantityOfCart = await getBadgeIcon.getText();
    const expectedQuantity = "1";
    assert.equal(quantityOfCart, expectedQuantity);

    const getItem = await driver.findElement(
      By.className(locators.cart.cartItem)
    );
    const getItemName = await getItem.getText();

    const expectedItemName = data.products.boltTshirtDetailName;
    assert.ok(getItemName.includes(expectedItemName));
  });

  it("TC_CART_003 - User successfully added multiple product to the cart", async () => {
    await driver
      .findElement(By.id(locators.products.addBackpackButton))
      .click();

    await driver.findElement(By.id(locators.products.addTshirtButton)).click();

    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();

    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.ok(getUrl, url);

    const getBadgeIcon = await driver.findElement(
      By.xpath(locators.cart.cartBadge)
    );
    const getQuantityOfCart = await getBadgeIcon.getText();
    const expectedQuantity = "2";
    assert.equal(getQuantityOfCart, expectedQuantity);

    const getItemList = await driver.findElement(
      By.className(locators.cart.cartItemList)
    );
    const getItemName = await getItemList.getText();
    const backpackItem = data.products.backpackDetailName;
    const tshirtItem = data.products.tshirtDetailName;
    assert.ok(getItemName.includes(backpackItem, tshirtItem));
  });

  it("TC_CART_004 - User successfully added all products from the Inventory page to the cart", async () => {
    await driver
      .findElement(By.id(locators.products.addBackpackButton))
      .click();
    await driver
      .findElement(By.id(locators.products.addBikeLightButton))
      .click();
    await driver.findElement(By.id(locators.products.addTshirtButton)).click();
    await driver
      .findElement(By.id(locators.products.addFleeceJacketButton))
      .click();
    await driver.findElement(By.id(locators.products.addOnesieButton)).click();
    await driver
      .findElement(By.id(locators.products.addRedTshirtButton))
      .click();

    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();
    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.equal(getUrl, url);

    const getBadgeIcon = await driver.findElement(
      By.xpath(locators.cart.cartBadge)
    );
    const getQuantityOfCart = await getBadgeIcon.getText();
    const expectedQuantity = "6";
    assert.equal(getQuantityOfCart, expectedQuantity);

    const getCartItems = await driver.findElements(
      By.xpath(locators.products.detailProductsName)
    );
    const expectedCartItems = [
      data.products.backpackDetailName,
      data.products.bikeLightDetailName,
      data.products.boltTshirtDetailName,
      data.products.fleeceJacketDetailName,
      data.products.onesieDetailName,
      data.products.tshirtDetailName,
    ];

    const actualCartItems = [];
    for (items of getCartItems) {
      const itemName = await items.getText();
      actualCartItems.push(itemName);
    }
    assert.deepStrictEqual(actualCartItems, expectedCartItems);
  });

  it("TC_CART_005 - User successfully removed a product from the Cart page", async () => {
    await driver
      .findElement(By.id(locators.products.addBackpackButton))
      .click();

    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();
    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.equal(getUrl, url);

    const getBadgeIcon = await driver.findElement(
      By.xpath(locators.cart.cartBadge)
    );
    const getQuantityOfCart = await getBadgeIcon.getText();
    const expectedQuantity = "1";
    assert.equal(getQuantityOfCart, expectedQuantity);

    await driver
      .findElement(By.id(locators.products.removeBackpackButton))
      .click();

    await driver.wait(async () => {
      const badgeElements = await driver.findElements(
        By.xpath(locators.cart.cartBadge)
      );
      return badgeElements.length === 0;
    }, 10000);
  });

  it("TC_CART_006 - Display a 'Continue Shopping' button to return to the Inventory page", async () => {
    await driver
      .findElement(By.id(locators.products.addBackpackButton))
      .click();

    await driver.findElement(By.xpath(locators.cart.cartIcon)).click();
    const getUrl = await driver.getCurrentUrl();
    const url = expectedUrl.cartPage;
    assert.equal(getUrl, url);

    await driver
      .findElement(By.id(locators.button.continueShoppingButton))
      .click();

    const getCurrentUrl = await driver.getCurrentUrl();
    const getExpectedUrl = expectedUrl.inventoryUrl;
    assert.equal(getCurrentUrl, getExpectedUrl);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
