const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless: true});
const page = await browser.newPage();

await page.goto('http://niftyindices.com/resources/holiday-calendar');
await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', 
downloadPath: '/tmp'})
await page.click('#exportholidaycalender');
await page.waitFor(5000);
await browser.close();
})();