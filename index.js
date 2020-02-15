const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const devices = require('puppeteer/DeviceDescriptors');
const WebSocket = require('isomorphic-ws')



// 
//
//------------------------------ READ THIS ---------------------------------
//
//
// before starting
// you need to add preview URL, URL and testDEVICES !!!!
//
//
//------------------------------ END READ THIS ----------------------------------
//
//



//--------- custom WebSocket

const ws = new WebSocket('wss://echo.websocket.org/', {
  origin: 'https://websocket.org'
});

ws.onopen = function open() {
  console.log('connected');
  ws.send(Date.now());
};

ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data.data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
};

//------ end custom WebSocket




// --- --------- DEVICES OBJECTS 
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

const iPhoneXsMaxFirefox = {
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


// ---- END TEST DEVICES 




// ---- ADD TESTdevices you want to test to the Array -----

// const testDevices = [galaxyS5, galaxyS9, pixel2, Nexus6P, desktop1440_880, iPhoneX, iPhone5, iPad, iPadPro];

const testDevices = [iPhoneX];






//---------  start brand objects

const skodaObject = {
  name: 'Skoda MyNew',
  url: 'https://cloud.mail.dieteren.be/mynew/cars?lang=fr&brand=Skoda'
}

const audiObject = {
  name: 'Audi MyNew',
  url: 'https://cloud.mail.dieteren.be/mynew/cars?lang=nl&brand=Audi'
}

//-------- end brand objects




//------------ start date time stamp formatting

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
    console.log("minutesFormatting");
  } 
}

function hourFormatting(data){
  if (data < 10){
    hour = ("0" + data);
    console.log("hourFormatting");
  } 
}

let time = hour +  "." + minutes;

let dateTime = today + "-" + time;
console.log("dateTime is " + dateTime);


//------------ end dateTime Stamp formatting


// -----  function START -------- ----------------------------------------------- -----------------------


testAll(testDevices);  //commented to see effect on build !!


function testAll (data) {
  for (let deviceToTest of data){
    const deviceFulldetails = deviceToTest;
    const device = deviceToTest.name



// ---FILL IN AB TEST PREVIEW URL AND/OR flow start URL  ---

const previewURL = "https://www.google-analytics.com/gtm/set_cookie?uiv2&id=GTM-TS4PDF6&gtm_auth=G4S7idMaTbioFtOmTgrRug&gtm_debug&gtm_experiment=GTM-TS4PDF6_OPT-WRW33%241&gtm_preview=opt_preview-slim&redirect=https%3A%2F%2Foptimize.google.com%2Foptimize%2Fsharepreview%3Fid%3DGTM-TS4PDF6%26gtm_experiment%3DGTM-TS4PDF6_OPT-WRW33%25241%26url%3Dhttps%253A%252F%252Fcloud.mail.dieteren.be%252Fmynew%252Fform%253Fbrand%253DSKODA%2526lang%253Dfr%2526model1%253DOC2%2526testdrive%253Dtrue%26opt_experiment_name%3DA%252FB%2520%25234%2520-%2520No%2520engagement%2520V2%26opt_variation_name%3DVariant%25201%26slim%3Dtrue%26container_name%3Dskoda.be&optimize_editor";

//
//

const url = skodaObject.url;


//--- start get brand name from URL query parameter 
const result = url.match(/brand=(.*?)$/);
const brand = result[1];
console.log("Brand is  " + brand);
//--- end get brand name from URL query parameter 



// Puppeteer starts HERE --------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({headless: true}, { args: ['--no-sandbox'] }); // default headless is true // no sandbox is for heroku
  console.log('start ' + deviceToTest.name);
  console.log(browser.wsEndpoint());

  

  // on local machine COMMENT 
  // const browser = await bundledPuppeteer.connect({browserWSEndpoint: "<my-ws-endpoint>"});
  //--------------END COMMENT

const page = await browser.newPage();

//emulate device new
await page.emulate(deviceFulldetails);



//--- START google optimize preview load (uncomment to just test a normal website with no ab test)
// await page.goto(previewURL);
// await page.click('body > div > div > div > main > md-whiteframe > div > div > div.opt-preview-content.opt-preview-link-container.ng-scope > a');
// await page.content();
// await page.waitFor(5000);
// --- END google optimize preview link


//normal page load
await page.goto(url);

 


// ---- create folders for screenshots per device per run.

const dir = './tmp/' + brand + '/' + deviceToTest.name + '/' + dateTime + '/' ;
console.log(dir);


fse.ensureDir(dir)
.then(() => {
  console.log('dir create success!')
})
.catch(err => {
  console.error(err)
})

// ---- end create folders


await page.content();
await page.click('#cookie-bar > p:nth-child(1) > a.cb-enable');
await page.waitFor(5000);
await page.screenshot({path: dir + '1-viewport.png', fullPage: false});
await page.screenshot({path: dir + '1-fullPage.png', fullPage: true});
console.log('step 1' + deviceToTest.name);
await page.click('#KAM > div.car-wrap'); // insert generic ID for brand generic form
await page.waitFor(5000);
await page.click('#TD');
await page.screenshot({path: dir + '2-viewport.png', fullPage: false});
await page.screenshot({path: dir + '2-fullPage.png', fullPage: true});
console.log('step 2' + deviceToTest.name);
await page.waitFor(5000);
await page.waitForSelector('#myidRequest');
await page.click('#myidRequest');
await page.content();
console.log('step 3' + deviceToTest.name);
await page.waitFor(5000);
await page.waitForSelector('#m')
await page.click('#m');
await page.type('#firstname-form', "test-firstname");
await page.type('#lastname-form', "test-lastname");
await page.type('#phone-form', "0000000000");
await page.type('#email-form', "test345678@test3456789.be");
await page.click('#select2-DEALER_SIM-container');
console.log('step 3.3' + deviceToTest.name);
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
console.log('step 3.4' + deviceToTest.name);
await page.type('#carsForm > div.request-container.form-wrap > div.row > div:nth-child(7) > div > div > div > textarea', "DIT IS EEN TEST - NEGEREN -- THIS IS A TEST PLEASE IGNORE -- CECI EST UN TEST - IGNORER SVP");
await page.screenshot({path: dir + '3-viewport.png', fullPage: false});
await page.screenshot({path: dir + '3-fullPage.png', fullPage: true});


//------ start save datalayer to file
const analyticsData = await page.evaluate('dataLayer');

fs.writeFile("dataLayer/dataLayer-" + deviceToTest.name + "-" + dateTime + ".json", JSON.stringify(analyticsData), "utf8", (err, data) => {
  if (err) {
  console.error(err);
} else {
  console.log("dataLayerFileCreated-" + deviceToTest.name);
}});
//----- end save dataLayer


//
// IMPORTANT
// --- START IMPORTANT =>  commented - else same garage gets many many  mails !!!!!

// await page.click('#submitForm01');

// --- END COMMENT IMPORTANT 
//IMPORTANT
//

await page.content();
await page.waitFor(5000);
await page.screenshot({path: dir + '4-viewport.png', fullPage: false});
await page.screenshot({path: dir + '4-fullPage.png', fullPage: true});
console.log('step 4' + deviceToTest.name);

await browser.close();
console.log("Done " + deviceToTest.name);
})();
}
}
