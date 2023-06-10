"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// exports.__esModule = true;
// exports.Camera = void 0;
export var Camera = /** @class */ (function () {
    function Camera() {
        this.link = document.createElement("a");
    }
    Camera.getInstance = function () {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }
        return Camera.instance;
    };
    Camera.prototype.videoShot = function () { };
    Camera.prototype.screenShot = function () {
        // popup.html 창을 닫아준다.
        // window.close();
        // 
        // chrome.scripting.executeScript(
        //     {
        //         target: { tabId: 1 },
        //         function: this.ttest
        //     },
        // );
        // this.getCurrentTab().then((result) =>{
        //     chrome.scripting
        //     .executeScript({
        //     target : {tabId : result.groupId},
        //     func : this.changeCursor,
        //     })
        //     .then(() => console.log("injected a function"));
        // })
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let currentTabInfo = tabs[0];
            
            if (!currentTabInfo.url.startsWith('chrome://')) {
                
                // chrome.tabs.sendMessage(tabs[0].id, { action: 'screenShot' });

                chrome.scripting.executeScript({
                    target: { tabId: currentTabInfo.id },
                    function: () => {
                      document.body.style.cursor = "cell";
                      document.title = "New Page Title";
                    }
                  });
            }
        });
    };
    Camera.prototype.screenShotFull = function (formatInfo) {
        var _this = this;
        chrome.tabs.captureVisibleTab(null, { format: formatInfo }, function (dataUrl) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            console.log("Captured image data URL:", dataUrl);
            _this.downloadImage(dataUrl, "captured_image.png");
        });
    };
    Camera.prototype.downloadImage = function (dataUrl, filename) {
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    };
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    Camera.prototype.changeCursor = function () {
        document.body.style.cursor = "cell";
    };
    Camera.prototype.getCurrentTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryOptions, tab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryOptions = { active: true, lastFocusedWindow: true };
                        return [4 /*yield*/, chrome.tabs.query(queryOptions)];
                    case 1:
                        tab = (_a.sent())[0];
                        return [2 /*return*/, tab];
                }
            });
        });
    };
    Camera.prototype.getTabId = function () { return 5; };
    Camera.prototype.toggleMuteState = function (tabId) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, muted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chrome.tabs.get(tabId)];
                    case 1:
                        tab = _a.sent();
                        muted = !tab.mutedInfo.muted;
                        return [4 /*yield*/, chrome.tabs.update(tabId, { muted: muted })];
                    case 2:
                        _a.sent();
                        console.log("Tab ".concat(tab.id, " is ").concat(muted ? "muted" : "unmuted"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return Camera;
}());
// exports.Camera = Camera;
//
