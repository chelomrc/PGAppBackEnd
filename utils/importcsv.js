const csvtojson = require('csvtojson');

//Import File
const csvFilePath='./files/test.csv'


const readCsv = async () => {
    let data;
    await csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        data = jsonObj;
        data.map((item) => {
            item._id = item.SubscriberID;
        })
    })    
    return data;
}

module.exports = readCsv;
