export const locators = {
  login: {
    username: "user-name",
    password: "password",
    buttonLogin: "login-button",
  },

  products: {
    addBackpackButton: "add-to-cart-sauce-labs-backpack",
    addBikeLightButton: "add-to-cart-sauce-labs-bike-light",
    addTshirtButton: "add-to-cart-sauce-labs-bolt-t-shirt",
    addFleeceJacketButton: "add-to-cart-sauce-labs-fleece-jacket",
    addOnesieButton: "add-to-cart-sauce-labs-onesie",
    addRedTshirtButton: "add-to-cart-test.allthethings()-t-shirt-(red)",
    removeBackpackButton: "remove-sauce-labs-backpack",
    detailProductsName: '[data-test="inventory-item-name"]',
    detailPrice: '[data-test="inventory-item-price"]',
    detailDesc: '[data-test="inventory-item-desc"]',
    detailProductsImg: "inventory_item_img",
    taxLabel: '[data-test="tax-label"]',
  },

  cart: {
    cartIcon: '[data-test="shopping-cart-link"]',
    cartItem: "cart_item_label",
    cartItemList: "cart_list",
    cartBadge: '[data-test="shopping-cart-badge"]',
  },

  button: {
    backToProductsButton: '[data-test="back-to-products"]',
    continueShoppingButton: "continue-shopping",
    checkoutButton: "checkout",
    continueCheckout: "continue",
    cancelCheckout: "cancel",
    finishPaymentButton: "finish",
    burgerMenuButton: "react-burger-menu-btn",
  },

  title: {
    inventoryTitle: '[data-test="title"]',
  },

  message: {
    errorBoxAllert: '[data-test="error"]',
    completeOrder: '[data-test="complete-header"]',
  },

  sortedDropdown: {
    sortedIcon: '[data-test="product-sort-container"]',
    sortAscByName: '[value="az"]',
    sortDescByName: '[value="za"]',
    sortAscByPrice: '[value="lohi"]',
    sortDescByPrice: '[value="hilo"]',
  },

  inputField: {
    firstNameField: "first-name",
    lastNameField: "last-name",
    zipCodeField: "postal-code",
  },

  optionLink: {
    logoutLink: "logout_sidebar_link",
  },
};
