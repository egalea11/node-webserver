const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

app.set("view engine", "hbs");


// .use registers express middleware
// for connecting to database, user authentication, etc.
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile("server.log", log + '\n', (error) => {
    if(error){
      console.log("Unable to append to file.")
    }
  })
  next();
});

// app.use((request, response, now) => {
//   response.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

// setup partial html directories
hbs.registerPartials(__dirname + "/views/partials");

// setup helper functions
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (request, response) => {
  // response.send("<h1>Hello Express!</h1>");
  response.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to page!",
    currentDate: new Date().getDate()
  });
});

app.get("/about", (request, response) => {
  response.render("about.hbs", {
    pageTitle: "About Page",
  });
});

app.get("/bad", (request, response) => {
  response.send({
    error: "!$%@#",
    text: "An error has occured god damn it!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
