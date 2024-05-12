const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const whatsappService = require("../services/whatsappService");
const VerifyToken = (req, res) => {
	//res.send("Hola verifyToken");
	try {
		var accessToken = "12345aa";
		var token = req.query["hub.verify_token"];
		var challenge = req.query["hub.challenge"];
		if (challenge != null && token != null && token == accessToken) {
			res.send(challenge);
		} else {
			res.status(400).send();
		}
	} catch (error) {
		res.status(400).send();
	}
};
const ReceivedMessage = (req, res) => {
	//res.send("Hola Received");
	try {
		const entry = req.body["entry"][0];

		const changes = entry["changes"][0];
		const value = changes["value"];
		const dataMessages = value["messages"];
		//myConsole.log(dataMessages);
		if (typeof dataMessages != "undefined") {
			const messages = dataMessages[0];
			const number = messages["from"];
			const message_usuario = messages["text"]["body"];
			myConsole.log(message_usuario);
			myConsole.log(number);
			whatsappService.sendMessage(
				number,
				"el usuario dijo: " + message_usuario,
				"text"
			);
		}
		res.send("EVENT_RECEIVED");
	} catch (error) {
		myConsole.log(error);
		res.send("EVENT_RECEIVED");
	}
};

module.exports = {
	VerifyToken,
	ReceivedMessage,
};
