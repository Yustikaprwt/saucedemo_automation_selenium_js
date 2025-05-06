export const locators = {
  username: "user-name",
  password: "password",
  buttonLogin: "login-button",
  dashboardTitle: '//*[@data-test="title"]',
  errorBoxAllert: '//*[@data-test="error"]',
  addBackpackButton: "add-to-cart-sauce-labs-backpack",
  removeBackpackButton: "remove-sauce-labs-backpack",
  addTshirtButton: "add-to-cart-sauce-labs-bolt-t-shirt",
};

export const data = {
  standardUser: "standard_user",
  lockedOutUser: "locked_out_user",
  problemUser: "problem_user",
  glitchUser: "performance_glitch_user",
  errorUser: "error_user",
  visualUser: "visual_user",
  password: "secret_sauce",
  invalidPassword: "wrong_password",
  dashboardTitle: "Products",
  removeProductText: "Remove",
  addTocartTextButton: "Add to cart",
};

export const errorMessage = {
  lockedOutUser: "Epic sadface: Sorry, this user has been locked out.",
  invalidPassword:
    "Epic sadface: Username and password do not match any user in this service",
  requiredPassword: "Epic sadface: Password is required",
};

export const expectedUrl = {
  dashboardUrl: "https://www.saucedemo.com/inventory.html",
};
