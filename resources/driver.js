const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();

options.addArguments("--disable-save-password-bubble");
options.addArguments("--incognito");

const createDriver = async () => {
  return await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
};

module.exports = createDriver;
