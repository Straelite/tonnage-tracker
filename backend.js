const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Lift = require('./models/Lift');

//configure Express
const app = express();
const port = 8080
const cors = require('cors')

//configure mongo
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'tonnageTrackerDev';
mongoose.connect(`${dbUrl}/${dbName}`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

//Add dev-only modules
if (app.settings.env === 'development') {
    app.use(cors());
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/lift-data/write', (req, res) => {
    const body = req.body;
    let savedLifts = [];
    body.forEach(element => {
        const name = element.name;
        if (!name) {
            return 'nope';
        }
        let newLift = new Lift(element);
        newLift.save((err) => {
            if (err) {
                throw new Error(err);
            }; // saved!
        });
        savedLifts.push(newLift);
    });
    res.json(savedLifts);
});

app.get('/lift-data/get/:name', (req, res) => {
    if (!req.params || !req.param.name) {
        throw new Error('No lift specified');
    }
    Lift.find({ 'name': req.params.name }, (err, results) => {
        if (err) {
            throw new Error(err);
        }
        res.json({ data: results });
    });
});

app.delete('/lift-data/delete/:id', (req,res) => {
    if (!req.params || !req.params.id) {
        throw new Error('No lift id specified');
    }
    Lift.deleteOne({_id: req.params.id}, (err, results) => {
        if (err) {
            throw new Error(err);
        }
        res.json({data: results});
    });

});

app.delete('/lift-data/delete/date/:date', (req, res) => {
    if (!req.params || !req.params.date) {
        throw new Error('No date specified');
    }

    Lift.deleteMany({date: req.params.date}, (err, results) => {
        if (err) {
            throw new Error(err);
        }
        res.json({data: results});
    })
});

app.listen(port);



