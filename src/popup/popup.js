import {Camera} from '../scripts/Camera.js';

const capture_button = document.getElementById('capture');
const captureAll_button = document.getElementById('capture_all');
const video_button = document.getElementById('video');
const option_button = document.getElementById('option');


const camera = new Camera();

option_button.addEventListener('click',() =>{
    chrome.tabs.create({url: 'options/options.html'});
});


capture_button.addEventListener('click', () => {
    //..
});


captureAll_button.addEventListener('click', () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        
        // test
        console.log("Captured image data URL:", dataUrl);
        camera.downloadImage(dataUrl, "captured_image.png");
      });
});




