const functions = require('firebase-functions');
const parse = require('./translator');

module.exports = anyUpdate = functions.firestore
.document('timeregistration/{regId}')
.onUpdate((change) => {
    if (this.isStatusOk(change))
    {
        sendTimeReg(change.after.data);
    }
});

module.exports = isStatusOk = function(change) {
    const data = change.after.data();
    const prevData = change.before.data();
    console.log(prevData, data);
    if(data.status != "OK") return false;
    return true;
}

exports.sendTimeReg = function(data) {
    parse.gratisalTimeentry(data);    
}