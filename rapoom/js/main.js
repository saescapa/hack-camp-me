var myFirebaseRef = new Firebase("https://rapoom-chat.firebaseio.com/");

var callError = function(input) {
  var errorElement = $("#error");
  errorElement.html(input);
  errorElement.css("z-index","1000");
  errorElement.css("opacity","1");
  setTimeout( function() {
    errorElement.css("z-index","0");
    errorElement.css("opacity","0");
  },3000);
};

$(".input").keypress(function(e){
  var line = $(".input");
  if(e.keyCode == 13) {
    if(line.val() !== "" && line.val().trim().length > 9) {
      
      //Compare rhymes.
      var lastWord = $('.line .contents')[$('.line .contents').length - 1].innerHTML.split(" ").pop();
      console.log(lastWord);
      var newWord = line.val().split(" ").pop();
      console.log(newWord);
    
      compare(lastWord, newWord, function(matches) {
      	if(matches) {
      		console.log("cool1");
      		var values = {};
      		values.text = line.val();
      		values.date = new Date().getTime();
      		myFirebaseRef.push(values);
      	} else {
      	  callError("Please input a valid rhyme");
      	}
      });
      
      
    } else {
      alert("Please input more than 9 characters. Currently " + line.val().trim().length);
    }
  }
});

myFirebaseRef.limitToLast(4).on('child_added', function (snapshot) {
  var messageBox = $(".messages");
  var data = snapshot.val();
  
  //This is just to save some time tomorrow. I'll explain tomorrow real quick.
  
  var timeSincePost = Math.floor((new Date().getTime() - data.date) / 1000); //Calculate the amount of seconds between the current date and the date the post was posted.
  
  if(timeSincePost == 0) {
    var timeUnits = "now";
    var timeSincePost = "Just Now.";
  } else if(timeSincePost == 1) { //if time since post is 1 second 
    var timeUnits = "second";
    var timeSincePost =  "1 " + timeUnits + " ago."
  } else if(timeSincePost < 60) { // If time since post is less than a minute.
    var timeUnits = "seconds";
    var timeSincePost = timeSincePost + " " + timeUnits + " ago."
  } else if(timeSincePost / 60 >= 1 && timeSincePost / 60 < 2) { //if the amount of minutes is between 1 and 1.99
    var timeUnits = "minute";
    var timeSincePost = Math.floor(timeSincePost / 60) + " " + timeUnits + " ago.";
  } else if (timeSincePost / 60 >= 2 && timeSincePost / 3600 < 1) { //if the amount of minutes is greater than 2 minutes and less than 1 hour
    var timeUnits = "minutes";
    var timeSincePost = Math.floor(timeSincePost / 60) + " " + timeUnits + " ago.";
  } else if (timeSincePost / 3600 >= 1 && timeSincePost / 3600 < 2) { //if the amount of hours is between 1 hours and 1.99 hours
    var timeUnits = "hour";
    var timeSincePost = Math.floor(timeSincePost / 3600) + " " + timeUnits + " ago.";
  } else if (timeSincePost / 3600 >= 2 && timeSincePost / 86400 < 1)  {//if amount of hours is greater than 2 and less than 24 hours 
    var timeUnits = "hours";
    var timeSincePost = Math.floor(timeSincePost / 3600) + " " + timeUnits + " ago.";
  } else if (timeSincePost / 86400 >= 1 && timeSincePost / 86400 < 2) { //if the amount of days is greater than 1 day and less than 2 days
    var timeUnits = "day";
    var timeSincePost = Math.floor(timeSincePost / 86400) + " " + timeUnits + " ago.";
  } else { //Otherwise, use days. (I don't hink we need for months.)
    var timeUnits = "days";
    var timeSincePost = Math.floor(timeSincePost / 86400) + " " + timeUnits + " ago.";
  }
  
  
  var span = document.createElement("span");
  span.setAttribute("class","date");
  span.innerHTML = timeSincePost;
  
  var div = document.createElement("div");
  div.setAttribute("class","line");
  
  var span1 = document.createElement("span");
  span1.setAttribute("class","contents");
  span1.innerHTML = data.text;
  
  messageBox.append(div);
  div.appendChild(span1);
  div.appendChild(span); //Looks like it's a little glitched, that's why I'm using appendChild to add the time of the chat.
});


var getJson = function(word, callback) {
	var url = "https://jsonp.afeld.me/?url=http%3A%2F%2Frhymebrain.com%2Ftalk%3Ffunction%3DgetWordInfo%26word%3D" + word;
	$.getJSON(url, function(data) {
		var pro = data.pron.split(" ").pop().replace(/\d/, "");
		callback(pro);
	});
}


function compare(word1, word2, callback) {

	getJson(word1, function(data1) {
		var pro1 = data1; // <-- 'ou'
    console.log(data1);
		getJson(word2, function(data2) {
			var pro2 = data2; // <-- 'ae'
			console.log(data2);
			if(pro1 == pro2) {
				callback(true)
			} else {
				callback(false)
			}
			//console.log(pro1);
			//console.log(pro2);
		});
	});

}