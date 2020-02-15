// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var puppeteer = require('puppeteer');

var fs = require('fs');

var fse = require('fs-extra');

var devices = require('puppeteer/DeviceDescriptors');

var WebSocket = require('isomorphic-ws'); // 
//!--- READ THIS
// before starting
// you need to add preview URL, URL and testDEVICES !!!!
//-----END READ THIS
//


var ws = new WebSocket('wss://echo.websocket.org/', {
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
  console.log("Roundtrip time: ".concat(Date.now() - data.data, " ms"));
  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
}; //Devices from https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js


var Nexus6P = devices['Nexus 6P'];
var Nexus6 = devices['Nexus 6'];
var Nexus5 = devices['Nexus 5'];
var pixel2 = devices['Pixel 2'];
var pixel2XL = devices['Pixel 2 XL'];
var galaxyS5 = devices['Galaxy S5'];
var iPhoneX = devices['iPhone X'];
var iPhoneXr = devices['iPhone XR'];
var iPhone8 = devices['iPhone 8'];
var iPhone6 = devices['iPhone 6'];
var iPhone5 = devices['iPhone 5'];
var iPadPro = devices['iPad Pro'];
var iPad = devices['iPad'];
var iPadMini = devices['iPad Mini'];
var iPadlandscape = devices['iPad landscape']; //Own definition of devices

var desktop1440_880 = {
  name: 'desktop1440_880',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36',
  viewport: {
    width: 1440,
    height: 880,
    deviceScaleFactor: 1
  }
};
var iPhoneXsMaxFirefox = {
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
};
var galaxyS9 = {
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
};
var galaxyS7 = {
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
}; // ---- ADD TESTdevices you want to test to the Array -----
// const testDevices = [galaxyS5, galaxyS9, pixel2, Nexus6P, desktop1440_880, iPhoneX, iPhone5, iPad, iPadPro];

var testDevices = [iPhoneX]; // 
//brand objects

var skodaObject = {
  name: 'Skoda MyNew',
  url: 'https://cloud.mail.dieteren.be/mynew/cars?lang=fr&brand=Skoda'
};
var audiObject = {
  name: 'Audi MyNew',
  url: 'https://cloud.mail.dieteren.be/mynew/cars?lang=nl&brand=Audi'
}; //end brand objects
//date time stamp formatting

var fullDate = new Date();
var dd = String(fullDate.getDate()).padStart(2, '0');
var mm = String(fullDate.getMonth() + 1).padStart(2, '0'); //January is 0!

var yyyy = fullDate.getFullYear();
var today = dd + '.' + mm + '.' + yyyy;
var hour = fullDate.getHours();
var minutes = fullDate.getMinutes();
minutesFormatting(minutes);
hourFormatting(hour);

function minutesFormatting(data) {
  if (data < 10) {
    minutes = "0" + data;
    console.log("minutesFormatting");
  }
}

function hourFormatting(data) {
  if (data < 10) {
    hour = "0" + data;
    console.log("hourFormatting");
  }
}

var time = hour + "." + minutes;
var dateTime = today + "-" + time;
console.log("dateTime is " + dateTime); // end dateTime Stamp formatting
// Run function

testAll(testDevices); //commented to sse effect on build !!
// end run function

function testAll(data) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var deviceToTest = _step.value;
      var deviceFulldetails = deviceToTest;
      var device = deviceToTest.name; // ---FILL IN AB TEST PREVIEW URL AND/OR flow start URL  ---
      // const previewURL = "https://www.google-analytics.com/gtm/set_cookie?uiv2&id=GTM-TS4PDF6&gtm_auth=G4S7idMaTbioFtOmTgrRug&gtm_debug&gtm_experiment=GTM-TS4PDF6_OPT-WRW33%241&gtm_preview=opt_preview-slim&redirect=https%3A%2F%2Foptimize.google.com%2Foptimize%2Fsharepreview%3Fid%3DGTM-TS4PDF6%26gtm_experiment%3DGTM-TS4PDF6_OPT-WRW33%25241%26url%3Dhttps%253A%252F%252Fcloud.mail.dieteren.be%252Fmynew%252Fform%253Fbrand%253DSKODA%2526lang%253Dfr%2526model1%253DOC2%2526testdrive%253Dtrue%26opt_experiment_name%3DA%252FB%2520%25234%2520-%2520No%2520engagement%2520V2%26opt_variation_name%3DVariant%25201%26slim%3Dtrue%26container_name%3Dskoda.be&optimize_editor";
      //
      //

      var url = skodaObject.url;
      var result = url.match(/brand=(.*?)$/);
      var brand = result[1];
      console.log("Brand is  " + brand);

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var browser, page, dir, analyticsData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return puppeteer.launch({
                  headless: true
                }, {
                  args: ['--no-sandbox']
                });

              case 2:
                browser = _context.sent;
                // default is true
                console.log('start ' + deviceToTest.name);
                console.log(browser.wsEndpoint()); // on local machine COMMENT 
                // const browser = await bundledPuppeteer.connect({browserWSEndpoint: "<my-ws-endpoint>"});
                //END COMMENT

                _context.next = 7;
                return browser.newPage();

              case 7:
                page = _context.sent;
                _context.next = 10;
                return page.emulate(deviceFulldetails);

              case 10:
                _context.next = 12;
                return page.goto(url);

              case 12:
                //create folders for screenshots per run.
                dir = './tmp/' + brand + '/' + deviceToTest.name + '/' + dateTime + '/';
                console.log(dir);
                fse.ensureDir(dir).then(function () {
                  console.log('dir create success!');
                }).catch(function (err) {
                  console.error(err);
                }); //

                _context.next = 17;
                return page.content();

              case 17:
                _context.next = 19;
                return page.click('#cookie-bar > p:nth-child(1) > a.cb-enable');

              case 19:
                _context.next = 21;
                return page.waitFor(5000);

              case 21:
                _context.next = 23;
                return page.screenshot({
                  path: dir + '1-viewport.png',
                  fullPage: false
                });

              case 23:
                _context.next = 25;
                return page.screenshot({
                  path: dir + '1-fullPage.png',
                  fullPage: true
                });

              case 25:
                console.log('step 1' + deviceToTest.name);
                _context.next = 28;
                return page.click('#KAM > div.car-wrap');

              case 28:
                _context.next = 30;
                return page.waitFor(5000);

              case 30:
                _context.next = 32;
                return page.click('#TD');

              case 32:
                _context.next = 34;
                return page.screenshot({
                  path: dir + '2-viewport.png',
                  fullPage: false
                });

              case 34:
                _context.next = 36;
                return page.screenshot({
                  path: dir + '2-fullPage.png',
                  fullPage: true
                });

              case 36:
                console.log('step 2' + deviceToTest.name);
                _context.next = 39;
                return page.waitFor(5000);

              case 39:
                _context.next = 41;
                return page.waitForSelector('#myidRequest');

              case 41:
                _context.next = 43;
                return page.click('#myidRequest');

              case 43:
                _context.next = 45;
                return page.content();

              case 45:
                console.log('step 3' + deviceToTest.name);
                _context.next = 48;
                return page.waitFor(5000);

              case 48:
                _context.next = 50;
                return page.waitForSelector('#m');

              case 50:
                _context.next = 52;
                return page.click('#m');

              case 52:
                _context.next = 54;
                return page.type('#firstname-form', "test-firstname");

              case 54:
                _context.next = 56;
                return page.type('#lastname-form', "test-lastname");

              case 56:
                _context.next = 58;
                return page.type('#phone-form', "0000000000");

              case 58:
                _context.next = 60;
                return page.type('#email-form', "test345678@test3456789.be");

              case 60:
                _context.next = 62;
                return page.click('#select2-DEALER_SIM-container');

              case 62:
                console.log('step 3.3' + deviceToTest.name);
                _context.next = 65;
                return page.keyboard.press('ArrowDown');

              case 65:
                _context.next = 67;
                return page.keyboard.press('ArrowDown');

              case 67:
                _context.next = 69;
                return page.keyboard.press('ArrowDown');

              case 69:
                _context.next = 71;
                return page.keyboard.press('Enter');

              case 71:
                console.log('step 3.4' + deviceToTest.name);
                _context.next = 74;
                return page.type('#carsForm > div.request-container.form-wrap > div.row > div:nth-child(7) > div > div > div > textarea', "DIT IS EEN TEST - NEGEREN -- THIS IS A TEST PLEASE IGNORE -- CECI EST UN TEST - IGNORER SVP");

              case 74:
                _context.next = 76;
                return page.screenshot({
                  path: dir + '3-viewport.png',
                  fullPage: false
                });

              case 76:
                _context.next = 78;
                return page.screenshot({
                  path: dir + '3-fullPage.png',
                  fullPage: true
                });

              case 78:
                _context.next = 80;
                return page.evaluate('dataLayer');

              case 80:
                analyticsData = _context.sent;
                fs.writeFile("dataLayer/dataLayer-" + deviceToTest.name + "-" + dateTime + ".json", JSON.stringify(analyticsData), "utf8", function (err, data) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("dataLayerFileCreated-" + deviceToTest.name);
                  }
                }); //commented - else same garage gets many mails !!!!!
                // await page.click('#submitForm01');
                //

                _context.next = 84;
                return page.content();

              case 84:
                _context.next = 86;
                return page.waitFor(5000);

              case 86:
                _context.next = 88;
                return page.screenshot({
                  path: dir + '4-viewport.png',
                  fullPage: false
                });

              case 88:
                _context.next = 90;
                return page.screenshot({
                  path: dir + '4-fullPage.png',
                  fullPage: true
                });

              case 90:
                console.log('step 4' + deviceToTest.name);
                _context.next = 93;
                return browser.close();

              case 93:
                console.log("Done " + deviceToTest.name);

              case 94:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    };

    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61072" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/testAutomation.e31bb0bc.js.map