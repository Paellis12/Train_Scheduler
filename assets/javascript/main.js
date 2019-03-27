$(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCeJPpBRiAHePfYKXDjx-gKhMHq6M5SYmE",
    authDomain: "train2-ed915.firebaseapp.com",
    databaseURL: "https://train2-ed915.firebaseio.com",
    projectId: "train2-ed915",
    storageBucket: "train2-ed915.appspot.com",
    messagingSenderId: "259788192628"
  };
  firebase.initializeApp(config);

  var tData = firebase.database().ref();
        
  $("#currentTime").append(moment().format("hh:mm A"));

  //User submission//

  $("#addTrain-btn").on("click", function() {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    //local object for train data//
    var addTrain = {
      name: trainName,
      destination: destination,
      first: first, 
      frequency: frequency
    }

    console.log(addTrain.name);
    console.log(addTrain.destination);
    console.log(addTrain.first);
    console.log(addTrain.frequency);

    //push info to firebase//
    tData.push(addTrain);

    alert(addTrain.name + ", has been added!")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

    return false;
  });

  //firebase event//

  tData.on("child_added", function(childSnapshot) {
    console.log(childSnapshot);

    var names = childSnapshot.val().name;
    var desti = childSnapshot.val().destination;
    var freq = childSnapshot.val().frequency;
    var trainFirst = childSnapshot.val().first;

    console.log(names);
    console.log(desti);
    console.log(freq);
    console.log(trainFirst);

    //calculate train arrival//

    var trainModulas = moment().diff(moment.unix(trainFirst), "minutes") % freq;
    var trainMinutes = freq - trainModulas;
    ////
    var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
    ////

    //append data to html//
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(desti),
      $("<td>").text(freq),
      $("<td>").text(trainArrival),
      $("<td>").text(trainMinutes)
    );

    $("#train-table > tbody").append(newRow);
    
  });

});


