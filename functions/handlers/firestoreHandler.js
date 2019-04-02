const functions = require('firebase-functions');

const admin = require('firebase-admin');
let db = admin.firestore();

const fs = require('fs')
var filename = __dirname + "/registrations.csv"

const csv = require('csvtojson')

exports.timeRegistrationAdd = async (db2) => {
    csv()
        .fromFile(filename)
        .then((row) => {
            row.forEach(obj => {
                var j = {}
                j = format(obj)
                addReg(j)
            })
        })
}

function addReg(data) {
    // console.log(data)
    db.collection("timeregistration")
        .add(data)
        .then(function(doc) {
            console.log("doc added")
        })
        .catch(function(error) {
            console.error("Error", error);
        });
}


function format(row) {
    //console.log(row)
    row["worker"] = { id: row.Worker + "@prolike.io" }
    var date = new Date(row['Date (work)'])
    var date2 = new Date(row['Date (work)'])
    date.setHours(9)
    row['startTime'] = date
    var workTime = row.Hours.split(".")
    var hour = parseInt(workTime[0]) + 9
    var minute = 0
    try {
        if (workTime[1] > 0) {
            minute = (workTime[1] * 60) / 10
        }
    } catch (e) {
        // statements
        console.log(e);
    }
    date2.setHours(hour)
    date2.setMinutes(minute)
    row['endTime'] = date2
    row['category'] = { id: row.Category }
    row["paidMonth"] = row['Paid (month)']
    row["project"] = { id: row['Assignment'], customer: { name: row['Assignment'] } }
    row["status"] = row["Status"]
    //row["invoice"] = row["Invoice No"]
    row["comment"] = row["Comment"]
    row["price"] = row["Price"]
    row["cost"] = row["Cost"]
    row["issues"] = row["comment"].match(/\#[0-9]*/g)
    //console.log(row["issues"])
   // console.log(row["comment"])
    delete row['Paid (month)'];
    delete row['Worker'];
    delete row['Assignment'];
    delete row['Hours'];
    delete row['Category'];
    delete row['Date (work)'];
    delete row['Status'];
    delete row['field12'];
    delete row['Invoice No'];
    delete row['Comment'];
    delete row['Price'];
    delete row['Cost'];
    delete row['field13'];

    return row
}