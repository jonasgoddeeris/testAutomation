const devices = require('puppeteer/DeviceDescriptors');


//Devices from https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js
export const Nexus6P = devices[ 'Nexus 6P' ];
export const Nexus6 = devices[ 'Nexus 6' ];
export const Nexus5 = devices[ 'Nexus 5' ];
export const pixel2 = devices[ 'Pixel 2' ];
export const pixel2XL = devices[ 'Pixel 2 XL' ];
export const galaxyS5 = devices[ 'Galaxy S5' ];

export const iPhoneX = devices[ 'iPhone X' ];
export const iPhoneXr = devices[ 'iPhone XR' ];
export const iPhone8 = devices[ 'iPhone 8' ];
export const iPhone6 = devices[ 'iPhone 6' ];
export const iPhone5 = devices[ 'iPhone 5' ];

export const iPadPro = devices[ 'iPad Pro' ];
export const iPad = devices[ 'iPad' ];
export const iPadMini = devices[ 'iPad Mini' ];
export const iPadLandscape = devices[ 'iPad landscape' ];

//Own definition of devices
export const desktop1440_880 = {
  name: 'desktop1440_880',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36',
  viewport: {
    width: 1440,
    height: 880,
    deviceScaleFactor: 1,
  }
}

export const iPhoneXsMax = {
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

export const galaxyS9 = {
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

export const galaxyS7 = {
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
