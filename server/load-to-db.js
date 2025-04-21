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
      console.warn(`⏩ Skipping row: ${row['Indicator ID']} / ${row['Area Code']} / ${row['Time period']} — invalid value: "${value}"`);
      return;
    }

    if (row['Area Code'].trim() === 'E12000007') {
      console.log('✅ Found citywide row for', row['Indicator ID'], row['Time period']);
    }

    results.push([
      row['Indicator ID'].trim(), // trim removes white space 
      row['Area Code'].trim(),
      row['Area Name'].trim(),
      row['Time period'].trim(),
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
