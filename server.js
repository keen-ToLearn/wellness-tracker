const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const users = require('./routes/users');
const records = require('./routes/records');

const app = express();

// for deployement to heroku
// app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors());
app.use(express.json());

app.use('/users', users);
app.use('/records', records);

const mongoString = process.env.DB_URI;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.once('open', () => {
    console.log('DB connected');
});

// for deployment to heroku
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server up on port: ${PORT}`);
});