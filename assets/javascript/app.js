var initialGlobal = [];


// Initialize Firebase
var config = {
    apiKey: "AIzaSyASJzJchxXQIsPCi_Ns508gEYItzCu3ld4",
    authDomain: "rutgers1-c634d.firebaseapp.com",
    databaseURL: "https://rutgers1-c634d.firebaseio.com",
    projectId: "rutgers1-c634d",
    storageBucket: "rutgers1-c634d.appspot.com",
    messagingSenderId: "877491157598"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#initializeData").on("click", function() {
	console.log("clicked")

	//Create variables to hold user input
	var sqInit = $('#squatInit').val().trim();
	var bpInit = $('#benchInit').val().trim();
	var dlInit = $('#deadInit').val().trim();
	


	//if the input fields are not empty
	if( sqInit != "" &&
		bpInit != "" &&
		dlInit != "" ){
	//push the data to firebase
	database.ref().push({
		initialSquat: sqInit,
		initialBench: bpInit,
		initialDead: dlInit,
		
	});  
    // document.getElementById("#submitTrain").value = '';
    }
	//otherwise don't submit
	else {
		return false;
	}

	// Don't refresh the page!
	return false;
})

// auto-refresh page every 2 mins - see corresponding code in body tag (next time do w/o "blink")
function AutoRefresh( t ) {
setTimeout("location.reload(true);", t);
}

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val())
	var a = childSnapshot.val().initialSquat
	var b = childSnapshot.val().initialBench
	var c = childSnapshot.val().initialDead
	console.log(a)
	var startRow1 = $("<tr>")
	var row1data1 = $("<td>")
	var row1data2 = $("<td>")
	var row1data3 = $("<td>")
	row1data1.append("Squat")
	row1data2.append(childSnapshot.val().initialSquat)
	row1data3.append(childSnapshot.val().initialSquat*0.9)
	startRow1.append(row1data1, row1data2, row1data3)
	console.log(startRow1)
	$("#startTable").append(startRow1)


	//create rows to display the database values
	var $trainBody = $('#trainRows');
	var $trainRow = $('<tr>');
	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);	
	
	var frequency = childSnapshot.val().frequency;
	var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");		
	var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
	
	var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
	var minutesAway = $('<td>').html(minAway).appendTo($trainRow);
		
	$trainRow.appendTo($trainBody);


// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});

//=================================

