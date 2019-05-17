const puppeteer = require('puppeteer');
const BCCServices =require('./BCCServices.js');


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
        await page.waitFor('table.grid');
        
        await page.$$eval("input[data-bind='value: NeedleOut']",el=>{
            for(i=0; i<el.length; i++){
                el[i].value=3; 
            }
        });
//  Now setting Needle Out Values here
        await page.$$eval("input[data-bind='value: SyringeOut']",el=>{
            for(i=0; i<el.length; i++){
                el[i].value=3; 
            }
        });
// Setting Syring Type to 3CC
        await page.$$eval("select[name='ctl00$cphRightContent$ddlSringeType']",el=>{
            for(i=0; i<el.length; i++){
                el[i].value="5CC"; 
            }
        });

// Setting SpritSwab values 

        await page.$$eval("input[data-bind='value: SpiritSwab']",el=>{
            for(i=0; i<el.length; i++){
                el[i].value=3; 
            }
        });
            
// Setting Band Aid Values  Bandage
            await page.$$eval("input[data-bind='value: Bandage']",el=>{
                for(i=0; i<el.length; i++){
                    el[i].value=3; 
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
                    sti[i].checked=true; 
                }
        });
           
        await page.waitFor(2000);
        await page.screenshot({ path: 'nzmisAutomation.png', fullPage: true });
        await browser.close();
    }catch(e){
        console.log('our Error',e );
    }

})();