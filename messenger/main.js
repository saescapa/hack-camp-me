
var messagesRef = new Firebase("https://burning-torch-8975.firebaseio.com/");

var usernameInput = document.getElementById("usernameInput");
var colorInput = document.getElementById("colorInput");
var urlInput = document.getElementById("urlInput");
var messageInput = document.getElementById("messageInput");
var messageList = document.getElementById("messageList");

var keyPressCallback = function (e) {
  if (e.keyCode == 13) { // if user presses enter
    var username = usernameInput.value;
    var color = colorInput.value;
    if (username === "") {
      username = "anonymous";
    }
    var message = messageInput.value;
    var url = urlInput.value;
    
    if(message === "") {
      callError("Please input a message");
    } else {

      var data = {};
      data.name = username;
      data.message = message;
      data.url = url;
      data.color = color;
      messagesRef.push(data);
      
      messageInput.value = "";
      urlInput.value = "";
    }
  }
};

document.onkeypress = keyPressCallback;

var writeMessage = function(name, message, url,color) {
  name = "<span style='color:" + color + "'>" + name + "</span>";
  if(typeof url === "undefined") {
    var messageElement = document.createElement("li");
    
    messageElement.innerHTML = name + ": " + message;
    messageList.appendChild(messageElement);
  } else {
    var messageElement = document.createElement("li");
    var urlElement = document.createElement("a");
    var urlimg = document.createElement("img");
    urlElement.href = url;
    urlimg.src = url;
    messageElement.innerHTML = name + ": " + message;
    messageList.appendChild(messageElement);
    messageList.appendChild(urlElement);
    urlElement.appendChild(urlimg);
  }
};

messagesRef.limitToLast(10).on('child_added', function (snapshot) {
  var data = snapshot.val();
  writeMessage(data.name, data.message, data.url, data.color);
});

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