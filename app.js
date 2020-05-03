const fs = require('fs')
const puppeteer = require("puppeteer")

const read_config = () => {
	try {
		const dataBuffer = fs.readFileSync('config.json')
		return JSON.parse(dataBuffer.toString())
	} catch (e) {
		console.log("config.json not found: default values")
		return {
			delay: { cpm: 3, end_break: 10000 },
			screen: { width: 1200, height: 800 },
			scroll: { first: 1000, second: 400 }
		}
	}
};

const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

const main = async () => {
	const config = read_config(); // load config.json file
	
	const browser = await puppeteer.launch({ // set the browser
		headless: false,
		args: [`--window-size=${config.screen.width},${config.screen.height}`]
	});
	const page = await browser.newPage(); // set the page
	await page.setViewport({ width: config.screen.width, height: config.screen.height });
	
	await page.goto("https://typing-speed-test.aoeu.eu/"); // go to ' typing-speed-test.aoeu.eu '
	
	const cookie_button = await page.$('.cookies_ok'); // accept cookies
	if (cookie_button) await cookie_button.click();

	await page.evaluate((y_scroll) => window.scrollBy(0, y_scroll), config.scroll.first) // scroll
	
	await page.focus('#input'); // focus on the input
	
	while (await page.$('#result') == null) { // work until results are displayed
		let currentword_value = await page.$eval('#currentword', el => el.innerHTML); // get the current word
		await page.keyboard.type(currentword_value + ' ', { delay: config.delay.cpm }); // write the current word and jump to the next
	}
	
	await page.evaluate((y_scroll) => window.scrollBy(0, y_scroll), config.scroll.second) // scroll
	
	await sleep(config.delay.end_break); // wait
	await browser.close(); // close browser
}

main();