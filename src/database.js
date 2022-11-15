const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.MONGOPORT,
    HOST = process.env.MONGOHOST,
    DB = process.env.MONGODB,
    USER = process.env.MONGOUSER,
    PASSWD = process.env.MONGOPASSWORD;

const URI = (USER && PASSWD) 
                ? `mongodb://${USER}:${PASSWD}@${HOST}:${PORT}` 
                : `mongodb://${HOST}:${PORT}/${DB}`;
// console.log(process.env);

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;