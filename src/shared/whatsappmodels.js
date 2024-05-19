function MessaeSampleText(textResponse, number) {
	const data = {
		messaging_product: "whatsapp",
		to: number,
		text: {
			body: textResponse,
		},
		type: "text",
	};
	return data;
}

module.exports = {
    MessaeSampleText
};