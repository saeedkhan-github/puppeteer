const puppeteer = require('puppeteer');
const BCCServices =require('./BCCServices.js');
var  Main= require ('./NzForm');
let page;
let browser;

let NumberOfForms=0;

(async function(){

    try{

        browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
         page= await browser.newPage();

        await page.setViewport({ width: 1366, height: 768});
        await page.goto('http://www.nzmis.com/');
    //  var url2= 'http://www.nzmis.com/secure/OutreachWorkerServices/RegisterEdit.aspx?id=1943448&back=tabbed';
  
        await  Main.Login(page);
 
       await FillForm();

        await page.waitForSelector('input[id="ctl00_cphRightContent_btnAddAnotherTop"]');
      var el1= await page.$('input[id="ctl00_cphRightContent_btnAddAnotherTop"]');
          
        await el1.click();
           
        await page.waitFor(3000);
        await page.screenshot({ path: 'nzmisAutomation.png', fullPage: true });
        // await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();





async function FillForm(){
    // Setting Values for syringe Out
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
                                            //    element[0].click();
                                            //     element[0].value = 3;


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
            const message="SEX";
            if(message=="STI"){
                bccservice="IsSTIs";
            }else if(message=="HIV")
            {
                bccservice="IsHIV";
            }else if(message=="SIP") 
            {
                bccservice="IsSIP";
            }else if(message=="SEX")
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

        


}

