const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");
function processMes(textUser, number) {
	textUser = textUser.toLowerCase();
	var models = [];
	if (textUser.includes("hola")) {
		//Saludar
		var model = whatsappModel.MessaeSampleText(
			"ola, un gusto saludarte",
			number
		);
		models.push(model);
	} else if (textUser.includes("gracias")) {
		var model = whatsappModel.MessaeSampleText(
			"Gracias a ti por escribirme",
			number
		);
		models.push(model);
	} else if (
		textUser.includes("adiós") ||
		textUser.includes("adios") ||
		textUser.includes("bye") ||
		textUser.includes("me voy")
	) {
		var model = whatsappModel.MessaeSampleText("Ve con cuidado", number);
		models.push(model);
	} else {
		var model = whatsappModel.MessaeSampleText(
			"No entiendo lo que dices",
			number
		);
		models.push(model);
	}
	models.forEach((model) => {
		whatsappService.sendMessage(model);
	});
}

module.exports = {
	processMes,
};
