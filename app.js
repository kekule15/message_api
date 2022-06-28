require("dotenv").config(); 


const express = require('express');
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URLLink;
mongoose.Promise = global.Promise;
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("Could not connect to the database. Error...", err);
        // process.exit();
    });
const app = express();






app.use(express.json());
require('./app/routes/app.routes.js')(app);
app.listen(3000, () => {
    console.log(`listening on `);
    
})