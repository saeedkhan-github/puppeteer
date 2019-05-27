const assert = require('chai').assert;
const expect = require('chai').expect;
const puppeteer = require('puppeteer');

let browser
let page

// before(async()=>{
//     browser = await puppeteer.launch();
//     page = await browser.newPage();

// });

decribe('Frist test Suit',function(){
    it( 'test1', () => {
        const result = true;
        expect(result).to.equal(true);
      });

});


// after(async () => {
//     await browser.close()
//   });