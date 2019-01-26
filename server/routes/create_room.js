var express = require('express');
var router = express.Router();
const { generateId } = require('../utils/utils');

router.get('/', (req, res) => {
  res.send(`alsdfjalksjflas`)
})

router.post('/', (req, res) => {

    console.log('New room created!');
    const sessionId = generateId();
    res.send(`Successfully created room with ID ${sessionId}`);
    
  });


module.exports = router;


