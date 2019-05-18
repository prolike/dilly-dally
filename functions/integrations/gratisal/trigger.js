
const functions = require('firebase-functions');

exports = module.exports = anyUpdate = functions.firestore
.document('timeregistration/{regId}')
.onUpdate((change) => {
    const data = change.after.data();
    const prevData = change.before.data();
    console.log(prevData, data);
    if(data.status != "OK") return false;
    return true;
});



