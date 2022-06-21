const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./configs/corsOptions');
require('dotenv').config();

const credentials = require('./middleware/credentials');
const recipesRoute = require('./routes/recipesRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const port = process.env.PORT || 8000;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));


app.get("/", (req,res) => {
  res.send(`<h1>NODE APLICATION BACKEND</h1>`);
})


app.listen(port, ()=> {
  console.log(`App started at: http://localhost:${port}`);
});

app.use("/recipes", recipesRoute); 
app.use('/auth', authRoute);