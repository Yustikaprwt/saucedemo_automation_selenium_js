export const locators = {
  username: "user-name",
  password: "password",
  buttonLogin: "login-button",
  dashboardTitle: '//*[@data-test="title"]',
  errorBoxAllert: '//*[@data-test="error"]',
  addBackpackButton: "add-to-cart-sauce-labs-backpack",
  removeBackpackButton: "remove-sauce-labs-backpack",
  addTshirtButton: "add-to-cart-sauce-labs-bolt-t-shirt",
  detailProductsName: '//*[@data-test="inventory-item-name"]',
  detailPrice: '//*[@data-test="inventory-item-price"]',
  detailDesc: '//*[@data-test="inventory-item-desc"]',
  detailProductsImg: "inventory_item_img",
  onesieImage: '//*[@data-test="item-2-img-link"]',
  backToProductsButton: '//*[@data-test="back-to-products"]',
  sortedIcon: '//*[@data-test="product-sort-container"]',
  sortAscByName: '//*[@value="az"]',
  sortDescByName: '//*[@value="za"]',
  sortAscByPrice: '//*[@value="lohi"]',
  sortDescByPrice: '//*[@value="hilo"]',
  cartIcon: '//*[@data-test="shopping-cart-link"]',
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
  backpackDesc:
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  backToProductsButton: "Back to products",
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
  backpackProductUrl: "https://www.saucedemo.com/inventory-item.html?id=4",
  oneSieProductUrl: "https://www.saucedemo.com/inventory-item.html?id=2",
  cartPage: "https://www.saucedemo.com/cart.html",
};
