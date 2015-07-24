function timeToEnglish(timeSincePost) {
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
  
  return timeUnits;
}