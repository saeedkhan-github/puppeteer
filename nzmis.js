const puppeteer = require('puppeteer');


(async function manin(){

    try{

        var url ='http://www.nzmis.com/';
        const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
        const page= await browser.newPage();
        await page.setViewport({ width: 1600, height: 900});
        await page.goto(url);
        await page.waitFor(() => !!document.querySelector('.textlogin'));
        await page.$eval('input[id=LoginUser_UserName]', el => el.value = '91-20-DEO');
        await page.$eval('input[id=LoginUser_Password]', el => el.value = 'Pew123@');
        await page.click('.submit');
        //wait for Dashboard
        await page.waitFor(()=>!!document.querySelector('.countBox'));
        url=url+'secure/OutreachWorkerServices/RegisterEdit2.aspx?ID=1926731';
        await page.goto(url);
        // await page.waitFor(2000);
        await page.waitForNavigation();

        

        // var eles = await page.$$eval("input[data-bind=value: NeedleOut]");
   
        console.log(await page.evaluate('1 + 2'));

        var syrings = await page.evaluate(function() {
            var ele = document.querySelectorAll("input[data-bind='value: NeedleOut']");
            // setting Value to 3 for NeedleOut
        
          });
          console.log(await page.evaluate(syrings[2]));
           
        // // await page.waitFor(() => !!document.querySelector('.highcharts-point'));
        await page.screenshot({ path: 'nzmisAutomation.png', fullPage: true });
        await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();