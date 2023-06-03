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
    Camera.prototype.screenShot = function () { };
    Camera.prototype.videoShot = function () { };
    Camera.prototype.screenShotFull = function (formatInfo) {
        var _this = this;
        chrome.tabs.captureVisibleTab(null, { format: formatInfo }, function (dataUrl) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            // test
            console.log("Captured image data URL:", dataUrl);
            _this.downloadImage(dataUrl, "captured_image.png");
        });
    };
    Camera.prototype.downloadImage = function (dataUrl, filename) {
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    };
    return Camera;
}());
// exports.Camera = Camera;
//
