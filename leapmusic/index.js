var cats = {};
var drums_boxes = {
  snare : {
    start : {
      x : 0,
      y : 0
    },
    end : {
      x : 200,
      y : 200
    }
  },
  bass : {
    start : {
      x : -200,
      y : 0
    },
    end : {
      x : 0,
      y : 200
    }
  },
  cymbal : {
    start : {
      x : 0,
      y : 200
    },
    end : {
      x : 200,
      y : 400
    }
  },
}
Leap.loop(function(frame) {
  frame.hands.forEach(function(hand, index) {
    //console.log(hand.type);
    var cat = ( cats[index] || (cats[index] = new Cat()) );    
    cat.setTransform(hand.screenPosition(), hand.roll());
    //console.log(hand.palmPosition[0]);
    //console.log(hand.palmPosition[1]);
  });
  
  frame.gestures.forEach( function(gesture, index) {
    if(gesture.type == "screenTap") {
      console.log("Tap");
      var gesture_handIds = frame.gestures[index].handIds;
      frame.hands.forEach(function(hand, index) {
        var hand = frame.hands[index];
        if(hand.type == "right") {
          if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.snare)) {
              document.getElementById('snare').play();
              document.getElementById('snare').currentTime = 0;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.bass)) {
              document.getElementById('bass').play();
              document.getElementById('bass').currentTime = 0;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.cymbal)) {
              document.getElementById('cymbal').play();
              document.getElementById('cymbal').currentTime = 0;
          }
        }
      });
    } else if (gesture.type == "circle" && gesture.state == "start") {
      console.log("circle");
      frame.hands.forEach(function(hand, index) {
        var hand = frame.hands[index];
        if(hand.type == "right") {
          if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.snare)) {
              loop(document.getElementById('snare_timer').value,false,"snare");
              timer["snare"] = false;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.bass)) {
              loop(document.getElementById('bass_timer').value,false,"bass");
              timer["bass"] = false;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.cymbal)) {
              loop(document.getElementById('cymbal_timer').value,false,"cymbal");
              timer["cymbal"] = false;
          }
        }
      });
    } else if (gesture.type == "swipe") {
      console.log("swipe");
      frame.hands.forEach(function(hand, index) {
        var hand = frame.hands[index];
        if(hand.type == "right") {
          if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.snare)) {
              loop(document.getElementById('snare_timer').value,true,"snare");
              timer["snare"] = true;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.bass)) {
              loop(document.getElementById('bass_timer').value,true,"bass");
              timer["bass"] = true;
          }
          else if (inside(hand.palmPosition[0],hand.palmPosition[1],drums_boxes.cymbal)) {
              loop(document.getElementById('cymbal_timer').value,true,"cymbal");
              timer["cymbal"] = true;
          }
        }
      });
    }
  });
}).use('screenPosition', {scale: 0.25});

var Cat = function() {
  var cat = this;
  var img = document.createElement('img');
  img.src = 'https://i.imgur.com/b1FqGt2.png';
  img.style.position = 'absolute';
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  cat.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.transform = 'rotate(' + -rotation + 'rad)';
    
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

function inside (x,y,value) {
  if(x > value.start.x  && x < value.end.x && y > value.start.y  && y < value.end.y) {
    return true;
  } else {
    return false;
  }
}

var timer = {"snare" : false, "bass" : false, "cymbal" : false};
function loop(time,end,type) {
  if(end == false && timer[type] == false) {
    setTimeout(function () {
        document.getElementById(type + "_loop").play();
        document.getElementById(type).currentTime = 0; 
        loop(time,false,type);
    }, time*10);
  } else if(timer[type] == true) {
    return;
  }
}

cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)