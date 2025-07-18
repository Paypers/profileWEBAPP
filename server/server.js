const express = require('express');
const app = express();
const port = 5000; // A common port for backend servers

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});