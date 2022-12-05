const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const path = require('path');
const dbPath = path.resolve(__dirname, 'database.js')
const database = require(dbPath);

app.use(cors());

app.use('/login', (req, res) => {
  console.log(req)
  res.send({
    token: 'test123'
  });
});


app.use(bodyParser.json());
app.post('/SearchQuizzes', (req, res) => {
  console.log("request recieved");
  
  let searchTerm = req.body;
  let results = database.searchQuizNames(searchTerm);
  
  if (results === undefined) {
    results = null;
  }
  
  res.json(results);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));