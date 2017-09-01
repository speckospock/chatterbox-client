// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/
var app = {}; //possibly refactor to a class later?

app.server = 'http://parse.sfm6.hackreactor.com/';

app.init = () => {

};

app.send = (message) => {
  $.ajax({
    'url': app.server,
    'type': 'POST',
    'data': message, //JSON.stringify(message),
    'contentType': 'application/json',
    'success': (data) => {
      console.log('Message sent: ', data);
    },
    'error': (data) => {
      console.error('Message failed to send: ', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    'url': app.server,
    'type': 'GET',
    'success': () => {
      console.log('GOT the data!');
    },
    'error': () => {
      console.fail('Failed to GET the data :/');
    }
  });
};

app.clearMessages = () => {
  $('#chats').children().remove();
};

app.renderMessage = (message) => {
  //take message and turn it into a dom element
  //append the element to the #chats div
  var msg = message.text;
  var user = message.username;
  $('#chats').append('<div class="' + user + ' message">' + '<button class = "username">' + user + '</button>' + ': ' + msg + '</div>');

  $('.username').click(() => {
    app.handleUsernameClick();
  });
};

app.renderRoom = (roomName) => {
  $('#roomSelect').append('<div>' + roomName + '</div>');
};

app.handleUsernameClick = () => {
  //do whatever we want to happen when you click a username
  console.log('hi');
};


$(document).ready(() => {
//to handle the click event and call handleUsernameClick

});
