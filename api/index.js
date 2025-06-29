const express = require('express');
const { createClient } = require('@vercel/kv');

const app = express();

app.use(express.json());

// Initialize Vercel KV client
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const GUESTBOOK_KEY = 'guestbook_entries';

// Function to read guestbook entries from KV
const readGuestbook = async () => {
  try {
    const data = await kv.lrange(GUESTBOOK_KEY, 0, -1);
    return data || [];
  } catch (error) {
    console.error('Error reading guestbook from KV:', error);
    return [];
  }
};

// Function to write a new entry to KV
const writeGuestbookEntry = async (entry) => {
  try {
    await kv.rpush(GUESTBOOK_KEY, entry);
  } catch (error) {
    console.error('Error writing guestbook entry to KV:', error);
  }
};

app.get('/guestbook', async (req, res) => {
  const entries = await readGuestbook();
  res.json(entries);
});

app.post('/guestbook', async (req, res) => {
  const newEntry = {
    name: req.body.name,
    message: req.body.message,
    date: new Date().toLocaleString(),
  };
  await writeGuestbookEntry(newEntry);
  res.status(201).json(newEntry);
});

module.exports = app;