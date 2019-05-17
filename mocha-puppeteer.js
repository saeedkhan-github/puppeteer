const assert = require('assert');
const puppeteer = require('puppeteer');

let browser
let page

before(async()=>{
    browser = await puppeteer.launch();
    page = await browser.newPage();

});

decribe('Duck Duc go Search',()=>{
    it('returns Chrome Puppeteer Github repo as first search result"', async () => {

        await page.goto('http://www.nzmis.com/', { waitUntil: 'networkidle2' });
      
 
    //     const githubLink = await page.evaluate(() => document.querySelector('a.result__a').textContent.trim());
    //     assert(githubLink, 'https://github.com/GoogleChrome/puppeteer');
    //     await page.screenshot({ path: 'duckduckgo.png' });
    //   }).timeout(10000);
});
 });

after(async () => {
    await browser.close()
  });