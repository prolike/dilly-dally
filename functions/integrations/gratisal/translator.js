const functions = require('firebase-functions');
const req = require('request');

var username = "ansty93@prolike.io"
var password = "Solve99GL"
var URL = "https://api.gratisaltest.dk"

exports.gratisalTimeentry = functions.https.onRequest((request, response) => {
    if (request.method === "GET") {
        var result = firestoreHandler.getWorkers();
        result.then(msg => {
            response.status(201)
            response.statusMessage = "Success"
            return response.send(msg)
        })
    }
    if (request.method === "POST") {
        var result = firestoreHandler.getWorkers();
        result.then(msg => {
            response.status(201)
            response.statusMessage = "Success"
            return response.send(msg)
        })
    } else {
        response.status(400)
        response.statusMessage = "Forbidden request method"
        return response.send()
    }
});

/*
{
    "UnitType": {
        "Name": "Prolike",
    },
    "Status": {
        "Name": "Åben",
    },
    "EmployeeName": "Andreas",
    "UserEmploymentId": 3289,
    "EntryDate": "2019-04-14T00:00:00",
    "TimeEntryTypeId": 12217,
    "UnitTypeId": 2,
    "Description": "Working on gratisal - #125125125",
    "SalaryPeriodId": 111
}
*/
exports.parseData = function(employmentsOverview,timeEntryTypes,salaryPeriods,timeregistration) {

    var employeeName = timeregistration.worker.fullName
    var unitTypeName = timeregistration.category.id
    var userEmploymentId = this.getUserEmployementIDbyFullName(employmentsOverview, employeeName)
    var entryDate = this.formatDate(timeregistration.startTime)
    var timeEntryType = this.getTimeEntryTypeByName(timeEntryTypes, unitTypeName)
    var timeEntryTypeId = timeEntryType.TimeEntryTypeId
    var unitTypeId = timeEntryType.UnitTypeId
    var descriptoion = timeregistration.comment + timeregistration.issues
    var currentDate = new Date(entryDate)
    var salaryPeriod = this.getSalaryPeriodByDate(salaryPeriods, currentDate)
    var salaryPeriodId = salaryPeriod.Id
    var timeEntry = {
        "UnitType": {
            "Name": unitTypeName
        },
        "Status": {
            "Name": "Åben"
        },
        "EmployeeName": employeeName,
        "UserEmploymentId": userEmploymentId,
        "EntryDate": entryDate,
        "TimeEntryTypeId": timeEntryTypeId,
        "UnitTypeId": unitTypeId,
        "Description": descriptoion,
        "SalaryPeriodId": salaryPeriodId
    }
    return timeEntry
}


exports.formatDate = function(timestamp) {
    var seconds = timestamp.seconds
    var date = new Date(seconds * 1000)
    var formattedDate = date.toJSON().split(".")[0]
    return formattedDate
}
exports.formatDescription = function(comment, issues) {
    var formattedDescription = ""
    if(issues !== null && issues ){
        
    }    
    return formattedDescription
}

exports.getDateObject = function(date) {
    return new Date(date)
}

exports.isDateBetween = function(startDate, endDate, currentDate) {
    if (startDate < currentDate && endDate > currentDate) return true
    return false
}


exports.getSalaryPeriodByDate = function(salaryPeriods, currentDate) {
    var self = this
    var salaryPeriods = salaryPeriods.find(item => {
        var startDate = new Date(item.StartDate)
        var endDate = new Date(item.EndDate)
        return self.isDateBetween(startDate, endDate, currentDate)
    })
    return salaryPeriods
}

exports.getTimeEntryTypeByName = function(timeEntryTypes, name) {
    var timeEntryTypeObj = timeEntryTypes.find(item => item.Name === name)
    return timeEntryTypeObj
}

exports.getUserEmployementIDbyFullName = function(employmentsOverview, EmployeeName) {
    var obj = employmentsOverview.find(item => item.FullName === EmployeeName)
    var UserEmploymentId = obj.UserEmploymentId
    return UserEmploymentId
}

exports.getToken = function() {
    return new Promise(function(resolve, reject) {
        auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");
        var options = {
            method: 'POST',
            url: URL + "/api/auth/login",
            headers: {
                'Authorization': auth
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                var token = data.Token
                resolve(token)
            } else {
                reject(error)
            }
        }
        req(options, callback);
    })
}
exports.getTimeEntryTypes = function(token) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'GET',
            url: URL + "/api/timeentrytypes",
            headers: {
                'Authorization': "Token " + token
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data)
            } else {
                reject(error)
            }
        }
        req(options, callback);
    })
}

exports.getSalaryPeriods = function(token) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'GET',
            url: URL + "/api/salarybatches/periods/relevant",
            headers: {
                'Authorization': "Token " + token
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data)
            } else {
                reject(error)
            }
        }
        req(options, callback);
    })
}

exports.getEmployments = function(token) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'GET',
            url: URL + "/api/employments/overview",
            headers: {
                'Authorization': "Token " + token
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data)
            } else {
                reject(error)
            }
        }
        req(options, callback);
    })
}

exports.getAllCategories = function() {

}

exports.postTimeEntry = function(token, data) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'POST',
            url: URL + "/api/auth/login",
            headers: {
                'Authorization': "Token " + token
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                var token = info.Token
                resolve(token)
            } else {
                reject(error)
            }
        }
        req(options, callback);
    })
}