const { defineConfig } = require("cypress");

const db = require("../server/src/database");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on("task", {
                "defaults:db": () => {
                    return db.seed("defaults");
                },
            });
        },
    },
});
