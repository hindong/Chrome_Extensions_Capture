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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
class Camera {
    constructor() {
        this.link = document.createElement("a");
    }
    static getInstance() {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }
        return Camera.instance;
    }
    videoShot() { }
    screenShot() {
        // popup.html 창을 닫아준다.
        window.close();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            return __awaiter(this, void 0, void 0, function* () {
                let currentTabInfo = tabs[0];
                // chrome 권한이 필요한 url에서 실행하는게 아니라면 실행한다.
                if (!currentTabInfo.url.startsWith('chrome://')) {
                    // 현재 tab에서 해당 스크립트를 실행합니다.
                    try {
                        yield chrome.scripting.executeScript({
                            target: { tabId: currentTabInfo.id },
                            func: () => {
                                document.body.style.cursor = "cell";
                                document.title = "New Page Title";
                            }
                            // files: ["/src/scripts/screenshot.js"],
                        });
                    }
                    catch (err) {
                        console.error(`failed to execute script: ${err}`);
                    }
                }
            });
        });
    }
    screenShotFull(formatInfo) {
        chrome.tabs.captureVisibleTab(null, { format: formatInfo }, dataUrl => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            console.log("Captured image data URL:", dataUrl);
            this.downloadImage(dataUrl, "captured_image.png");
        });
    }
    downloadImage(dataUrl, filename) {
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    }
}
exports.Camera = Camera;
//
