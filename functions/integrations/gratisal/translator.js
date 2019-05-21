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

exports.parseData = function(data) {
    return ""
}


exports.formatDate = function(timestamp){
     var seconds = timestamp.seconds
     var date = new Date(seconds*1000)
     var formattedDate = date.toJSON().split(".")[0]
     return formattedDate
}

exports.getDateObject = function(date) {
   return new Date(date)
}

exports.isDateBetween = function(startDate, endDate, currentDate) {
    if(startDate < currentDate && endDate > currentDate) return true
    return false
}

exports.getSalaryPeriodByDate = function(salaryPeriods, currentDate) {
    var self = this
    var salaryPeriods = salaryPeriods.find(item => {
        var startDate = new Date(item.StartDate)
        var endDate = new Date(item.EndDate)
        console.log(startDate)
        console.log(endDate)
        return self.isDateBetween(startDate,endDate,currentDate)
    })
    return salaryPeriods
}

exports.getTimeEntryTypeByName = function(timeEntryTypes, name) {
    var timeEntryTypeObj = timeEntryTypes.find(item => item.Name === name)
    return timeEntryTypeObj
}

exports.getUserEmployementIDbyFullName = function(employmentsOverview, fullName) {
    var obj = employmentsOverview.find(item => item.FullName === fullName)
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
