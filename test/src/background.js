// background.js

let html2canvasScript = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getHtml2Canvas") {
        // content script에서 요청이 오면 html2canvas 스크립트를 응답으로 전송
        if (html2canvasScript) {
            sendResponse({ html2canvasScript });
        }
    }
});

// background script에서 html2canvas 스크립트를 직접 로드
// fetch(chrome.runtime.getURL('../node_moudles/html2canvas/dist/html2canvas.js'))
//     .then(response => response.text())
//     .then(script => {
//         html2canvasScript = script;
//     });

const url = chrome.runtime.getURL('../node_modules/html2canvas/dist/html2canvas.js');
console.log(url);
fetch(url)
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));