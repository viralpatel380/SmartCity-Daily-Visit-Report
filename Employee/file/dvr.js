// Initialize Firebase
var config = {
	apiKey: "AIzaSyCL4ehybGdwvla03NCF7P8kyNSpZhJ_hoU",
	authDomain: "yobykes-ssm.firebaseapp.com",
	databaseURL: "https://yobykes-ssm.firebaseio.com",
	projectId: "yobykes-ssm",
	storageBucket: "yobykes-ssm.appspot.com",
	messagingSenderId: "859108605869"
};

firebase.initializeApp(config);


const dbRef = firebase.database().ref();

const usersRef = dbRef.child('users/salesPersonNode');
const userListUI = document.getElementById("userList");
const body = document.getElementById("bodyy");

usersRef.on("child_added", snap => {

	let user = snap.val();

	let $li = document.createElement("menu");
	$li.innerHTML = user.name;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);

   
});


function userClicked(e) {
	
		
		if (confirm("Press Ok for Visited Data & Press Cancle For Planning Data")) {
			var userID = e.target.getAttribute("child-key");

			dbRef.child('users/salesPersonNode').once("value").then(function(snapdata){
				var data = snapdata.val();
			
		
			const userDetailUI = document.getElementById("userDetail");
		
			userDetailUI.innerHTML = ""
			var userID = e.target.getAttribute("child-key");
			const userRef = dbRef.child('users/salesPersonNode/' + userID).child('att');

			userRef.orderByChild("active").equalTo(true).once("value").then(function(snap) {
				var v = snap.val();
				var keys = Object.keys(v);
				console.log(keys);
				console.log(v);
				for (var i=0; i<keys.length; i++ )
		{
			
var k = keys[i];
				var $p = document.createElement("p");
				$p.innerHTML ="<strong>Dealer Visit :</strong>"+ v[k].dealerVisit;

				var $h3 = document.createElement("h3");
				$h3.innerHTML = "<strong>Active Status :</strong>"+v[k].active;

				var $h2 = document.createElement("h2");
				$h2.innerHTML = "<strong>Dealer ID :</strong>" + v[k].dealerId;

				var $h1 = document.createElement("h1");
				$h1.innerHTML = "<strong>Dealer Name :</strong>" + v[k].dealerName +	"<hr>";
			
				

				userDetailUI.append($p);
				userDetailUI.append($h3);	
				userDetailUI.append($h2);
				userDetailUI.append($h1);
				
			}
			});
		
		});
		} else {
			
			var userID = e.target.getAttribute("child-key");

			dbRef.child('users/salesPersonNode').once("value").then(function(snapdata){
				var data = snapdata.val();
			
		
			const userDetailUI = document.getElementById("userDetail");
		
			userDetailUI.innerHTML = ""
			var userID = e.target.getAttribute("child-key");
			const userRef = dbRef.child('users/salesPersonNode/' + userID).child('att');

			userRef.orderByChild("active").equalTo(false).once("value").then(function(snap) {
				var v = snap.val();
				var keys = Object.keys(v);
				console.log(keys);
				console.log(v);
				for (var i=0; i<keys.length; i++ )
		{
			
var k = keys[i];
				var $p = document.createElement("p");
				$p.innerHTML ="<strong>Dealer Visit :</strong>"+ v[k].dealerVisit;

				var $h3 = document.createElement("h3");
				$h3.innerHTML = "<strong>Active Status :</strong>"+v[k].active;

				var $h2 = document.createElement("h2");
				$h2.innerHTML = "<strong>Dealer ID :</strong>" + v[k].dealerId;

				var $h1 = document.createElement("h1");
				$h1.innerHTML = "<strong>Dealer Name :</strong>" + v[k].dealerName;
				
				

				userDetailUI.append($p);
				userDetailUI.append($h3);	
				userDetailUI.append($h2);
				userDetailUI.append($h1);
				
			}
			});
		
		});
		}
	//	document.getElementById("demo").innerHTML = txt;
	
		


	


	

}


