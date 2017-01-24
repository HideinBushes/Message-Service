var data = require("../data");
var fs= require("fs");
var os = require("os");
var constructorMethod = function(app){
	app.get("/", function(req, res){
		res.render("pages/index");
	});

	app.post("/",function(req, res){
		var message = req.body;
		console.log(message);

		var id = data.updateMessageChunk(message)-1;
		var link = data.generateLink(id);
		var destination = message.email;
		var phone = message.tel;
		console.log(link);
		if(message.type == 'email'){
			data.sendByEmail(link, destination);
			res.json({
			success:true,
			status:"a link contains your message has been sent to this email address"
		});
		}
		if(message.type == 'SMS'){
			data.sendBySMS(link,phone);
			res.json({
			success:true,
			status:"a link contains your message has been sent to this phone number"
		});
		}
	})

	app.get("/message/:id", function(req, res){
		var chunk = fs.readFileSync('./data/messages.json');
		var chunkObj = JSON.parse(chunk);
		var message = chunkObj.messages[req.params.id].message;
		res.json(message);

	});
};

module.exports = constructorMethod;