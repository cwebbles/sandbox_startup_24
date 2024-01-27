require('dotenv').config();

const express = require('express');
const path = require('path');

const db = require('./src/fake-db.js');

const app = express();
const PORT = process.env.PORT || 4000;

// Set up middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/db', (req, res) => {
  const results = db.getRouteData();
  console.log(results)
  res.send(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});