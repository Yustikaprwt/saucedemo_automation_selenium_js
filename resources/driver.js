const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();

options.addArguments("--disable-save-password-bubble");
options.addArguments("--incognito");

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

module.exports = driver;
