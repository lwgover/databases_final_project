const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/login', (req, res) => {
  console.log(req.body)
  res.send({
    token: 'test123'
  });
});


app.use(bodyParser.json());
app.post('/SearchQuizzes', (req, res) => {
  console.log("request recieved");
  
  

  res.json(/* body */);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));