const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
// const whatsappService = require("../services/whatsappService");
// const samples = require("../shared/sampleModels");
const processMessage = require("../shared/processMessage");
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
			if (message_usuario != "") {
				// let playload_data = samples.SampleText("Hola usuario", number);
				// whatsappService.sendMessage(playload_data);
				processMessage.processMes(message_usuario, number);
			}
			//else if (message_usuario === "Hola image") {
			// 	let playload_data = samples.SampleImage(number);
			// 	whatsappService.sendMessage(playload_data);
			// } else if (message_usuario === "Hola document") {
			// 	let playload_data = samples.SampleDocument(number);
			// 	whatsappService.sendMessage(playload_data);
			// } else if (message_usuario === "Hola buttons") {
			// 	let playload_data = samples.SampleButtons(number);
			// 	whatsappService.sendMessage(playload_data);
			// } else if (message_usuario === "Hola list") {
			// 	let playload_data = samples.SampleList(number);
			// 	whatsappService.sendMessage(playload_data);
			// } else if (message_usuario === "Hola location") {
			// 	let playload_data = samples.SampleLocation(number);
			// 	whatsappService.sendMessage(playload_data);
			// } else {
			// 	let playload_data = samples.SampleText(
			// 		"No te entiendo Amix, Chamo Axel. Meniona 'Hola text', 'Hola image', 'Hola document', 'Hola buttons', 'Hola list', 'Hola location'",
			// 		number
			// 	);
			// 	whatsappService.sendMessage(playload_data);
			// }
		}
		res.send("200");
	} catch (error) {
		myConsole.log(error);
		res.send("400");
	}
};

module.exports = {
	VerifyToken,
	ReceivedMessage,
};
