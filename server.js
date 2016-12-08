var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var usersData = require('./users-data');
var port = process.env.PORT || 3000;

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('index-page');
});

function startPause(){
app.get('/', function (req, res) {
  res.render('actions-page');
});
if(running == 0){
    running = 1;
    increment();
document.getElementById("start").innerHTML = "Pause";
document.getElementById("startPause").style.backgroundColor = "red";
document.getElementById("startPause").style.borderColor = "red";
}
else{
    running = 0;
document.getElementById("start").innerHTML = "Resume";
document.getElementById("startPause").style.backgroundColor = "green";
document.getElementById("startPause").style.borderColor = "green";
}

};

function find(){
  app.get('/', function (req, res) {
    res.render('YouWon-page');
  });
};

function next(){
  app.get('/', function (req, res) {
  res.render('LeaderBoard');
});
};

function reset(){
    running = 0;
    time = 0;
    document.getElementById("start").innerHTML = "Start";
    document.getElementById("output").innerHTML = "0:00:00:00";
    document.getElementById("startPause").style.backgroundColor = "green";
    document.getElementById("startPause").style.borderColor = "green";
};
function increment(){
    if(running == 1){
        setTimeout(function(){
            time++;
            var mins = Math.floor(time/10/60);
            var secs = Math.floor(time/10 % 60);
            var hours = Math.floor(time/10/60/60);
            var tenths = time % 10;
            if(mins < 10){
                mins = "0" + mins;
            }
            if(secs < 10){
                secs = "0" + secs;
            }
            document.getElementById("output").innerHTML = hours + ":" + mins + ":" + secs + ":" + tenths + "0";
            increment();
        },100)
    }
};

// If we didn't find the requested resource, send a 404 error.
app.get('*', function(req, res) {
  res.status(404).render('404-page', {
    pageTitle: '404'
  });
});

// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
