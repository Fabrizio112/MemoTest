const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: { "runMode": 2, "openMode": 0 },
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
