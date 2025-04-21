require('dotenv').config(); // load .env first
const connection = require('./db'); // db connection after .env is loaded
const mysql = require('mysql2');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5001;

// fill-in-the-blank indicator ID //

app.get('/api/railway/indicator/:id', (req, res) => {
  console.log("HIT: /api/railway/indicator/:indicatorId");
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

      console.log('Rows returned:', results.length);
      console.log(`DB returned ${results.length} rows`);


      // console.log("Sending this data to the frontend:");
      // console.log(JSON.stringify({
      //   title: `Indicator ${indicatorId}, ${latestTimePeriod}`,
      //   rows: results
      // }, null, 2));
      res.json({
        title: `Indicator ${indicatorId}, ${latestTimePeriod}`,
        rows: results
      });
    });
  });
});

// gets value and year data to populate line graph, given borough and indicator //
app.get('/api/railway/trends/:indicatorId/:boroughCode', (req, res) => {
  const { indicatorId, boroughCode } = req.params;

  const sql = `
    SELECT time_period, value
    FROM indicators
    WHERE indicator_id = ?
      AND area_code = ?
    ORDER BY time_period
  `;

  connection.query(sql, [indicatorId, boroughCode], (err, results) => {
    if (err) {
      console.error('❌ Error in borough trends query:', err);
      return res.status(500).json({ error: 'Database error (borough trends)' });
    }

    res.json(results);
  });
});

// gets time series data for a citywide indicator (area code: E12000007)
app.get('/api/railway/trends/city/:indicatorId', (req, res) => {
  const { indicatorId } = req.params;
  console.log('Citywide API hit with indicatorId:', indicatorId);

  const sql = `
    SELECT time_period, value
    FROM indicators
    WHERE indicator_id = ?
      AND area_code = 'E12000007'
    ORDER BY time_period
  `;

  connection.query(sql, [indicatorId], (err, results) => {
    if (err) {
      console.error('❌ Error in city trends query:', err);
      return res.status(500).json({ error: 'Database error (city trends)' });
    }

    res.json(results);
  });
});

app.get('/api/railway/latest-indicators/citywide', (req, res) => {
  const sql = `
    SELECT sub.indicator_id, sub.value, sub.time_period
    FROM (
        SELECT i.indicator_id, i.value, i.time_period,
               ROW_NUMBER() OVER (PARTITION BY i.indicator_id ORDER BY i.time_period DESC) AS rn
        FROM indicators i
        WHERE i.area_code = 'E12000007'
    ) sub
    WHERE sub.rn = 1
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching latest citywide indicators:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

// Gets all values over time for one indicator (London-wide only)
app.get('/api/railway/history/citywide/:indicatorId', (req, res) => {
  const { indicatorId } = req.params;

  const sql = `
    SELECT time_period, value
    FROM indicators
    WHERE indicator_id = ?
      AND area_code = 'E12000007'
    ORDER BY time_period;
  `;

  connection.query(sql, [indicatorId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching citywide indicator history:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});