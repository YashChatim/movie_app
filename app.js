const express = require("express"); // const instead of var is es6 syntax when the value wont change
const app = express();
const request = require("request");


app.get("/", function(req, res) {
   res.render("search.ejs"); // res.render() helps to send content of the files
});


app.get("/results", function(req, res){ // route
    var query = req.query.search; // what is inputted by the user in the form
                                      // here search is the value of name=""
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, (error, response, body) => { // replace function with => arrow function in es6
       if (!error && response.statusCode == 200) { // statusCode == 200 meaning its ok
           var parseData = JSON.parse(body); // body was in string format, so we use JSON.parse to turn it into a JS object
           res.render("result.ejs", {parseData: parseData}); // {parseData: parseData} the contents of parseData is sent to parseData which is furthur used in result.ejs 
       }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){ // process.env.PORT, process.env.IP  - environmental viriables set up for cloud9 which we access
   console.log("Server started"); 
});