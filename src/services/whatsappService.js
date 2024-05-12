//const fs = require("fs");
//const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function sendMessage(phone_number, message, messageType) {
	const payload = {
		messaging_product: "whatsapp",
		to: phone_number,
		type: messageType,
	};
	// Añadir contenido según el tipo de mensaje
	if (messageType === "text") {
		payload.text = { preview_url: true, body: message };
	} else if (messageType === "image") {
		payload.image = { link: message };
	}
	const options = {
		host: "graph.facebook.com",
		path: "/v18.0/265558593313066/messages",
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer EAANs06P61MwBOxAb4gO3vg9dxZCeh3JwZBsypJvw28dBvYUbXFY1270d55eDl8aCZBHUY4eonQXBxS2JVwH5bx2LrXAsQsJqZBj6IVFP2ReyYXTkZCRSfZBRSw2YTvLrEuMNfbzZCicKngoMDtbmgGEPcwxytZAre7Hv0TZBx3f5sgTOokVngBj8i3ycVnZAoSqOwMC0l93603OaZBOM4yTM7aYLJl9b5pAG0nlj0PL",
		},
		method: "POST",
		payload: JSON.stringify(payload),
	};
	const req = https.request(options, (res) => {
		res.on("payload", (d) => {
			process.stdout.write(d);
		});
	});

	req.on("error", (error) => {
		console.error(error);
	});
	req.write(JSON.stringify(payload));
	req.end();
}

module.exports = {
	sendMessage,
};
