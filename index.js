var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/remote.html',function(req,res){
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(__dirname + "/remote.html");
});

app.get('/',function(req,res){
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});



io.on("connection", function(socket){
  console.log("a user connected");
  console.log("connected :"+socket.id);
  socket.on("disconnect", function(){
    console.log("user has disconnected");
  });
});

io.on("connection", function(socket){
  socket.on("chat message", function(msg){
    console.log("message: "+ msg);
  });
});

io.on("connection", function(socket){
  socket.on("chat message", function(msg){
    // io.emit("chat message", msg);
    socket.broadcast.emit("chat message", msg);
  });
});

http.listen(3000, function(){
  console.log("listening on *:3000");
});