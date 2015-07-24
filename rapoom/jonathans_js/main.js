var myFirebaseRef = new Firebase("https://rapoom-chat.firebaseio.com/");

$(".input").keypress(function(e){
  var line = $(".input");
  if(e.keyCode == 13) {
    if(line.val() !== "" && line.val().trim().length > 9) {
      
      //Compare rhymes.
      var lastWord = "hello";
      var newWord = "jello";
    
      var doesMatch = compare(lastWord, newWord);
      
      if (doesMatch) {
        // add to database
      }
      else {
        // yell at the user
      }
      
      
    } else {
      alert("Please input more than 9 characters. Currently " + line.val().trim().length);
    }
  }
});

function rhymes(lastWord, newWord, callback) {
  
  var wordOneUrl = "https://jsonp.afeld.me/?url=http%3A%2F%2Frhymebrain.com%2Ftalk%3Ffunction%3DgetWordInfo%26word%3D" + lastWord;
  var wordTwoUrl = "https://jsonp.afeld.me/?url=http%3A%2F%2Frhymebrain.com%2Ftalk%3Ffunction%3DgetWordInfo%26word%3D" + newWord
  
  function firstWordCallback(data) {
    var firstPro = data.pron.replace(/\d/, "").split(" ").pop();
    
    $.getJSON(wordTwoUrl, function(datas) {
      var secondPro = datas.pron.replace(/\d/, "").split(" ").pop();
      
    
      // if(firstPro == secondPro) {
      //   console.log("The match.",firstPro,secondPro);
        
      // }
      // console.log("The match.",firstPro,secondPro);
    });
  }
  
  $.getJSON(wordOneUrl, firstWordCallback);

}

myFirebaseRef.limitToLast(4).on('child_added', function (snapshot) {
  var messageBox = $(".messages");
  var data = snapshot.val();
  
  //This is just to save some time tomorrow. I'll explain tomorrow real quick.
  
  var timeSincePost = Math.floor((new Date().getTime() - data.date) / 1000); //Calculate the amount of seconds between the current date and the date the post was posted.
  var timeUnits = timeToEnglish(timeSincePost);
  
  var span = document.createElement("span");
  span.setAttribute("class","date");
  span.innerHTML = timeSincePost;
  
  var div = document.createElement("div");
  div.setAttribute("class","line");
  div.innerHTML = data.text;
  
  messageBox.append(div);
  div.appendChild(span); //Looks like it's a little glitched, that's why I'm using appendChild to add the time of the chat.
});

