
const capture_button = document.getElementById('capture');
const video_button = document.getElementById('video');
const option_button = document.getElementById('option');


option_button.addEventListener('click',() =>{
    chrome.tabs.create({url: 'options/options.html'});
});