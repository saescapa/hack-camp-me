var x = 0;
var count = 0;
while(x < 1000) {
  console.log(x);
  console.log("Count");
  if(x%3 == 0 || x%5 == 0) {
    count = count + x;
  }
  console.log(count);
  x++;
}