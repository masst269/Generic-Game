var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var people = require('./people');
var app = express();
var port = process.env.PORT || 3000;

Object.keys(people).forEach(function (person) {
  if (people[person].age >= 65) {
    people[person].is65OrOlder = true;
  }
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Serve static files from public/.
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page for the root URL path ('/').
app.get('/', function (req, res) {
  res.render('index-page'});
});

/*
 * Render the people page for the URL path '/people'.  Pass our people data
 * to Handlebars to use in filling out the page template.
 */
app.get('/people', function (req, res) {
  res.render('people-page', {
    pageTitle: 'Famous People',
    people: people
  });
});

/*
 * Use a dynamic route to render a page for each individual person.  Provide
 * that person's data to Handlebars so it can fill out the template.
 */
app.get('/people/:person', function (req, res, next) {

  var person = people[req.params.person];

  if (person) {

    res.render('person-page', {
      pageTitle: person.name,
      person: person
    });

  } else {

    // If we don't have info for the requested person, fall through to a 404.
    next();

  }

});

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
