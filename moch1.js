var assert = require('assert');

var expect = require('chai').expect;
const puppeteer = require('puppeteer');

let browser;
let page;
describe('NZMIS', function() {
    this.timeout(15000);

    before(async () => {
        browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
       
        page = await browser.newPage();
      });
    // before(async function() {
     
    //      browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
    //      page= await browser.newPage();

    //     await page.setViewport({ width: 1366, height: 768});
    //     await page.goto('http://www.nzmis.com/');
      
    //   });

      it('Login into MIS',async function(){
        await page.setViewport({ width: 1366, height: 768});
        await page.goto('http://www.nzmis.com/');
        expect(await page.title()).to.equal('NZMIS System');
        // await page.type('#LoginUser_UserName','91-20-DEO');
        // await page.type('#LoginUser_Password','Pew123@');
        // await page.click('#LoginUser_LoginButton');
        
     });

    //  after(async function(){
    //     await page.waitFor(5000);
        
    //      await browser.close();
    //  });
    
}); // end brac of describe