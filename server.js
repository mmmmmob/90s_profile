
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const guestbookPath = path.join(__dirname, 'guestbook.json');

// Function to read guestbook entries
const readGuestbook = () => {
  try {
    const data = fs.readFileSync(guestbookPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write to the guestbook
const writeGuestbook = (data) => {
  fs.writeFileSync(guestbookPath, JSON.stringify(data, null, 2));
};

app.get('/guestbook', (req, res) => {
  res.json(readGuestbook());
});

app.post('/guestbook', (req, res) => {
  const newEntry = {
    name: req.body.name,
    message: req.body.message,
    date: new Date().toLocaleString(),
  };
  const entries = readGuestbook();
  entries.push(newEntry);
  writeGuestbook(entries);
  res.status(201).json(newEntry);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
