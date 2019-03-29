var csvjson = require('csvjson');
const csv = require('csv-parser');
const fs = require('fs')
var filename = __dirname + "/registrations.csv"




exports.getCsv = async () => {
fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (row) => {
        parsedData.push(row)
    })
    .on('end', () => {

        console.log(parsedData)
        console.log('CSV file successfully processed');
    });
}