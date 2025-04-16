// chains 2 things: 1. downloads CSV, 2. loads CSV into database

console.log('🔄 Starting data refresh...'); // debugging - should always see “🔄 Starting data refresh…” right away if it begins. If you don’t see that line, it didn’t even get going.

const { exec } = require('child_process');

exec('node server/import-data.js && node server/load-to-db.js', (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Error during refresh:', err);
    return;
  }
  console.log('✅ Data refresh complete!');
  console.log(stdout);
});