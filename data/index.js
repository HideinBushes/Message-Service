var fs = require("fs");
var os = require("os");
var nodemailer = require("nodemailer");
var twilio =require("twilio");

var exportedMethods = {
	updateMessageChunk(message){
		var chunk = fs.readFileSync('./data/messages.json');
		var chunkObj = JSON.parse(chunk);
		chunkObj.messages.push(message);
		var update =JSON.stringify(chunkObj,null,4);
		fs.writeFileSync('./data/messages.json', update, 'utf8');
		return chunkObj.messages.length;
	},

	generateLink(id){
		var os = require('os');

		var interfaces = os.networkInterfaces();
		var addresses = [];
		for (var k in interfaces) {
    		for (var k2 in interfaces[k]) {
        		var address = interfaces[k][k2];
	        	if (address.family === 'IPv4' && !address.internal) {
	            	addresses.push(address.address);
	        	}
    		}
    	}
    	return addresses[0]+":3000/message/"+id;
    },

    sendByEmail(message, destination){
    	var mailOptions = {
    		from: "Pandong",
    		to: destination,
    		subject: 'Retrieve you message',
    		html: message,
    	};
    	var transporter = nodemailer.createTransport({
    		service: "Gmail",
    		secureConnection: true,
    		port:465,
    		auth:{
    			user:"mailboxforcoding@gmail.com",
    			pass:"2012089656"
    		}
    	});

    	transporter.sendMail(mailOptions,function(error, info){
    		if(error){
    			console.log(error);
    		}
    		else{
    			console.log('link is sent to' + destination + ': ' + info.response);
    		}
    	});
    },

    sendBySMS(message, phone){
    	var accountSid = 'ACed9358e393ab44d44c5de78ce6875182';
    	var accountToken = '33ed048232f7a1c1497d148bac647faa';

    	var client = twilio(accountSid, accountToken);

    	client.sendMessage(
    		{
	    		to: phone,
	    		from: "+18622363866",
	    		body: "Copye the following link to your browser to retrieve the message: "+message
    		},

    		function(err, message){
    		console.log(message.sid);
    	});
    }

}



module.exports = exportedMethods;

