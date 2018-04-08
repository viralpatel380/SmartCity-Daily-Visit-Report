     //   firebase.auth().onAuthStateChanged(function(user) {
//if (user) {
// User is signed in.


console.log("User ID " + user.uid + " is logged in with " + user.email);
var uu = user.uid;
console.log(user.email);
    let scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        mirror: false,
        scanPeriod: 1
    });

    var content;
    console.log(content);
    scanner.addListener('scan', function(content) {

        var obj = JSON.parse(content);

        var random = firebase.database().ref('randomNumberForAttendance');
        random.on('value', function(no) {
            r = no.val();
            console.log(obj.number);
            console.log("R :" + r);
//  var attKey = firebase.database().ref().child('users/salesPersonNode/' + uu + '/att/' ).push().key;
var data = firebase.database().ref().child('users/salesPersonNode/' + uu + '/att/' )
data.on('value', function(data){
  vvv= data.val();
  console.log(vvv);
})

        });
        document.getElementById("demo").innerHTML = "Attendance Marked ! Press Back Button";


    });

    Instascan.Camera.getCameras().then(function(cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function(e) {
        console.error(e);
    });
//} else {
// No user is signed in.
//window.alert("Please Sign In Sales WebApp");
//}
//});

    document.addEventListener('DOMContentLoaded', function() {

        // Get all "navbar-burger " elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any nav burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(function($el) {
                $el.addEventListener('click', function() {

                    // Get the target from the "data-target " attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);
                    // Toggle the class on both the "navbar-burger " and the "navbar-menu "
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });