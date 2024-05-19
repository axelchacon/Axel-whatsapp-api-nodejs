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
				"Bearer EAANs06P61MwBOZCHOpZAhe1VZCW2MZCHNZBTYGKKQx1J7YxndnSGLLZANPDCzx5AZBsn5cZAM256j9IPicuxJZBAauvcwWGrvEp02qeUxppP57WfUvREF034VsBdBBCZBmwjxdpgmbRBzfP0J6XhBnwDf0Se0ZAppBZBFp4tFPRhSqoWFDCYDNE3hA335XgTeg7hEFKAVzKZCvRZCxNVLjxHtksdLp16VlpybfqZCsffmjUGgZDZD",
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
