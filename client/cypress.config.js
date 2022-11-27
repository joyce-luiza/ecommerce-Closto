const { defineConfig } = require("cypress");
const { Client } = require("pg");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on("task", {
                async connectDB(query) {
                    const client = new Client({
                        user: "postgres",
                        password: "super123",
                        host: "localhost",
                        database: "closto",
                        ssl: false,
                        port: 5000,
                    });
                    await client.connect();
                    const res = await client.query(query);
                    await client.end();
                    return res.rows;
                },
            });
        },
    },
});
