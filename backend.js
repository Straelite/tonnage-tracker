const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded());

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//TODO - this probably isn't how you serve assets
app.get('/bundle.js', (req, res) => { 
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});


app.post('/lift-data/write', (req, res) => {
    const fs = require('fs');
    const body = req.body;
    res.send(JSON.stringify(body));
});

app.listen(port);



