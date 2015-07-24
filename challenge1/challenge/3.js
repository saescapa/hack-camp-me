/*
var z = 13195;

var x = 33;
var primes = [1];
while(primes.length < 10) {
  var y = 1;
  while(y < x) {
    if(x % y == 0) {
      console.log("Prime!");
      console.log(x);
      primes.push(x);
      y = x;
    } else {
      console.log(x + " is not prime. with " + y);
    }
    y++;
  }
  x++;
}

*/

function prime(input) {
  var n = input;
  var y = 1;
  while(y < n){
    if(n % y == 0) {
      console.log(n + " is divisible by " + y);
      var flag = true;
    }
    y += 2;
  }
  if(flag) {
    console.log(n + " is not prime");
    return false;
  } else {
    console.log(n + " is prime");
    return true;
  }
}

var z = 600851475143;

var x = 0;
while(x < 1000) {
  if
}

