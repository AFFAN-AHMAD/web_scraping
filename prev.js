const puppeteer = require("puppeteer");

async function start() {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto("https://food.grab.com/sg/en/");
  await page.type("#location-input", "kampong");
  await page.click(".ant-btn submitBtn___2roqB");
}
start();
