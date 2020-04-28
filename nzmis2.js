const puppeteer = require('puppeteer');
const BCCServices =require('./BCCServices.js');
const {form1,form2,form3} = require('./assets/clients.js'); // Import client Reg No from Clients.js to be enter in Form
var  Main= require ('./NzForm');
let page;
let browser;

let NumberOfForms=0;
let ServiceOut = '21';
// let reno=[2,3,4,5,6,];

(async function(){

    try{

        browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
         page= await browser.newPage();

        await page.setViewport({ width: 0, height: 0});
        await page.goto('http://www.nzmis.com/');
    //  var url2= 'http://www.nzmis.com/secure/OutreachWorkerServices/RegisterEdit.aspx?id=1943448&back=tabbed';
  
        await  Main.Login(page);
 
       await FillForm(form1);

        await page.waitForSelector('input[id="ctl00_cphRightContent_btnAddAnotherTop"]',{ timeout: 0 }).then(()=>{
            console.log("Add Another Found");
        });
      var el1= await page.$('input[id="ctl00_cphRightContent_btnAddAnotherTop"]');
          
        await el1.click();

          await page.waitFor('table.grid',{timeout:0}).then(()=>{
            
            console.log(page.url());
        });
       
      await page.waitFor("input[data-bind='value: NeedleOut']");

      
        await FillForm(form2);

        // Additon for 3rd Form

        await page.waitForSelector('input[id="ctl00_cphRightContent_btnAddAnotherTop"]',{ timeout: 0 }).then(()=>{
            console.log("Add Another 3rd Found");
        });
      var el1= await page.$('input[id="ctl00_cphRightContent_btnAddAnotherTop"]');
          
        await el1.click();

          await page.waitFor('table.grid',{timeout:0}).then(()=>{
            
            console.log(page.url());
        });
       
      await page.waitFor("input[data-bind='value: NeedleOut']");

      
        await FillForm(form3);

           
        await page.waitFor(3000);
        // await page.screenshot({ path: 'nzmisAutomation.png', fullPage: true });
        // await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();





async function FillForm(client){

        
    // Setting Client Reg No
    await page.$$("input[data-bind='value: RegNo']").then(async(ee)=>{
        for(var i=0; i<ee.length; i++){
        await ee[i].click({clickCount:2});
        await ee[i].type(client[i].toString());
        }
    });

    // Setting Values for Needle Out
    await page.$$("input[data-bind='value: NeedleOut']").then(async(ee)=>{
        for(var i=0; i<ee.length; i++){
       await ee[i].click({clickCount:2});
       await ee[i].type(ServiceOut);
       }
    });

//  Now setting syring Out Values here
    await page.$$("input[data-bind='value: SyringeOut']").then(async(ee)=>{
        for(var i=0; i<ee.length; i++){
            await ee[i].click({clickCount:2});
            await ee[i].type(ServiceOut);
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
                 await ee[i].type(ServiceOut);
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
                    await ee[i].type(ServiceOut);
                }
            } catch (error) {
                console.log(error);
            }
        });


        await page.evaluate(()=>{
            let bccservice;
            let message="SEX";  // 'STI' 'HIV' 'SIP' 'SEX'
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
        
            // var sti= document.querySelectorAll("input[data-bind='checked: "+bccservice+"']"); 
            // below queryselectAll is use for All 4 msgs Tick in service sheet,
            var ms2= document.querySelectorAll("input[data-bind='checked: IsHIV']");
            var ms3=  document.querySelectorAll("input[data-bind='checked: IsSTIs']");
            var ms4 = document.querySelectorAll("input[data-bind='checked: IsSIP']");
            var ms5=  document.querySelectorAll("input[data-bind='checked: IsSaferSex']");
            for (i=0; i<ms2.length; i++) 
                {
                    ms2[i].click();
                    ms2[i].checked=true; 

                    ms3[i].click();
                    ms3[i].checked=true;

                    ms4[i].click();
                    ms4[i].checked=true;

                    ms5[i].click();
                    ms5[i].checked=true;
                }
        });

        


}

