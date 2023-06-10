"use strict";

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
        // document.body.style.cursor = "cell";
        

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTabId = tabs[0].id;
            chrome.scripting.executeScript(
                {
                    target: { tabId: currentTabId },
                    function: () => {document.body.style.cursor = "cell";
                    console.log("data test");
                }
                },
            );
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
    return Camera;
}());
// exports.Camera = Camera;
//
