const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const Record = require('../models/Record');

(async () => {
  try {
    await connectDB();

    const result = await Record.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} records from the database.`);

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error clearing records:', err);
    mongoose.connection.close();
    process.exit(1);
  }
})();
