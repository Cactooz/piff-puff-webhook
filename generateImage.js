const Jimp = require("jimp");

async function generateImage(inputText, inputLogo, imageSize) {
	//Defaults if nothing is given
	inputText = inputText || "";
	inputLogo = inputLogo || "";
	imageSize = imageSize || 250;

	//Exit early if no text are added
	if (![...inputText].length) return console.log("\x1b[31mError: \x1b[0mNo text defined to add to image.");

	//Fetch background image
	const image = await Jimp.read("./src/images/background.png");
	//let displacement = await Jimp.read("./src/images/map.png");

	//Only add image if image is sent
	let logo = 0;
	if ([...inputLogo].length) {
		//Fetch logo
		logo = await (await Jimp.read(`./src/images/${inputLogo}`)).resize(imageSize, imageSize).invert();

		//Coordinates for the upper left corner of the logo
		const x = image.bitmap.width / 2 - logo.bitmap.width / 2;
		const y = 150;

		//Add the logo to the image
		image.composite(logo, x, y, {
			//mode: Jimp.BLEND_DARKEN,W
			//opacitySource: 0.9,
			//opacityDest: 1
		});
		console.log("\x1b[32mAdded logo to image.\x1b[0m")
	}

	//Fetch font
	const font = await Jimp.loadFont("./src/font/typewriter_medium.fnt");

	//Coordinates for upper left corner of text
	const x = 150;
	const maxWidth = image.bitmap.width - (2 * x);
	let y = 150;
	let maxHeight = image.bitmap.height - 2 * (y);
	if (logo) {
		y += logo.bitmap.height;
		maxHeight -= logo.bitmap.height;
	}

	//Add centered warpping text to the image
	image.print(
		font, x, y,
		{
			//ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890\"!`?'.,;:()/\\$%#&¢ÄÅÆÖØßäåöø
			text: inputText,
			alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
		},
		maxWidth, maxHeight
	);

	console.log("\x1b[32mAdded text to image.\x1b[0m")

	//Save the new image
	await image.writeAsync("./src/images/message.png");
	console.log("\x1b[32mImage saved.\x1b[0m")
}

module.exports = { generateImage };
