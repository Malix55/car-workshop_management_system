const express = require('express');
const path = require('path');
const admin = require('./routes/user');
const cors = require('cors');
require('./config')();

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


app.use('/api/auth', admin);



app.listen(process.env.SERVER_PORT || 8000, () => {
    console.log('server is online!');
})