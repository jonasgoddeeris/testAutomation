// 


//!--- READ THIS


// before starting
// you need to add preview URL, URL and testDEVICES !!!!
// define brand with specific URL's as an object! 
//define devices in seperate file!



//-----END READ THIS
//



const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');

import { Nexus6P, Nexus6, Nexus5, pixel2, pixel2XL, galaxyS5, galaxyS7, galaxyS9, iPhone5, iPhone6, iPhone8, iPhoneX, iPhoneXr, iPhoneXsMax, iPadPro, iPad, iPadMini, iPadLandscape, desktop1440_880 } from './devices.js';




// ---- ADD TESTdevices you want to test to the Array -----

const testDevices = [galaxyS9, desktop1440_880, iPhoneX];

// 



//date time stamp formatting

let fullDate = new Date();
let dd = String(fullDate.getDate()).padStart(2, '0');
let mm = String(fullDate.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = fullDate.getFullYear();
let today = dd + '.' + mm + '.' + yyyy;
let hour = fullDate.getHours()
let minutes = fullDate.getMinutes()


minutesFormatting(minutes);
hourFormatting(hour);

function minutesFormatting(data){
  if (data < 10){
    minutes = ("0" + data);
    console.log("minutes is smaller than 9");
  } 
}

function hourFormatting(data){
  if (data < 10){
    hour = ("0" + data);
    console.log("hour is smaller than 9");
  } 
}

let time = hour +  "." + minutes;

let dateTime = today + "-" + time;
console.log("dateTime is " + dateTime);






testAll(testDevices);

function testAll (data) {
  for (let deviceToTest of data){
    const deviceFulldetails = deviceToTest;
    const device = deviceToTest.name





// ---FILL IN AB TEST PREVIEW URL AND/OR flow start URL  ---

const previewURL = "https://www.google-analytics.com/gtm/set_cookie?uiv2&id=GTM-TS4PDF6&gtm_auth=G4S7idMaTbioFtOmTgrRug&gtm_debug&gtm_experiment=GTM-TS4PDF6_OPT-PP2ZD%241&gtm_preview=opt_preview-slim&redirect=https%3A%2F%2Foptimize.google.com%2Foptimize%2Fsharepreview%3Fid%3DGTM-TS4PDF6%26gtm_experiment%3DGTM-TS4PDF6_OPT-PP2ZD%25241%26url%3Dhttps%253A%252F%252Fcloud.mail.dieteren.be%252Fmynew%252Fform%253Fbrand%253DSKODA%2526lang%253Dnl%2526model1%253DOC2%2526testdrive%253Dtrue%26opt_experiment_name%3DA%252FB%2520%25234%2520-%2520No%2520engagement%26opt_variation_name%3DVariant%25201%26slim%3Dtrue%26container_name%3Dskoda.be&optimize_editor";

const url = 'https://cloud.mail.dieteren.be/mynew/cars?lang=nl&brand=Skoda';

//

const result = url.match(/brand=(.*?)$/);
const brand = result[1];
console.log("Brand is  " + brand);


(async () => {
  const browser = await puppeteer.launch({headless: true}); // default is true
  console.log('start ' + deviceToTest.name);

const page = await browser.newPage();

//emulate device new
await page.emulate(deviceFulldetails);



//optimize preview load (uncomment to just test a normal website with no ab test)
await page.goto(previewURL);
//

await page.click('body > div > div > div > main > md-whiteframe > div > div > div.opt-preview-content.opt-preview-link-container.ng-scope > a');
await page.content();
await page.waitFor(1000);

//normal page load
await page.goto(url);

 


//create folders for screenshots per run.

const dir = './tmp/' + brand + '/' + deviceToTest.name + '/' ;
console.log(dir);


fse.ensureDir(dir)
.then(() => {
  console.log('dir create success!')
})
.catch(err => {
  console.error(err)
})





//

await page.content();
await page.click('#cookie-bar > p:nth-child(1) > a.cb-enable');
await page.waitFor(5000);
await page.screenshot({path: dir + '1-viewport-' + dateTime + '.png', fullPage: false});
await page.screenshot({path: dir + '1-fullPage-' + dateTime + '.png', fullPage: true});
console.log('step 1' + deviceToTest.name);
await page.click('#KAM > div.car-wrap');
await page.waitFor(5000);
await page.click('#TD');
await page.screenshot({path: dir + '2-viewport-' + dateTime + '.png', fullPage: false});
await page.screenshot({path: dir + '2-fullPage-' + dateTime + '.png', fullPage: true});
console.log('step 2' + deviceToTest.name);
await page.waitFor(5000);
await page.content('#myidRequest');
await page.click('#myidRequest');
await page.content();
await page.waitFor(5000);
console.log('step 3' + deviceToTest.name);
await page.content('#m');
await page.click('#m');
await page.type('#firstname-form', "test-firstname");
await page.type('#lastname-form', "test-lastname");
await page.type('#phone-form', "0000000000");
await page.type('#email-form', "test@test.be");
await page.click('#select2-DEALER_SIM-container');
console.log('step 3.3' + deviceToTest.name);
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
console.log('step 3.4' + deviceToTest.name);
await page.type('#carsForm > div.request-container.form-wrap > div.row > div:nth-child(7) > div > div > div > textarea', "DIT IS EEN TEST - NEGEREN -- THIS IS A TEST PLEASE IGNORE -- CECI EST UN TEST - IGNORER SVP");
await page.screenshot({path: dir + '3-viewport-' + dateTime + '.png', fullPage: false});
await page.screenshot({path: dir + '3-fullPage-' + dateTime + '.png', fullPage: true});


//save datalayer to file

const analyticsData = await page.evaluate('dataLayer');

fs.writeFile("dataLayer-" + deviceToTest.name + "-" + dateTime + ".json", JSON.stringify(analyticsData), "utf8", (err, data) => {
  if (err) {
  console.error(err);
} else {
  console.log("dataLayerFileCreated-" + deviceToTest.name);
}});

//commented - else same garage gets many mails
// await page.click('#submitForm01');
//
await page.content();
await page.waitFor(5000);
await page.screenshot({path: dir + '4-viewport-' + dateTime + '.png', fullPage: false});
await page.screenshot({path: dir + '4-fullPage-' + dateTime + '.png', fullPage: true});
console.log('step 4' + deviceToTest.name);

await browser.close();
console.log("Done " + deviceToTest.name);
})();
}
}
