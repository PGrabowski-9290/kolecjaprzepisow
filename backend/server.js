const { application } = require('express');
const express = require('express');

const app = express();

app.listen(3001, ()=> {
  console.log('listening on http://localhost:3001');
});