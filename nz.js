const puppeteer = require('puppeteer');


(async function manin(){

    try{

        const browser = await puppeteer.launch({headless:false});
        const page= await browser.newPage();

        await page.goto('http://www.nzmis.com/');
        

        await page.setViewport({ width: 1366, height: 768});
        await page.waitFor(() => !!document.querySelector('.textlogin'));
        await page.$eval('input[id=LoginUser_UserName]', el => el.value = '91-20-DEO');
        await page.$eval('input[id=LoginUser_Password]', el => el.value = 'Pew123@');
        await page.click('.submit');
        await page.waitFor(() => !!document.querySelector('.highcharts-point'));
        await page.goto('http://nzmis.com/secure/OutreachWorkerServices/RegisterEdit2.aspx?ID=1828924&no=5');
        await page.waitFor(5000);
        await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();