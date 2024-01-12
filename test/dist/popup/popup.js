"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_1 = require("../scripts/camera");
const capture_button = document.getElementById('capture');
const captureAll_button = document.getElementById('capture_all');
const video_button = document.getElementById('video');
const option_button = document.getElementById('option');
const camera = camera_1.Camera.getInstance();
option_button.addEventListener('click', () => {
    chrome.tabs.create({ url: 'options/options.html' });
});
capture_button.addEventListener('click', () => {
    camera.screenShot();
});
captureAll_button.addEventListener('click', () => {
    camera.screenShotFull("png");
});
