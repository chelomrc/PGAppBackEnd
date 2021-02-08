const mongoose = require('mongoose');
const User = require('./models/user')
const readCsv = require('./utils/importcsv');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const init = async () => {

    await dbConnection();
    await readCsv().then((data) => {
        User.insertMany( data )
            .then(() => {
                console.log('Data Imported');
                mongoose.disconnect();
            })
            .catch(console.log)
    });    
}

init();
