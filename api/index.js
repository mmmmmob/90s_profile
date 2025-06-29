module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/guestbook') {
    res.status(200).send('Hello from API!');
  } else {
    res.status(404).send('Not Found');
  }
};
