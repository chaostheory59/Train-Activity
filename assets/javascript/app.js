var config = {
    apiKey: "AIzaSyAoZvjURN2J6Ct93sDZ9XNZLVo0eA8HYIQ",
    authDomain: "train-table-16fa7.firebaseapp.com",
    databaseURL: "https://train-table-16fa7.firebaseio.com",
    projectId: "train-table-16fa7",
    storageBucket: "",
    messagingSenderId: "230726302427",
    appId: "1:230726302427:web:a4660f1efb7a6dcf"
  };
  
  var tName;
  var tDestination;
  var tStart;
  var tFreq;



  firebase.initializeApp(config);

  var database = firebase.database();


  
  
  function calcMinutesAway(diffTime, tFreq) {
    console.log(`${tFreq}, ${diffTime}`)
    return tFreq - (diffTime % tFreq);
  }
  
  function calcNextArrival(tminutesAway) {
    return moment().add(tminutesAway, "m").format("HH:mm");
  }

  


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();   
    
    // Grabs user input
    var tName = $("#train-name-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var tStart = $("#start-input").val().trim();
    var tFreq = $("#frequency-input").val().trim();
    
    var firstTimeConverted = moment(tStart, "HH:mm");
    

    
    

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
  

   var tminutesAway = calcMinutesAway(diffTime, tFreq);
		console.log("The next train will be here in: " + tminutesAway +" minutes.");

		//Whenever current time matches next arrival time
		if (tminutesAway === parseInt(tFreq)) {
			tminutesAway = 0;
		}

		//Calculate the next arrival's time
	  var tnextArrival = calcNextArrival(tminutesAway);
	    console.log("The next train will be here at: " + tnextArrival);
    
      var newTrain = {
        name: tName,
        destination: tDestination,
        start: tStart,
        Freq: tFreq,
        nextArriv: tnextArrival,
        minuteAwa: tminutesAway
      };
  
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.start);
      console.log(newTrain.Freq);
      console.log(newTrain.nextArriv);
      console.log(newTrain.minuteAwa);
      database.ref().push(newTrain);
  // Logs everything to console
  

  alert("Train Data successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().Freq;
    var Arrival = childSnapshot.val().nextArriv;
    var minAway = childSnapshot.val().minuteAwa;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);
  
    
    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFreq),
      $("<td>").text(Arrival),
      $("<td>").text(minAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  