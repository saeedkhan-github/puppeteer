const puppeteer = require('puppeteer');
module.exports= async function(){
const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
        const page= await browser.newPage();

        await page.setViewport({ width: 1366, height: 768});
        
}