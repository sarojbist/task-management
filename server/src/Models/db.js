const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

async function connectDatabase() {
    await mongoose.connect(DB_URL);
}
module.exports = connectDatabase;