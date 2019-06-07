const puppeteer = require('puppeteer');
const BCCServices =require('./BCCServices.js');


(async function manin(){

    try{

        var url ='http://www.nzmis.com/';
        var url2= 'http://www.nzmis.com/secure/OutreachWorkerServices/RegisterEdit.aspx?id=1943448&back=tabbed';
     
        // var url2='secure/OutreachWorkerServices/RegisterEdit2.aspx?ID=1929092';
        const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
        const page= await browser.newPage();
        await page.setViewport({ width: 1600, height: 900});
        await page.goto(url2);
        await page.waitFor(() => !!document.querySelector('.textlogin'));
        await page.$eval('input[id=LoginUser_UserName]', el => el.value = '91-20-DEO');
        await page.$eval('input[id=LoginUser_Password]', el => el.value = 'Pew123@');
        await page.click('.submit');
    
        await page.waitForNavigation();
        await page.goto(url2);
        await page.waitForNavigation();
        var el = await page.$('#ctl00_cphRightContent_btnAddAnotherTop');
         await el.click();
        // await page.waitForSelector('input#ctl00_cphRightContent_btnAddAnotherTop');
      
      


    
        // await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();