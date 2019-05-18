const puppeteer = require('puppeteer');


(async function manin(){

    try{

        const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
        const page= await browser.newPage();

        await page.setViewport({ width: 1366, height: 768});
        await page.goto('http://www.nzmis.com/');
      
       await page.type('#LoginUser_UserName','91-20-DEO');
       await page.type('#LoginUser_Password','Pew123@');
       await page.click('#LoginUser_LoginButton');
        // await page.waitForNavigation({ timeout: 60, waitUntil: 'domcontentloaded' });
        // await page.click('li[id="ctl00_LeftNavigation_apDataEntry"]');
        await page.waitFor("li#ctl00_LeftNavigation_apDataEntry");
         const el =   await page.$("li#ctl00_LeftNavigation_apDataEntry");
        // await page.$('li#ctl00_LeftNavigation_apDataEntry a:first').click();
            await el.click();
            
            await page.waitForSelector("a#ctl00_LeftNavigation_hlnkServices");
        const servic = await page.$("a#ctl00_LeftNavigation_hlnkServices");
            await servic.click();
          
            await page.waitForSelector("input#ctl00_cphRightContent_tcTabContainer_tpOutreachWorkerServices_ucOutreachWorkerServices_lbtnAddRecord")
        const addService= await page.$("input#ctl00_cphRightContent_tcTabContainer_tpOutreachWorkerServices_ucOutreachWorkerServices_lbtnAddRecord");
            await addService.click();

            await page.waitForNavigation();
            await page.waitFor('select#ctl00_cphRightContent_ddlArea');
            await page.select('#ctl00_cphRightContent_ddlArea', '1074');
            await page.select('#ctl00_cphRightContent_ddlSpot','1626');
            // await page.waitFor(3000);

            // // after Adding spot location timing wait for alert and accept it. 
            // await page.on('dialog', async dialog => {
              
            //     await dialog.accept();
            //   });
            // Wait for the Table/Form to appear

            await page.waitForSelector("input[data-bind='value: NeedleOut']").then(()=>{
                // var el = document.querySelectorAll("input[data-bind='value: NeedleOut']");
                // for(i=0; i<el.length; i++){
                //            el[i].value=3; 

             await page.$$eval("input[data-bind='value: NeedleOut']",el=>{
                        for(i=0; i<el.length; i++){
                             el[i].value=3; 
                    }
                     });

                       }
            });
            // Setting Values for Needle Out
                    // await page.$$eval("input[data-bind='value: NeedleOut']",el=>{
                    //     for(i=0; i<el.length; i++){
                    //         el[i].value=3; 
                    //     }
                    // });

       

            await page.screenshot({ path: 'UserName.png', fullPage: true });
        // await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();