var x = 1;
var flag = false;
var numbers = [0,1];
var count = 0;
while(flag == false) {
  console.log(x);
  var newValue = numbers[x] + numbers[x-1];
  if(newValue > 4000000) {
    flag = true;
  } else {
    console.log(newValue);
    numbers.push(newValue);
  }
  x++;
}
console.log(numbers);

var y = 0;

while(y < numbers.length) {
  if(numbers[y] % 2 == 0) {
    count = count + numbers[y];
  }
  y++;
}

console.log(count);