<?php

$word = $_GET["word"];

//print_r($word);

// This function grabs the definition of a word in XML format.
function grab_xml_definition ($word, $ref, $key) {	
  $uri = "http://www.dictionaryapi.com/api/v1/references/" . urlencode($ref) . "/xml/" . 
					urlencode($word) . "?key=" . urlencode($key);
	  header('Content-type: text/xml');
		echo file_get_contents($uri);
	};

$xdef = grab_xml_definition($word, "thesaurus", "02194a6a-435e-44cd-8319-c67037178fcb");

?>