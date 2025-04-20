require('dotenv').config(); // load .env first
const connection = require('./db'); // db connection after .env is loaded
const mysql = require('mysql2');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5001;


//not currently in use but keep //
// app.get('/api/fingertips', async (req, res) => {
  // try {

  // console.log("Received request for /api/fingertips");
   // // Makes a request to the Fingertips API, Waits for the data to come back //
   // const response = await axios.get('https://fingertips.phe.org.uk/api/latest_data/all_indicators_in_profile_group_for_child_areas?profile_id=105&group_id=1938133222&area_type_id=502&parent_area_code=E12000007');
    // // this GET is for data for all Pregnancy and Birth indicators for all London Boroughs. //
    // // Profile_ID=105 
    // // Profile_Name=Child and Maternal Health 
    // // Group_ID=1938133222 
    // // Group_Name=Pregnancy and Birth 
    // // area_type_id=502 (AreaType=Counties & UAs (from Apr 2023), AreaTypeFull=Upper tier local authorities (post 4/23), corresponds to London boroughs)
    // // parent_area_code=E12000007 (AreaTypeID=6, AreaType=Region, AreaTypeFull=Government Office Region, E12000007 corresponds to London region //

    // // Sends the actual data to frontend
    // res.json(response.data);
  // } catch (error) {
    // console.error('Error fetching Fingertips data:', error);
    // res.status(500).json({ error: 'Failed to fetch data from Fingertips API' });
  // }
// });



// GET /api/data/railway - return all indicators - SOURCE: MySQL (Railway) via Express backend //
// first 100 rows - good for testing and exploring // 


// railway //
app.get('/api/data/railway', (req, res) => {
  // error handling (so server stops crashing every time there's a database issue)
  connection.query('SELECT * FROM indicators LIMIT 100', (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch data from DB' });
    } else {
      res.json(results);
    }
  });
});

// Debug route - count rows in the indicators table - SOURCE: MySQL (Railway) via Express backend //
app.get('/api/railway/debug-count', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM indicators', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).json({ error: 'Failed to query database' });
    }
    res.json({ rowCount: results[0].count });
  });
});

// London: Early Access to Maternity Care (Indicator 94121) - SOURCE: MySQL (Railway) via Express backend // 
app.get('/api/railway/early-access', (req, res) => {
  // "hard‑code" the 32 London borough codes
  const boroughCodes = [
    'E09000002','E09000003','E09000004','E09000005','E09000006','E09000007',
    'E09000008','E09000009','E09000010','E09000011','E09000012','E09000013',
    'E09000014','E09000015','E09000016','E09000017','E09000018','E09000019',
    'E09000020','E09000021','E09000022','E09000023','E09000024','E09000025',
    'E09000026','E09000027','E09000028','E09000029','E09000030','E09000031',
    'E09000032','E09000033'
  ];

  // single most recent time_period for indicator 94121
  const latestTPsql = `
    SELECT MAX(time_period) AS tp
      FROM indicators
     WHERE indicator_id = ?
  `;

  connection.query(latestTPsql, [94121], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const latest = rows[0].tp;

    // pulls area_name, value (removed recent_trend, and compared_to_england)
    const dataSql = `
      SELECT
        area_name,
        value
      FROM indicators
      WHERE
        indicator_id = ?
        AND time_period = ?
        AND area_code IN (?)
    `;

    connection.query(dataSql, [94121, latest, boroughCodes], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      // Return both title and row data //
      res.json({
        title: `Early Access to Maternity Care, ${latest}`,
        rows: results
      });
    });
  });
});

// fill-in-the-blank indicator ID
app.get('/api/railway/indicator/:id', (req, res) => {
  const indicatorId = req.params.id;
  console.log('Requested indicator:', indicatorId);

  const latestTPsql = `
    SELECT MAX(time_period) AS latest
    FROM indicators
    WHERE indicator_id = ?
  `;

  connection.query(latestTPsql, [indicatorId], (err, rows) => {
    if (err) {
      console.error('Error getting latest time period:', err);
      return res.status(500).json({ error: 'Database error (latest time)' });
    }

    const latestTimePeriod = rows[0].latest;
    console.log('Latest time period:', latestTimePeriod);

    const boroughCodes = [
      'E09000001', 'E09000002', 'E09000003', 'E09000004', 'E09000005',
      'E09000006', 'E09000007', 'E09000008', 'E09000009', 'E09000010',
      'E09000011', 'E09000012', 'E09000013', 'E09000014', 'E09000015',
      'E09000016', 'E09000017', 'E09000018', 'E09000019', 'E09000020',
      'E09000021', 'E09000022', 'E09000023', 'E09000024', 'E09000025',
      'E09000026', 'E09000027', 'E09000028', 'E09000029', 'E09000030',
      'E09000031', 'E09000032', 'E09000033'
    ];

    const dataSql = `
      SELECT area_name, value
      FROM indicators
      WHERE indicator_id = ?
        AND time_period = ?
        AND area_code IN (?)
    `;

    connection.query(dataSql, [indicatorId, latestTimePeriod, boroughCodes], (err, results) => {
      if (err) {
        console.error('Error fetching indicator data:', err);
        return res.status(500).json({ error: 'Database error (data query)' });
      }

      console.log('📊 Rows returned:', results.length);

      res.json({
        title: `Indicator ${indicatorId}, ${latestTimePeriod}`,
        rows: results
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});