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
            // chrome 권한이 필요한 url에서 실행하는게 아니라면 실행한다.
            if (!currentTabInfo.url.startsWith('chrome://')) {
                // 현재 tab에서 해당 스크립트를 실행합니다.
                chrome.scripting.executeScript({
                    target: { tabId: currentTabInfo.id },
                    // func: () => {
                    //     document.body.style.cursor = "cell";
                    //     document.title = "New Page Title";
                    // }
                    files: ["/src/scripts/capture.js"]
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
    Camera.prototype.testCode = function () {
        console.log("TEST");
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
