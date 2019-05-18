const puppeteer = require('puppeteer');

(async=>{

    puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        page.on('dialog', async dialog => {
          console.log(dialog.message());
          await dialog.accept();
          await browser.close();
        });
        page.evaluate(() => alert('1'));
      });
})();
