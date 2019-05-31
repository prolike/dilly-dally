const parse = require('./translator');

exports.anyUpdate = function(change) { //Getting data from database 
    if (this.isStatusOk(change)) {
        this.sendTimeReg(change.after.data());
    }
}
// jeg har en fungerende eksemple her
exports.isStatusOk = function(change) {
    const data = change.after.data();
    const prevData = change.before.data();
    //console.log(prevData, data);
    if (data.status != "OK") return false;
    return true;
}

exports.sendTimeReg = function(data) {
    parse.gratisalTimeentry(data);
}
exports.hello = function() {

	console.log("hello")
}