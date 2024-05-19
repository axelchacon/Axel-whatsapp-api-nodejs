//const fs = require("fs");
//const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function sendMessage(payload) {
	const options = {
		host: "graph.facebook.com",
		path: "/v18.0/265558593313066/messages",
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer EAANs06P61MwBO7bIsHInEBBVTi0fQYv7LaihbNZC2RuRKI9zU8wOC1wlygdMz8FXYnxyHZCqILjH4ZAYp6eZB7rb5HnIYjQPuIUfCrhe9DZCSg6ZCPTFVDz3CKQljdyph2ziGmGa8BLtEOW2Ap1gQRsrAOX0yrnpePnSXLtbUjMcS1ZBjvrb5mMXaYRr9Yr0adrCAZBz1irh4ZCK6fshy1h6hTBVBPgQo8qhABEwZD",
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
