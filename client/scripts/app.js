// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/
var app = {}; //possibly refactor to a class later?

app.server = 'http://parse.sfm6.hackreactor.com/'

app.init = () => {

}

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
}

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
}
