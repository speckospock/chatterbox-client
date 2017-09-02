
class App {
  constructor() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.availRoom = [];
    this.allMessages = null;
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
        this.fetch();
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
        'limit': '100',
      },
      'success': (data) => {
        //store the data somewhere
        // console.log(JSON.stringify(data));
        //render it right away?
        $('#chats').html('');
        this.allMessages = data;
        this.availRoom = _.uniq(_.pluck(this.allMessages.results, 'roomname'));
        console.log(this.allMessages);
        this.renderRoom(this.allMessages);
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
    // var msg = (!!message.text)? message.text.replace('<script', 'I thought I\'d be clever...') : '';
    if (message.text && message.username) {
      // var msg = message.text;
      var msg = (!!message.text)? message.text.replace('<script', 'I thought I\'d be clever...') : '';
      var user = message.username;
      $('#chats').append('<div class="' + user + ' message">' + '<button class = "username">' + user + '</button>' + ': ' + msg + '</div>');

      $('.username').click(() => {
        this.handleUsernameClick();
      });
    }
  }
  showRoom() {
    var thisApp = this;
    $('#rooms').html('');
    this.availRoom.forEach((room) => {
      $('#rooms').append('<button class = "roomAvail" id = "'+ room + '">' + room + '</button>');
      $('#' + room).click(function() {
        console.log($(this));
        thisApp.renderRoom(thisApp.allMessages, $(this).attr('id'));
      });
    });
    // $('.roomAvail').click(() => {
    //   console.log($(this));
    //   this.renderRoom(this.allMessages, $(this).attr('id'));
    // })
    $('#rooms').toggle();
  }
  renderRoom(data, roomName = 'none') {
    var messagestoShow = data.results;
    console.log(roomName);
    $('#chats').html('');
    $('#roomSelect').append('<div>' + roomName + '</div>');
    if (roomName !== 'none') {
      messagestoShow = _.filter(data.results, (item) => item.roomname === roomName);
    }
    for (var i = 0; i < 20; i++) {
      if (messagestoShow && messagestoShow[i]) {
        app.renderMessage(messagestoShow[i]);
      }
    }
  }

  handleUsernameClick() {
    //do whatever we want to happen when you click a username
    console.log('hi');
  }
  handleSubmit() {
    //console.log("anything");
    //var message = $('#sendmessage').val();
    //console.log(message);
    var user = window.location.search.split('=');
    user = user[user.length - 1];
    var message = {
      // username: window.location.search.split('=')[2],
      username: $('#user').val() ||user|| 'anonymous',
      text: $('#message').val(),

    };

    console.log(user);
    this.send(message);
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
    'username': '',
    'text':  '<script>$("body").css("color", "pink")</script>',
    'room': 'none',
  };
  //app.send(message);
  //display the messages
});







// '<script>$("body").css("background-image", "url(http://queenofclean.com/webroot/wp-content/uploads/2016/06/american-flag-images-12.jpg)")</script>'
//<script>$("body").css("font-size", "3")</script>
