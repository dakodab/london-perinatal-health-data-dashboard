const mysql = require('mysql2');

// Set up the connection details
const connection = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'JJBkzWrnivKNCyEBPgZAzOpzjJBxIBlb',
  database: 'railway',
  port: 30884
});

// Connect and run a test query
connection.connect(err => {
  if (err) {
    console.error('❌ Connection error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL');

  connection.query('SELECT COUNT(*) AS count FROM indicators', (err, results) => {
    if (err) {
      console.error('❌ Query error:', err.message);
    } else {
      console.log('📊 Total rows in indicators table:', results[0].count);
    }

    connection.end(); // Always end the connection!
  });
});