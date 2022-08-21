const { Webhook } = require('discord-webhook-node');
const webhook = new Webhook("url");

//Send just a text message
function sendText(text) {
	webhook.send(text)
		.then(() => console.log("\x1b[32mSent text to Webhook\x1b[0m"))
		.catch(error => console.log(error));
}

//Send a @ message followed by the image with the real text
function sendImage() {
	webhook.send("@everyone incomming transmission...")
	webhook.sendFile("./src/images/message.png")
		.then(() => console.log("\x1b[32mSent image to Webhook\x1b[0m"))
		.catch(error => console.log(error));
}

module.exports = { sendText, sendImage };
