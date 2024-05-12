const express = require("express");
const apiRoute = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use("/whatsapp", apiRoute);
app.listen(PORT, () => {
	console.log("el puerto es: " + PORT);
});

/// usar  en tu powersheell "ngrok http http://localhost:3001/"  para crear la URL webhook que permitirá a whatsapp enviar mensajes"
