var sendText = function(){
  alert('button pressed!');
  var phoneInput = document.getElementById('phone-number');
  var phoneNumber = phoneInput.value;
  var messageInput = document.getElementById('message');
  var message = messageInput.value;
  maestro.Twilio.sendSms(phoneNumber, message);
  document.getElementById('message').value = '';
};