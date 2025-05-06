export const locators = {
  username: "user-name",
  password: "password",
  buttonLogin: "login-button",
  dashboardTitle: '//*[@data-test="title"]',
  errorBoxAllert: '//*[@data-test="error"]',
  addBackpackButton: "add-to-cart-sauce-labs-backpack",
  removeBackpackButton: "remove-sauce-labs-backpack",
};

export const data = {
  standardUser: "standard_user",
  lockedOutUser: "locked_out_user",
  problemUser: "problem_user",
  password: "secret_sauce",
  invalidPassword: "wrong_password",
  dashboardTitle: "Products",
  removeProductText: "Remove",
};

export const errorMessage = {
  lockedOutUser: "Epic sadface: Sorry, this user has been locked out.",
};

export const expectedUrl = {
  dashboardUrl: "https://www.saucedemo.com/inventory.html",
};
