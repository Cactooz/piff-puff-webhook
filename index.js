const generate = require("./generateImage.js");
const send = require("./webhook.js");
const yargs = require("yargs/yargs");

//Extract the arguments
const args = yargs(process.argv.slice(2)).argv;

async function main() {
	//Check if an image should be sent or just plain text
	if (args.image) {
		//Generate image with the text
		await generate.generateImage(args.text, args.logo, args.size);
		send.sendImage();
	} else
		send.sendText(args.text);
}

main().catch(error => console.log(error));
