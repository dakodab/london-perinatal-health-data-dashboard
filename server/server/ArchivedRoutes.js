// ARCHIVED SERVER ROUTES — not currently in use
// Move routes here before deleting, in case needed later
// from server/index.js //
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