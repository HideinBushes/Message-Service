# post and retrieve messages from a web server

This is a server built in Nodejs, it allows clients to post messages, after the server recieves the message, it sends a link back to the clients via email or SMS for retrieving the posted message.

dependencies: 
    "body-parser": "^1.16.0",
    "ejs": "^2.5.5",
    "express": "^4.14.0",
    "nodemailer": "^2.7.2",
    "twilio": "^2.11.1"

To run it on your machine, you need:
  
  1. install node and npm
  2. open a terminal and cd to the root folder
  3. use command npm install to install all dependencies
  4. use commnad node app.js or npm start to start the server.
 
The link sent from the server is only valid when your device is in the same local network with the server(eg. connect to the same router), if you want to deploy it on aws ec2 or heroku, you need:

Change the return of the method # generateLink() (/data/index ) to associate the domain name of you app.

 	generateLink(id){

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
    	return addresses[0]+":3000/message/"+id;  // CHANGE THIS 
    },

