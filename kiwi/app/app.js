var details_link = "https://jsonp.afeld.me/?url=https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBBVibG9xaaqeTHPCU5POgBs2MgdkyjDM0&placeid="; //Gets Reviews from placeid
var placeid_link = "https://jsonp.afeld.me/?url=https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1500&types=food&key="  //Gets placeid from location
var api_key = "AIzaSyBBVibG9xaaqeTHPCU5POgBs2MgdkyjDM0";
var details_api_link = "https://jsonp.afeld.me/?url=https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fdetails%2Fjson%3Fkey%3DAIzaSyBBVibG9xaaqeTHPCU5POgBs2MgdkyjDM0%26placeid%3D"
var placeid_api_link = "https://jsonp.afeld.me/?url=https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fnearbysearch%2Fjson%3Fradius%3D1500%26types%3Dfood%26key%3DAIzaSyBBVibG9xaaqeTHPCU5POgBs2MgdkyjDM0%26location%3D";
var geocoding_api_link = "https://jsonp.afeld.me/?url=https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Fkey%3DAIzaSyBBVibG9xaaqeTHPCU5POgBs2MgdkyjDM0%26address%3D";

//placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&
//&location=-33.8670522,151.1957362
//&address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

//
function retrieveReviews(input,name){
  var location = input.split(' ').join('+');
  if (typeof name !== 'undefined') { var name_exists = true; name = name.split(' ').join('+'); } else { var name_exists = false; }
  var coordinates = geocoding_api_link + location;
  //console.log(coordinates->results->geometry->location->lng);
  $.getJSON( coordinates, function( coord_data ) {
    var result = coord_data.results;
    console.log(result);
    console.log(coord_data.results[0].formatted_address);
    var lat = coord_data.results[0].geometry.location.lat;
    var lng = coord_data.results[0].geometry.location.lng;
    console.log(lat);
    console.log(lng);
    var input_coordinates = [lat,lng]
    console.log(input_coordinates);
    var placeid = placeid_api_link + lat + "," + lng;
    if (name_exists) { placeid = placeid + "%26name&3D" + name; }
    console.log(placeid);
    $.getJSON(placeid, function(place_data) {
      var place_ids = []
      $.each ( place_data.results, function(i,value) {
        place_ids.push([place_data.results[i].name,place_data.results[i].place_id]);
      });
      console.log(place_ids);
      
      var reviews = [];
      $.each(place_ids, function(i,value) {
        console.log(details_api_link + value[1]);
        $.getJSON(details_api_link + value[1], function(id_data) {
          var custom_review = [];
          $.each ( id_data.result.reviews, function(x,values) {
            custom_review.push(values.text);
          })
          reviews.push([value[0],value[1],id_data.result.rating,custom_review]);
          console.log(reviews);
          if(i == place_ids.length-1) {
            $.each(reviews, function (id,name) {
              $('#list').append("Name: " + name[0] + " <br> Rating: " + name[2] + "<br> Reviews: " + name[3]  + "<br><br>");
            });
          }
        });
      });
    });
  });
}
retrieveReviews("San Francisco, CA","happy");
