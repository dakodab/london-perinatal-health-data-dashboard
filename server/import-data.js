// “live link” - downloads API data //


const axios = require('axios');
const fs = require('fs');

const csvUrl = 'https://fingertips.phe.org.uk/api/all_data/csv/by_group_id?child_area_type_id=502&parent_area_type_id=6&group_id=1938133222&parent_area_code=E12000007';

async function downloadCSV() {
  try {
    const response = await axios.get(csvUrl, { responseType: 'stream' });

    // Save the file to disk
    const writer = fs.createWriteStream('indicator-data.csv');
    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log('✅ CSV file downloaded successfully!');
    });

    writer.on('error', (err) => {
      console.error('❌ Error writing CSV file:', err);
    });
  } catch (error) {
    console.error('❌ Failed to download CSV:', error);
  }
}

downloadCSV();