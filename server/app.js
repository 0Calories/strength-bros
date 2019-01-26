const express = require('express');
const { generateId } = require('./utils/utils');

const app = express();
const port = 6969;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/create', (req, res) => {
  console.log('New room created!');
  const sessionId = generateId();
  res.send(`Successfully created room with ID ${sessionId}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));