import {Camera} from '../scripts/camera';

const capture_button = document.getElementById('capture');
const captureAll_button = document.getElementById('capture_all');
const video_button = document.getElementById('video');
const option_button = document.getElementById('option');


const camera = Camera.getInstance();

option_button.addEventListener('click',() =>{
    chrome.tabs.create({url: 'options/options.html'});
});


capture_button.addEventListener('click', () => {
    //..
});


captureAll_button.addEventListener('click', () => {
    camera.screenShotFull("png");
});