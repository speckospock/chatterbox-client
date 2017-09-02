
class App {
  constructor() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  }
  init() {
    // $('#send .submit').submit(() => {
    //   this.handleSubmit();
    // });
  }
  send(message) {
    $.ajax({
      'url': this.server,
      'type': 'POST',
      'data': JSON.stringify(message),
      'contentType': 'application/json',
      // 'xhrFields': {
      //   'withCredentials': true,
      // },
      'success': (data) => {
        console.log('Message sent: ', data);
      },
      'error': (data) => {
        console.error('Message failed to send: ', data);
      }
    });
  }
  fetch() {
    $.ajax({
      'url': this.server,
      'type': 'GET',
      'data': {
        'order':'-createdAt',
        'limit': '10',
      },
      'success': (data) => {
        //store the data somewhere
        console.log(JSON.stringify(data));
        //render it right away?
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
        //app.send({'username':'BBBB', 'text':'HI'});
        console.log('GOT the data!');
      },
      'error': () => {
        console.error('Failed to GET the data :/');
      }
    });
  }

  clearMessages() {
    $('#chats').children().remove();
  }

  renderMessage(message) {
    //take message and turn it into a dom element
    //append the element to the #chats div
    var msg = message.text;
    var user = message.username;
    $('#chats').append('<div class="' + user + ' message">' + '<button class = "username">' + user + '</button>' + ': ' + msg + '</div>');

    $('.username').click(() => {
      this.handleUsernameClick();
    });
  }

  renderRoom(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
  }

  handleUsernameClick() {
    //do whatever we want to happen when you click a username
    console.log('hi');
  }
  handleSubmit() {
    console.log("anything");
    //var message = $('#sendmessage').val();
    //console.log(message);
  }
}

var app = new App();



$(document).ready(() => {
//to handle the click event and call handleUsernameClick
  //fetch the messages,
  app.init();
  $('#send .submit').submit(() => {
    app.handleSubmit();
  });
  app.fetch();
  var message = {
    'username': 'buddy',
    'text': '',
    'room': 'none',
  };
  //app.send(message);
  //display the messages
});







// '<script>$("body").css("background-image", "url(http://queenofclean.com/webroot/wp-content/uploads/2016/06/american-flag-images-12.jpg)")</script>'
// '<script>$("body").css("background-image", "url(http://queenofclean.com/webroot/wp-content/uploads/2016/06/american-flag-images-12.jpg)")</script>'
//<script>$("body").css("font-size", "3")</script>
