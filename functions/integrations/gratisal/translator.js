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
    
}

exports.getAllEmployees = function() {
}

exports.getAllCategories = function() {

}

exports.getToken = function() {
    return new Promise(function(resolve, reject) {
        auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var options = {
            method: 'POST',
            url: URL + "/api/auth/login",
            headers: {
                'Authorization': auth
            }
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                var token = info.Token
                resolve(token)
            }
            else{
                reject(error)
            }
        }
        req(options, callback);
    })
}

exports.sendToGratisal = function(data) {

}