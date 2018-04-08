// Initialize Firebase
var config = {
	apiKey: "AIzaSyALWbrnwEjAcoSkrUa-hiPtfgyDZdJwcS4",
	authDomain: "smartcity-dvr.firebaseapp.com",
	databaseURL: "https://smartcity-dvr.firebaseio.com",
	projectId: "smartcity-dvr",
	storageBucket: "smartcity-dvr.appspot.com",
	messagingSenderId: "817397451184"
};
firebase.initializeApp(config);


const dbRef = firebase.database().ref();

const usersRef = dbRef.child('users/employee');
const attRef = dbRef.child('users/employee')

const userListUI = document.getElementById("userList");
const body = document.getElementById("bodyy");

usersRef.orderByChild("divisionType").equalTo("Police").on("child_added", snap => {

	let user = snap.val();

	let $li = document.createElement("menu");
	$li.innerHTML = "<span class='tag is-black'>"+user.designation+"</span>"+"&nbsp"+user.name;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);

   
});


function userClicked(e) {
	
		
	{
			var userID = e.target.getAttribute("child-key");

			dbRef.child('users/employee').once("value").then(function(snapdata){
				var data = snapdata.val();
				console.log(data);
			//	console.log(data);
		
			const userDetailUI = document.getElementById("userDetail");
		
			userDetailUI.innerHTML = ""
			var userID = e.target.getAttribute("child-key");

				var attId =  e.target.getAttribute("child-key");
						


			const userRef = dbRef.child('users/employee/' + userID + '/att' );
		
			userRef.once("value").then(function(snap) {
				var v = snap.val();
			console.log(v);
				var keys = Object.keys(v);
				console.log(keys);
				for (var i=0; i<keys.length; i++ )
		{
			

for(var key in v)
{

	var $card = document.createElement("card");
            
	$card.innerHTML ="<div class='card' style='width: 18rem;margin-top:5%; margin-left:3%;'>"+
	"   <div class='card-body'>"+
	"<h3 style='color:red;text-align:center;'>"+"Host Info"+"</h3>"+
 	" <h5 style='margin-left:5%;' class='card-title is-primary' >"+"Aadhar Number:&nbsp "+v[key] .adhar+"</h5>"+
 	" <h6 style='margin-left:5%;' class='card-subtitle mb-2 text-muted'>"+"Name: &nbsp" +v[key].name+"</h6>"+
	 " <h6 style='margin-left:5%;' class='card-subtitle mb-2 text-muted'>"+"Location: &nbsp" +v[key].pincode+"</h6>"+

	"  </div> "+	
	" </div>";

   
   userDetailUI.append($card);
			}
		}
		});
		}
	
			)}};
