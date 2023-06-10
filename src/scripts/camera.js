"use strict";
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
        window.close();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTabInfo = tabs[0];
            if (!currentTabInfo.url.startsWith('chrome://')) {
                // chrome.tabs.sendMessage(tabs[0].id, { action: 'screenShot' });
                chrome.scripting.executeScript({
                    target: { tabId: currentTabInfo.id },
                    func: function () {
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
    return Camera;
}());
// exports.Camera = Camera;
//
