var findSyn = function(words) {
    var url = "find.php?word=" + words;
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    var xmlDoc=xmlhttp.responseXML;
    console.log(xmlDoc);
    var synonyms = xmlDoc.getElementsByTagName("syn");
    var textField = document.getElementById("input");
    var x = 0;
    while(x < synonyms.length) {
      console.log(synonyms[x]);
      textField.appendChild(synonyms[x]);
      x++;
    }
    console.log(String(synonyms[x]));
  };
  
function analyze(words) {
  var value = words.replace(/[\!\?:]+/g, '');
  value = value.replace("s..", '*s*');
  value = value.replace("a..", '*a*');
  value = value.split(" ");
  $.each(value, function(index,word) {
    if(word[0] + word[1] + word[2] == "*s*") {
      console.log(findSyn(word.split("*s*").pop()));
    }
  });
}
var clicked = function() {
    var input = document.getElementById("field").value;
    analyze(input);
  };



window.onload = function() {

  var button = document.getElementById('image');

  var takePhoto = function() {
    var photoUrl = prompt("bo")

    var img = document.createElement("img");
    img.src = photoUrl 
    
    var parent = document.getElementById("images");
    parent.appendChild(img);
  }

  button.onclick = takePhoto;

};

function analyse(text) {
  var x = text.length - 3;
  var array = [];
  while(x < text.length) {
    array.push(text[x]);
    x++;
  }
  if(array == ["o",".","."]) {
    //(a\.\.\w+)|(s\.\.\w+)
  }
  console.log(array);
}
$( "#field" ).keyup(function() {
  analyse($( "#field" ).val());
});