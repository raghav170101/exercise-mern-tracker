const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());//cors middleware

app.use(express.json());//parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    (err) => {
        if(err) throw err;
        //console.log(res)
});
// console.log(res);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require('./routes/exercise');//linking the routes of exercise and users to main backend file 
const usersRouter = require('./routes/users');//don't need .js in at last of users,exercise

app.use('/exercise',exerciseRouter);
app.use('/users',usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

