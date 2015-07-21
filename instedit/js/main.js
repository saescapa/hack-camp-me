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
}

var clicked = function() {
  var input = document.getElementById("field").value;
  findSyn(input);
}