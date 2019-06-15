const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'tonnageTrackerDev';
mongoose.connect(`${dbUrl}/${dbName}`);
const db = mongoose.connection;
const Lift = require('./models/Lift');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//TODO - this probably isn't how you serve assets
app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});


app.post('/lift-data/write', (req, res) => {
    const body = req.body;
    const name = body.name;
    if (!name) {
        return 'nope';
    }
    let newLift = new Lift(body);
    newLift.save((err) => {
        if (err) {
            throw new Error(err);
        }; // saved!
    });

    res.json(newLift);
});

app.get('/lift-data/get/:name', (req, res) => {
    if (!req.params || !req.param.name) {
        throw new Error('No lift specified');
    }
    Lift.find({ 'name': req.params.name }, (err, results) => {
        if (err) {
            throw new Error(err);
        }
        res.json({data: results});
    });
}); 

app.listen(port);



