require('dotenv').config();
const express = require('express');
const app = express();

// --- Custom Middleware: Logs every request ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// --- Parse JSON body ---
app.use(express.json());

// --- Serve static HTML at root (/) ---
app.use(express.static('public'));

// --- GET / ---
app.get('/', (req, res) => {
  res.send("My Week 2 API!");
});

// --- POST /user ---
app.post('/user', (req, res) => {
  const { name, email } = req.body;

  // Error handling (400 for missing data)
  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  res.send(`Hello, ${name}!`);
});

// --- GET /user/:id ---
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
