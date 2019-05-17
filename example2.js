const puppeteer = require('puppeteer');


(async function manin(){

    try{

        var url ='http://www.nzmis.com/';
        const browser = await puppeteer.launch({headless:true});
        const page= await browser.newPage();

        await page.goto(url);
        
        await page.setViewport({ width: 1366, height: 768});
        await page.waitFor(() => !!document.querySelector('.textlogin'));
        await page.$eval('input[id=LoginUser_UserName]', el => el.value = '91-20-DEO');
        await page.$eval('input[id=LoginUser_Password]', el => el.value = 'Pew123@');
        await page.click('.submit');
        await page.waitForNavigation();
       
        await page.waitFor(() => !!document.querySelector('.highcharts-point'));
        await page.screenshot({ path: 'myscreenshot.png', fullPage: true });
        await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();