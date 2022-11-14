const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.MONGOPORT,
    HOST = process.env.MONGOHOST,
    DB = process.env.MONGODB;

const URI = `mongodb://${HOST}:${PORT}/${DB}`;
// console.log(process.env);

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;