const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const userSchema = require('./Routes/userRoutes')
const quizSchema = require('./Routes/quizRoutes')


app.get('/', function (req, res) {
    res.send('welcome to quiz')
})

app.use('/user', userSchema)
app.use('/quiz', quizSchema)
  
app.listen(PORT, () => {
    console.log(`Example app listening on port 3000`)
})