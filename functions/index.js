const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const cors = require('cors')();

admin.initializeApp(functions.config().firebase);

exports.changeVal = functions.https.onRequest((request, response) => {
  response.send('ok');
  // cors(request, response, () => {
  //   admin.database().ref('randomNumberForAttendance').set(
  //     Math.floor(Math.random() * 1000000)
  //   );
  //   return response.send('ok');
  // });


setInterval(function() {
  admin.database().ref('randomNumberForAttendance').set(
    Math.floor(Math.random() * 1000000)
  );
  console.log("Value a "+ Math.floor(Math.random()*1000000))
  // functions.database.ref('/random').set(a);
}, 60000);
});

