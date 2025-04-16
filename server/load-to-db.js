// reads indicator-data.csv, "parses" each row, and inserts the selected fields (cells) into the MySQL database (db)

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Set up MySQL connection
const connection = mysql.createConnection({
    host: 'ballast.proxy.rlwy.net',
    user: 'root',
    password: 'JJBkzWrnivKNCyEBPgZAzOpzjJBxIBlb',
    database: 'railway',
    port: 30884
  });

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Read and insert CSV data
const results = [];
fs.createReadStream(path.join(__dirname, 'indicator-data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    const value = row['Value'];

    // Skip rows with empty or non-numeric value
    if (value === '' || isNaN(parseFloat(value))) {
      return;
    }

    results.push([
      row['Indicator ID'],
      row['Area Code'],
      row['Area Name'],
      row['Time period'],
      parseFloat(value)
    ]);
  })
  .on('end', () => {
    console.log(`📄 Parsed ${results.length} rows`);

    const sql = `
      INSERT INTO indicators (indicator_id, area_code, area_name, time_period, value)
      VALUES ?
    `;

    connection.query(sql, [results], (err) => {
      if (err) {
        console.error('❌ Batch insert error:', err.message);
      } else {
        console.log('✅ All data inserted successfully');
      }
      connection.end();
    });
  });
