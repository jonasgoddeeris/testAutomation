// before starting
// Need to add preview URL, URL and testDEVICES !!!!




const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const devices = require('puppeteer/DeviceDescriptors');

//Devices from https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js
const Nexus6P = devices[ 'Nexus 6P' ];
const Nexus6 = devices[ 'Nexus 6' ];
const Nexus5 = devices[ 'Nexus 5' ];
const pixel2 = devices[ 'Pixel 2' ];
const pixel2XL = devices[ 'Pixel 2 XL' ];
const galaxyS5 = devices[ 'Galaxy S5' ];

const iPhoneX = devices[ 'iPhone X' ];
const iPhoneXr = devices[ 'iPhone XR' ];
const iPhone8 = devices[ 'iPhone 8' ];
const iPhone6 = devices[ 'iPhone 6' ];
const iPhone5 = devices[ 'iPhone 5' ];

const iPadPro = devices[ 'iPad Pro' ];
const iPad = devices[ 'iPad' ];
const iPadMini = devices[ 'iPad Mini' ];
const iPadlandscape = devices[ 'iPad landscape' ];

//Own definition of devices
const desktop1440_880 = {
  name: 'desktop1440_880',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36',
  viewport: {
    width: 1440,
    height: 880,
    deviceScaleFactor: 1,
  }
}

const iPhoneXsMax = {
  name: 'iPhone XS Max (Firefox)',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15',
  viewport: {
    width: 414,
    height: 896,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  }
}

const galaxyS9 = {
  name: 'Samsung Galaxy S9',
  userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
  viewport: {
    width: 360,
    height: 740,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  }
}

const galaxyS7 = {
  name: 'Samsung Galaxy S7',
  userAgent: 'Mozilla/5.0 (Linux; Android 7.0; SM-G930VC Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36',
  viewport: {
    width: 360,
    height: 640,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  }
}



// ---- ADD TESTdevices you want to test to the Array -----

const testDevices = [galaxyS9];

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
await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-1.png', fullPage: true});
console.log('step 1' + deviceToTest.name);
await page.click('#KAM > div.car-wrap');
await page.waitFor(5000);
await page.content();
// await page.screenshot({path: 'screenshots/' + device + '/-screenshot-mynewskoda-3.png', fullPage: true});
await page.click('#TD');
await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-4.png', fullPage: true});
console.log('step 2' + deviceToTest.name);
await page.waitFor(5000);
await page.content('#myidRequest');
await page.click('#myidRequest');
await page.content();
await page.waitFor(5000);
console.log('step 3.1' + deviceToTest.name);
// await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-5.png', fullPage: true});
await page.content('#m');
await page.click('#m');
await page.type('#firstname-form', "test-firstname");
await page.type('#lastname-form', "test-lastname");
await page.type('#phone-form', "0000000000");
await page.type('#email-form', "test@test.be");
// await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-6.png', fullPage: true});
console.log('step 3.2' + deviceToTest.name);
await page.click('#select2-DEALER_SIM-container');
// await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-7.png', fullPage: true});
console.log('step 3.3' + deviceToTest.name);
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
console.log('step 3.4' + deviceToTest.name);
// await page.screenshot({path: 'screenshots/' + device + '/-screenshot-mynewskoda-8.png', fullPage: true});
await page.type('#carsForm > div.request-container.form-wrap > div.row > div:nth-child(7) > div > div > div > textarea', "DIT IS EEN TEST - NEGEREN -- THIS IS A TEST PLEASE IGNORE -- CECI EST UN TEST - IGNORER SVP");
await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-9.png', fullPage: true});


//save datalayer to file

const analyticsData = await page.evaluate('dataLayer');

fs.writeFile("dataLayer-" + deviceToTest.name + "-" + dateTime + ".json", JSON.stringify(analyticsData), "utf8", (err, data) => {
  if (err) {
  console.error(err);
} else {
  console.log("fileCreated-" + deviceToTest.name);
}});
console.log('step 3.4 - datalayer' + deviceToTest.name);

//commented - else same garage gets many mails
// await page.click('#submitForm01');
//
await page.content();
await page.waitFor(5000);
await page.screenshot({path: 'screenshots/' + device + '/mynew-' + brand + '-10.png', fullPage: true});
console.log('step 4' + deviceToTest.name);

await browser.close();
console.log("Done " + deviceToTest.name);
})();
}
}
