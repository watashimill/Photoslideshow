// basic variables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs'); // required for file serving

fs.readdir("./image", function(err, items) {
  member= items;
  console.log(items.length);
  console.log(items);

}); 

http.listen(3000, function(){
  console.log('listening on *:3000');
});
// location to index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
// trying to serve the image file from the server
var s=[];
io.on('connection', function(socket){
    setTimeout(function(){
      for(i=0;i<member.length;i++){
        fs.readFile("./image/"+member[i], function (err, data) {
          if (err) throw err;
          s.push('data:picture'+i+'/jpg;base64,'+new Buffer(data).toString('base64')+'');
          }
        );
      }
    },5);  
    console.log("Number="+s.length);
    socket.emit('image',s);
    s = [];

});