const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const path = require('path');
const dbPath = path.resolve(__dirname, 'database.js')
const database = require(dbPath);

app.use(cors());
app.use(bodyParser.json());

app.use('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.username)
  console.log(req.body.password)

  if(database.checkUserPassword(req.body.username,req.body.password)){  //user and password
    res.send({
      user: "lwgover"
    });
  }else{
    res.send({
      user: "invalid User"
    });
  }
});


app.all('/SearchQuizzes', (req, res) => {
  console.log("request recieved");

  let searchTerm = req.body.searchTerm;
  let results = database.searchQuizNames(searchTerm);

  if (results === undefined) {
    results = null;
  }

  res.json(results);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));