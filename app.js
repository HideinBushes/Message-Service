
// ================================================================
// modules
// ================================================================
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes"); //router middleware
var port = process.env.PORT || 3000;
// ================================================================
// mandrill
// ================================================================


var app = express();

// ================================================================
// setup express application
// ================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

routes(app);

app.listen(port, function(){
	console.log("server is running on http://localhost:"+ port);
});
