const puppeteer = require('puppeteer');


(async function manin(){

    try{

        const browser = await puppeteer.launch({headless:true});
        const page= await browser.newPage();

        await page.goto('http://www.nzmis.com/');
        
        await page.setViewport({ width: 1366, height: 768});
       await page.type('#LoginUser_UserName','91-20-DEO');
       await page.type('#LoginUser_Password','Pew123@');
       await page.click('#LoginUser_LoginButton');
        
     await page.screenshot({ path: 'UserName.png', fullPage: true });
        await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();