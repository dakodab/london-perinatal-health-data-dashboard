const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5001;

// Homepage
app.get('/api/fingertips', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <h1>London Perinatal Health</h1>
    <p><a href="/api/tables">Tables</a></p>
    <p><a href="/api/map">Map</a></p>
    <p><a href="/api/resources">Resources</a></p>
  `);
});

// Tables Page
app.get('/api/tables', (req, res) => {
  res.sendFile(__dirname + '/public/tables.html');
});

// Map Page
app.get('/api/map', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <h2>Map Page</h2>
    <p>This will display a map using D3.js</p>
    <a href="/api/fingertips">Back to Home</a>
  `);
});

// Resources Page
app.get('/api/resources', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <h2>Resources Page</h2>
    <p>This will display additional resources.</p>
    <a href="/api/fingertips">Back to Home</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});