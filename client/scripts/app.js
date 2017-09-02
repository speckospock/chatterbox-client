
class App {
  constructor() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.availRoom = [];
    this.allMessages = null;
    this.friendsList = {};
    this.selectedRoom = 'none';
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
        //console.log(JSON.stringify(data));
        //render it right away?
        $('#chats').html('');
        this.allMessages = data;
        this.availRoom = _.uniq(_.pluck(this.allMessages.results, 'roomname'));
        //console.log(this.allMessages);
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
    if (message.text) {
      // var msg = message.text;
      var msg = (!!message.text)? message.text.replace('<script', 'I thought I\'d be clever...') : '';
      var user = message.username || 'anonymous';
      var container = $('<div>').addClass(user.split(' ')[0]);
      var displayMessage = $('<span>' + msg + '</span>').addClass(user.split(' ')[0]);
      var userButton = $('<button>' + user + '</button>').addClass('username').click(() => {
        this.handleUsernameClick(user);
      });
      //userButton.append(displayMessage);
      // displayMessage.append(userButton);
      container.append(userButton);
      container.append(displayMessage);
      //console.log(displayMessage);

      $('#chats').append(container);
      //$('#chats').append('<div class="' + user + ' message">' + '<button class = "username">' + user + '</button>' + ': ' + msg + '</div>');

      //$('div.' + user).click(() => {
      //  this.handleUsernameClick(user);
      //});
      return true;
    }
  }
  showRoom() {
    var thisApp = this;
    $('#rooms').html('');
    $('#rooms').append('<button class = "roomAvail" id = "none">none</button>');
    $('#none').click(function(){
      thisApp.selectedRoom = 'none';
      thisApp.renderRoom(thisApp.allMessages);
      $('#rooms').toggle();
    });
    this.availRoom.forEach((room) => {
      $('#rooms').append('<button class = "roomAvail" id = "'+ room + '">'
        + room + '</button>');
      $('#' + room).click(function() {
        //console.log($(this));
        thisApp.selectedRoom = $(this).attr('id');
        thisApp.renderRoom(thisApp.allMessages);
        //thisApp.renderRoom(thisApp.allMessages, $(this).attr('id'));
      });
    });
    // $('.roomAvail').click(() => {
    //   console.log($(this));
    //   this.renderRoom(this.allMessages, $(this).attr('id'));
    // })
    $('#rooms').toggle();
  }
  showFriends() {
    var friendsFriends = this.friendsList;
    $('#friends').html('');

    //put every single one of our friends in our friends list into #friends
    for (var i in friendsFriends) {
      $('#friends').append('<div class = "friendButton" id = "' + friendsFriends[i] +
      '">' + friendsFriends[i] + '</div>');

    }
    //$('#friends').toggle();
  }
  renderRoom(data) {
    var data = data || this.allMessages;
    var messagestoShow = data.results;
    //console.log(roomName);
    $('#chats').html('');
    $('#roomSelect').append('<div>' + this.selectedRoom + '</div>');
    if (this.selectedRoom !== 'none') {
      messagestoShow = _.filter(data.results, (item) => item.roomname === this.selectedRoom);
    }
    var countmsg = 0;
    for (var i = 0; i < 100; i++) {
      if (messagestoShow && messagestoShow[i] && countmsg <= 20) {
        var rendered = app.renderMessage(messagestoShow[i]);
        if (rendered) {
          countmsg++;
        }
      }
    }
  }

  handleUsernameClick(user) {
    //do whatever we want to happen when you click a username
    //console.log($("." + user));
    //console.log(user);
    var $user = $('div.' + user.split(' ')[0]);
    if ($user.hasClass('friend')) {
      $user.removeClass('friend');
    } else {
      $user.addClass('friend');
    }
    //when we click, we want to push the username into friendsList
    if(!!this.friendsList[user]) {
      delete this.friendsList[user];
    } else {
      this.friendsList[user] = user;
    }

    this.showFriends();
    // if($user.css('font-weight') === 'bold'){
    //   $user.css('font-weight', 'normal');
    // } else {
    //   $user.css('font-weight', 'bold');
    // }
    //want to filter out all those messages associated with the selected friend
    //render them in bold
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

    //console.log(user);
    this.send(message);
    this.renderRoom();
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
