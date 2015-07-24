var myFirebaseRef = new Firebase("https://rapoom-chat.firebaseio.com/");

$(".input").keypress(function(e){
  var line = $(".input");
  if(e.keyCode == 13) {
    if(line.val() !== "")
    {
      var messageBox = $(".messages");
      var div = document.createElement("div");
      div.setAttribute("class","line");
      div.innerHTML = line.val();
      //messageBox.append(div);
      var enterLine = {};
      enterLine.text = line.val();
      myFirebaseRef.push(enterLine);
      line.val("");
    }
  }
});

myFirebaseRef.limitToLast(3).on('child_added', function (snapshot) {
  var messageBox = $(".messages");
  var data = snapshot.val();
  var div = document.createElement("div");
  div.setAttribute("class","line");
  div.innerHTML = data.text;
  messageBox.append(div);
});
