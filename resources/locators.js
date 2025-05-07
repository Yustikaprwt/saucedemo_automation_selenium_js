export const locators = {
  username: "user-name",
  password: "password",
  buttonLogin: "login-button",
  dashboardTitle: '//*[@data-test="title"]',
  errorBoxAllert: '//*[@data-test="error"]',
  addBackpackButton: "add-to-cart-sauce-labs-backpack",
  removeBackpackButton: "remove-sauce-labs-backpack",
  addTshirtButton: "add-to-cart-sauce-labs-bolt-t-shirt",
  detailProductName: '//*[@data-test="inventory-item-name"]',
  detailPrice: '//*[@data-test="inventory-item-price"]',
};

export const data = {
  standardUser: "standard_user",
  lockedOutUser: "locked_out_user",
  problemUser: "problem_user",
  glitchUser: "performance_glitch_user",
  errorUser: "error_user",
  visualUser: "visual_user",
  invalidUsername: "wrong_username",
  password: "secret_sauce",
  invalidPassword: "wrong_password",
  dashboardTitle: "Products",
  removeProductText: "Remove",
  addTocartTextButton: "Add to cart",
  backpackDetailName: "Sauce Labs Backpack",
  bikeLightDetailName: "Sauce Labs Bike Light",
  boltTshirtDetailName: "Sauce Labs Bolt T-Shirt",
  fleeceJacketDetailName: "Sauce Labs Fleece Jacket",
  onesieDetailName: "Sauce Labs Onesie",
  tshirtDetailName: "Test.allTheThings() T-Shirt (Red)",
  backpackPrice: "$29.99",
  bikeLightPrice: "$9.99",
  boltTshirtPrice: "$15.99",
  fleeceJacketPrice: "$49.99",
  onesiePrice: "$7.99",
  tshirtPrice: "$15.99",
};

export const errorMessage = {
  lockedOutUser: "Epic sadface: Sorry, this user has been locked out.",
  invalidInput:
    "Epic sadface: Username and password do not match any user in this service",
  requiredPassword: "Epic sadface: Password is required",
  requiredUsername: "Epic sadface: Username is required",
};

export const expectedUrl = {
  dashboardUrl: "https://www.saucedemo.com/inventory.html",
};
