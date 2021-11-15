const express = require('express');
const mongoose = require('mongoose');

const uri = "mongodb+srv://kekule15:1d73ttHref@cluster0.6r1sy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
        process.exit();
    });
const app = express();

app.use(express.json());
require('./app/routes/app.routes.js')(app);
app.listen(3000, () => {
    console.log('Started');
})
app.get('/', (req, res) => {



    res.json({ message: 'My home' });
})

app.get('/users', (req, res) => {
    res.send('List of users');
})