const puppeteer = require('puppeteer');
const BCCServices =require('./BCCServices.js');


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
            await page.waitFor(3000);

            // after Adding spot location timing wait for alert and accept it. 
            await page.on('dialog', async dialog => {
              
                await dialog.accept();
              });
              await page.waitFor('table.grid').then(()=>{
                
                console.log(page.url());
            });


      await page.waitFor("input[data-bind='value: NeedleOut']");
      
// Setting Values for Needle Out
    await page.$$("input[data-bind='value: NeedleOut']").then(async(ee)=>{
       for(var i=0; i<ee.length; i++){
       await ee[i].click({clickCount:2});
       await ee[i].type('3');
       }
    });
   
//  Now setting Needle Out Values here
    await page.$$("input[data-bind='value: SyringeOut']").then(async(ee)=>{
        for(var i=0; i<ee.length; i++){
            await ee[i].click({clickCount:2});
            await ee[i].type('3');
            }

    });
                                               // element[0].click();
                                                // element[0].value = 3;


// Setting Syring Type to 3CC
    await page.$$("select[name='ctl00$cphRightContent$ddlSringeType']").then(async(ee)=>{
        try {
            for(var i =0; i<ee.length; i++){
                await ee[i].click();
                 await ee[i].type("3CC");
             }
        } catch (error) {
            console.log(error);
        }
        
    });


// // Setting SpritSwab values 
    await page.$$("input[data-bind='value: SpiritSwab']").then(async(ee)=>{
        try {
            for(var i =0; i<ee.length; i++){
                await ee[i].click({clickCount:2});
                 await ee[i].type('3');
             }
        } catch (error) {
            console.log(error);
        }
    });  

            
// // Setting Band Aid Values  Bandage
        await page.$$("input[data-bind='value: Bandage']").then(async(ee)=>{
            try {
                for(var i =0; i<ee.length; i++){
                    await ee[i].click({clickCount:2});
                    await ee[i].type('3');
                }
            } catch (error) {
                console.log(error);
            }
        });


        await page.evaluate(()=>{
            let bccservice;
            let message="HIV";
            if(message=="STI"){
                bccservice="IsSTIs";
            }else if(message=="HIV")
            {
                bccservice="IsHIV";
            }else if(message=="SIP") 
            {
                bccservice="IsSIP";
            }else if(message=="Sex")
            {
                bccservice="IsSaferSex";
            }
        
            var sti= document.querySelectorAll("input[data-bind='checked: "+bccservice+"']"); 
            for (i=0; i<sti.length; i++) 
                {
                    sti[i].click();
                    sti[i].checked=true; 
                }
        });
           
        await page.waitFor(2000);
        await page.screenshot({ path: 'nzmisAutomation.png', fullPage: true });
        // await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();