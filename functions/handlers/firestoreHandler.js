const functions = require('firebase-functions');

const admin = require('firebase-admin');
let db = admin.firestore();

const fs = require('fs')
var filename = __dirname + "/registrations.csv"
var legends = __dirname + "/discount.csv"
var defaultCategories = __dirname + "/categories.csv"

const csv = require('csvtojson')

exports.timeRegistrationAdd = async (db2) => {
    csv()
        .fromFile(legends)
        .then((legend) => {
            getDefaultCategories(legend)
        })
}

function getDefaultCategories(legend) {
    csv()
        .fromFile(defaultCategories)
        .then((defaultCategories) => {
            console.log(defaultCategories)
            startReg(legend, defaultCategories)
        })
}

function startReg(legend, defaultCategories) {
    //console.log(legend)
    csv()
        .fromFile(filename)
        .then((row) => {
            var asd = legend
            //console.log(row)
            row.forEach(obj => {
                var j = {}
                j = format(obj, legend, defaultCategories)
                console.log(j)
                addReg(j)
                addProject(j)
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

function addProject(data) {
    // console.log(data)
    var id = data.project.id
    console.log(id)
     db.collection("projects")
        .doc(id)
        .set(data.project)
        .then(function(doc) {
            console.log("doc added")
        })
        .catch(function(error) {
            console.error("Error", error);
        });
}

function format(row, legend, defaultCategories) {
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
    var defaultCategory = { id: row.Category }
    for(var i in defaultCategories){
        if(defaultCategories[i]["Categories"] === row.Category){
            defaultCategory = {"id":row.Category, "cost":defaultCategories[i]["Cost"], "price":defaultCategories[i]["Price"]}
        }
    }
    row['category'] = defaultCategory
    row["paidMonth"] = row['Paid (month)']
    var categories = undefined
    for (var obj in legend) {
        if (legend[obj]["Customers"] === row['Assignment']) {
            var ob = {}
            Object.assign(ob, legend[obj])
            delete ob["Customers"]
            for (var o in ob) {
                var num = Number(ob[o])
                ob[o] = { "price": num }
            }
            categories = ob
        }
    }
    // console.log(categories)
    row["project"] = { id: row['Assignment'], customer: { name: row['Assignment'] }, "categories": categories }
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