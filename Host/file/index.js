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
          console.log("Authenticated successfully with payload:", authData);
          auth = authData;
         
        })
        .catch(function(error) {
          console.log("Login Failed!", error);
          window.alert("Email or Password that you've entered is incorrect !")
          $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
        });
    }
  });


  //var ref = new Firebase("https://fir-bad72.firebaseio.com");
  firebase.auth().onAuthStateChanged(function(authData) {
  if (authData) {
    location.href = "home.html"
    } else {
    console.log("User is logged out");
  }
});

  //save contact
  $('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( auth != null ){
      if( $('#name').val() != '' || $('#email').val() != '' ){
        contactsRef.child(auth.uid)
          .push({
           
            activeStatus: $('#activeStatus').val(),
            dealerVisit: $('#dealerVisit').val(),
            place: $('#place').val(),
            planDate: $('#planDate').val(),
            porposeOfVisit: $('#porposeOfVisit').val()
           
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
  console.log( contact );
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
    html += '<p class="lead">'+contact.activeStatus+'</p>';
      html += '<p class="lead">'+contact.planDate+'</p>';
      html += '<p>'+contact.place+'</p>';
      html += '<p>'+contact.dealerVisit+'</p>';
      html += '<p>'+contact.porposeOfVisit+'</p>';
     
     html += '</div>';
  html += '</li>';
  return html;

}

$('#messageModal').on('click', function (e) {
  e.preventDefault();
  $('#messageModal').modal('show');

});

function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
}
