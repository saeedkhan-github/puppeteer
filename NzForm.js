 const puppeteer = require('puppeteer');

module.exports = {


Login: async function (page){

    await page.type('#LoginUser_UserName','91-20-DEO');
    await page.type('#LoginUser_Password','Pew123@');
    await page.click('#LoginUser_LoginButton');
    // await page.waitForNavigation({ timeout: 60, waitUntil: 'domcontentloaded' });
    // await page.click('li[id="ctl00_LeftNavigation_apDataEntry"]');
    await page.waitFor("li#ctl00_LeftNavigation_apDataEntry");
    const el =   await page.$("li#ctl00_LeftNavigation_apDataEntry");
  
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

           // after Adding spot location timing wait for alert and accept it. 
            await page.on('dialog', async dialog => {
              
                await dialog.accept();
              });
              await page.waitFor('table.grid').then(()=>{
                
                console.log(page.url());
            });

    // await page.waitFor(3000);
      await page.waitFor("input[data-bind='value: NeedleOut']");
},

Fill: async function(page){
   
},


} 





