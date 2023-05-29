
const capture_button = document.getElementById('capture');
const captureAll_button = document.getElementById('capture_all');
const video_button = document.getElementById('video');
const option_button = document.getElementById('option');


option_button.addEventListener('click',() =>{
    chrome.tabs.create({url: 'options/options.html'});
});


capture_button.addEventListener('click', () => {
    alert("test");
});


captureAll_button.addEventListener('click', () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        
        // test
        console.log("Captured image data URL:", dataUrl);
        downloadImage(dataUrl, "captured_image.png");
      });
});


function downloadImage(dataUrl, filename) {
    const link = document.getElementById("downloadLink");
    link.href = dataUrl;
    link.download = filename;
    link.click();
}

