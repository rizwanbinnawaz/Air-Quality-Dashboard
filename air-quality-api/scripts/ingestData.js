const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('../config/db');
const Record = require('../models/Record');

// Sample airQuility Data CSV
const csvFilePath = path.join(__dirname, '../data/AirQualityUCI.csv');
console.log('CSV path:', csvFilePath);

const failedRowsLogPath = path.join(__dirname, '../data/failed_rows.log');

const parseValue = (val) => {
  if (!val) return null;
  const num = parseFloat(val.replace(',', '.'));
  return isNaN(num) ? null : num;
};

const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // dd/mm/yyyy
const timePattern = /^\d{2}\.\d{2}\.\d{2}$/; // hh.mm.ss

(async () => {
  await connectDB();

  const records = [];
  let processedCount = 0;
  let failedCount = 0;

  // Clear previous failed log file if exists
  if (fs.existsSync(failedRowsLogPath)) {
    fs.unlinkSync(failedRowsLogPath);
  }

  fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      try {
        const rawDate = row['Date']?.trim();
        const rawTime = row['Time']?.trim();

        if (!rawDate) {
          // Skip empty date rows silently
          return;
        }

        if (!datePattern.test(rawDate)) throw new Error("Invalid date format");
        if (!rawTime || !timePattern.test(rawTime)) throw new Error("Invalid time format");

        const fixedTime = rawTime.replace(/\./g, ':');
        const dateParts = rawDate.split('/');
        const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${fixedTime}`;

        const datetime = new Date(isoDate);
        if (isNaN(datetime.getTime())) throw new Error("Invalid datetime");

        const record = {
          datetime,
          co: parseValue(row['CO(GT)']),
          nmhc: parseValue(row['NMHC(GT)']),
          benzene: parseValue(row['C6H6(GT)']),
          nox: parseValue(row['NOx(GT)']),
          no2: parseValue(row['NO2(GT)']),
          sensors: {
            PT08_S1_CO: parseValue(row['PT08.S1(CO)']),
            PT08_S2_NMHC: parseValue(row['PT08.S2(NMHC)']),
            PT08_S3_NOx: parseValue(row['PT08.S3(NOx)']),
            PT08_S4_NO2: parseValue(row['PT08.S4(NO2)']),
            PT08_S5_O3: parseValue(row['PT08.S5(O3)']),
            T: parseValue(row['T']),
            RH: parseValue(row['RH']),
            AH: parseValue(row['AH'])
          }
        };

        records.push(record);
        processedCount++;
      } catch (err) {
        failedCount++;
        console.error("Validation error:", err.message);
        // Append failed row JSON to log file for later inspection
        fs.appendFileSync(failedRowsLogPath, JSON.stringify(row) + '\n');
      }
    })
    .on('end', async () => {
      console.log(`Finished reading CSV. Processed: ${processedCount}, Failed: ${failedCount}`);

      try {
        await Record.insertMany(records, { ordered: false });
        console.log(`Inserted ${records.length} records.`);
      } catch (err) {
        console.error("Insertion error:", err);
      } finally {
        mongoose.connection.close();
      }
    });
})();
