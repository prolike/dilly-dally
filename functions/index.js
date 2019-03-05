const functions = require('firebase-functions');



// Functions called from webapp
 exports.webappapi = functions.https.onCall((data, context) => {
  console.log(data)
  console.log(context)
  return "asd"
 });

 exports.api = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
 


exports.getAllProjects = function(customerName, projectName, data){
 	console.log(customerName,projectName,data)
 } 
exports.getAllCategories = function(customerName, projectName, data){
 	console.log(customerName,projectName,data)
 } 

 exports.getAllTimeRegistrations = function(customerName, projectName, data){
 	console.log(customerName,projectName,data)
 } 

 exports.timeRegistrationAdd = function(customerName, projectName, data){
 	console.log(customerName,projectName,data)
 } 

 exports.timeRegistrationRemove = function(customerName, projectName, timeRegistrationID){
 	console.log(customerName,projectName,timeRegistrationID)}
 

