$(document).ready(function(){
  //initialize the firebase app
  var config = {
    apiKey: "AIzaSyALWbrnwEjAcoSkrUa-hiPtfgyDZdJwcS4",
    authDomain: "smartcity-dvr.firebaseapp.com",
    databaseURL: "https://smartcity-dvr.firebaseio.com",
    projectId: "smartcity-dvr",
    storageBucket: "smartcity-dvr.appspot.com",
    messagingSenderId: "817397451184"
  };
firebase.initializeApp(config);

  //create firebase references
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var contactsRef = dbRef.ref('users/employee')
  var usersRef = dbRef.ref('users/employee')
  var auth = null;

 

  //Login
  $('#doLogin').on('click', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
     //     console.log("Authenticated successfully with payload:", authData);
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          setTimeout(function () {
            $('#messageModal').modal('hide');
            $('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');

          })
        })
        .catch(function(error) {
       //   console.log("Login Failed!", error);
          $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
        });
    }
  });


  //var ref = new Firebase("https://fir-bad72.firebaseio.com");s
  firebase.auth().onAuthStateChanged(function(authData) {
  if (authData) {
     
    document.getElementById('emails').innerHTML = authData.email;
    console.log("User ID " + authData.uid + " is logged in with " + authData.email);
  //  console.log("Authenticated successfully with payload:", authData);
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          setTimeout(function () {
            $('#messageModal').modal('hide');
            $('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');
         

//////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("User ID " + authData.uid + " is logged in with " + authData.email);
    var uu = authData.uid;
    console.log(authData.email);
       
    
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),mirror: false });
      scanner.addListener('scan', function (content) {

        console.log(content);
        var obj = JSON.parse(content);
        var r;
        var random = firebase.database().ref('randomNumberForAttendance');
        random.on('value', function(no) {
            r = no.val();

           // console.log(obj.number + "+" + obj.adhar);
            console.log("R :" + r); });
            if(r == obj.number){
              var adhar = obj.adhar;
  
              var gpsX = obj.gpsX;
              var gpsY = obj.gpsY;
              var name = obj.name;
              var pincode = obj.pincode;
              var unix =new Date()
              
              console.log(obj.adhar + obj.address + obj.gpsX + obj.gpsY );  
              var uid = authData.uid;
              console.log("TEST" + uid + "TIMT : " + unix);
           
                    firebase.database().ref().child('users/employee/' + uid + '/att').push().set({
                    adhar : adhar,
                    name : name,
                    pincode : pincode,
                    gpsX : gpsX,
                    gpsY : gpsY,
                    timestamp :  unix
                   // activeStatus : "true"

                  })
                 document.getElementById("demo").innerHTML = "Attendance Marked ! ";
                      
            }
            else {
              document.getElementById("demo").innerHTML = "Try Again";
            }


      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    


////////////////////////////////////////////////////////////////////////
            
          })
  } else {
    console.log("User is logged out");
  }
});

  //save contact
  $('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( auth != null ){
      if( $('#name').val() != '' || $('#email').val() != '' ){
        contactsRef.child(auth.uid).child("att")
          .push({
           
            activeStatus: $('#activeStatus').val(),
            dealerVisit: $('#dealerVisit').val(),
            place: $('#place').val(),
            planDate: $('#planDate').val(),
            porposeOfVisit: $('#porposeOfVisit').val(),
            porposeOfVisit1: $('#porposeOfVisit1').val(),
           
          })
          document.contactForm.reset();
      } else {
        alert('Please fill at-lease name or email!');
      }
    } else {
      //inform user to login
    }
  });
})
 
//prepare contact object's HTML
function contactHtmlFromObject(contact){
  console.log(contact );


}

$('.contacts').on("click", function( event ) {  
  event.preventDefault();
  window.location.replace('home.html');
});

function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

  