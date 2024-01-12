"use strict";
// import {html2canvas} from "../../node_modules/html2canvas/dist/html2canvas";
// https://stackoverflow.com/questions/75263524/html2canvas-creating-a-browser-extension-that-takes-a-screenshot-of-the-html-bo

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class Camera {
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
                                
                                console.log("script injection");
                                screenshot();
                                

                                function screenshot(){
                                    const body = document.querySelector("body");
                                    let startX, startY;
                                    let height = window.innerHeight;
                                    let width = window.innerWidth;


                                    // html2canvas injection
                                    const html2canvasURL = chrome.runtime.getURL('/node_modules/html2canvas/dist/html2canvas.js');
                                    const script = document.createElement('script');
                                    script.src = html2canvasURL;
                                    document.head.appendChild(script);
                                    
                                    // // css file injection
                                    const cssURL = chrome.runtime.getURL('/src/scripts/screenshot.css');
                                    const link = document.createElement('link');
                                    link.rel = 'stylesheet';
                                    link.type = 'text/css';
                                    link.href = cssURL;
                                    
                                    document.head.appendChild(link);

                                    // 캡쳐시 마우스 cursor = "cell"
                                    body.classList.add("edit_cursor");
                                    
                                    // 스크린샷 동작시 배경을 어둡게 하기 위한 div객체 생성
                                    const screenshotBackground = document.createElement("div");
                                    screenshotBackground.id = "screenshot_background";
                                    screenshotBackground.style.borderWidth = "0 0 " + height + "px 0";
                                    

                                    // 스크린샷 동작시 선택한 영역의 크기를 보여주기 위한 div객체 생성
                                    const screenshotArea = document.createElement("div");
                                    screenshotArea.id = "screenshot_area";

                                    body.appendChild(screenshotBackground);
                                    body.appendChild(screenshotArea);

                                    let selectArea = false;

                                    let handleMouseDown = function(e){
                                        e.preventDefault();
                                        selectArea = true;
                                        startX = e.clientX;
                                        startY = e.clientY;
                                        
                                        // 이벤트를 실행하면서 이벤트 삭제 (한번만 동작하도록)
                                        body.removeEventListener("mousedown", handleMouseDown);
                                    }

                                    body.addEventListener("mousedown", handleMouseDown);

                                    let handleMouseUp = function(e){
                                        selectArea = false;
                                        // (초기화)
                                        // 마우스 클릭을 떼면서 mousemove 이벤트 삭제
                                        body.removeEventListener("mousemove", handleMouseMove);
                                        // 스크린샷을 위해 생성한 객체 삭제
                                        if (screenshotArea.parentNode){
                                            screenshotArea.parentNode.removeChild(screenshotArea);
                                        }
                                        if (screenshotBackground.parentNode) {
                                            screenshotBackground.parentNode.removeChild(screenshotBackground);
                                        }

                                        let x = e.clientX;
                                        let y = e.clientY;
                                        let top = Math.min(y, startY);
                                        let left = Math.min(x, startX);
                                        let width = Math.max(x, startX) - left;
                                        let height = Math.max(y, startY) - top;
                                        
                                    // // 동적 스크립트 
                                    (async() =>{
                                        const html2script = await import(html2canvasURL);
                                        html2script.html2canvas(document.body).then(
                                            function(canvas){
                                                // 선택 영역만큽 crop
                                                let img = canvas.getContext('2d').getImageData(left, top, width, height);
                                                let c = document.createElement("canvas");
                                                c.width = width;
                                                c.height = height;
                                                c.getContext('2d').putImageData(img, 0, 0);
                                                save(c); // crop한 이미지 저장
                                                console.log("save called"); 
                                            }
                                        );
                                    })();
                                        
                                    
                                        console.log(script);
                                           
                                        
                                        body.removeEventListener("mouseup", handleMouseUp);
                                        // 마우스 커서 기본으로 변경
                                        body.classList.remove("edit_cursor")
                                    }

                                    body.addEventListener("mouseup", handleMouseUp);

                                    let handleMouseMove = function(e){
                                        let x = e.clientX;
                                        let y = e.clientY;
                                        screenshotArea.style.left = x;
                                        screenshotArea.style.top = y;
                                        if (selectArea) { //캡쳐 영역 선택 그림
                                            var top = Math.min(y, startY);
                                            var right = width - Math.max(x, startX);
                                            var bottom = height - Math.max(y, startY);
                                            var left = Math.min(x, startX);
                                            screenshotBackground.style.borderWidth = top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px';
                                        }

                                    }

                                    body.addEventListener("mousemove", handleMouseMove);

                                    function save(canvas) { 
                                            // Other browsers
                                            canvas.toBlob(function(blob) {
                                                var el = document.createElement('a');
                                                el.href = URL.createObjectURL(blob);
                                                el.download = '파일명.jpg';
                                                el.click();
                                            }, 'image/jpeg');
                                        }
                                    console.log("last code.");
                                }                          
                                
                                                    }
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

export default Camera;
//
