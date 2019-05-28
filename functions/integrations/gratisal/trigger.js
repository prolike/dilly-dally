const functions = require('firebase-functions');
const parse = require('./translator');

module.exports = anyUpdate = functions.firestore
.document('timeregistration/{regId}')
.onUpdate((change) => {
    if (this.isStatusOk(change))
    {	
        this.sendTimeReg(change.after.data());
    }
});


// Jeg skal teste, og jeg skal vist gøre det fra
exports.isStatusOk = function(change) {
    const data = change.after.data();
    const prevData = change.before.data();
    //console.log(prevData, data);
    if(data.status != "OK") return false;
    return true;
}

exports.sendTimeReg = function(data) {
    parse.gratisalTimeentry(data);    
}



