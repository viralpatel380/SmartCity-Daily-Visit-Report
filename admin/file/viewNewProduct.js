$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    
      queryDatabase();
    } else {
      // No user is signed in.
      
      queryDatabase();
    }
});
});


function queryDatabase() {
  firebase.database().ref('/NewProductDevelopment').once('value').then(function(snapshot) {
    var PostObject = snapshot.val();
    var keys = Object.keys(PostObject);
    var currentRow;
    for (var i = 0; i< keys.length; i++) {
      var currentObject = PostObject[keys[i]];
      if (i % 3 == 0) {
        currentRow = document.createElement("div");
        $(currentRow).addClass("row");
        $("#contentHolder").append(currentRow);
      }
      var col = document.createElement("div");
      $(col).addClass("thumbnail");
      var image = document.createElement("img");
      image.src = currentObject.imageUrl;
      $(image).addClass("img-thumbnail");
      var p = document.createElement("h3");
      $(p).html(currentObject.title);
      $(p).addClass("text-thumbnail");
      $(col).append(image);
      $(col).append(p);

       var h5 = document.createElement("h5");
      $(h5).html(currentObject.message);
      $(h5).addClass("text-thumbnail");
      $(col).append(p);
      $(col).append(h5);
      $(currentRow).append(col);
      //create new row on every third entry
      //col-lg-4
    }
    // ...
  });

}