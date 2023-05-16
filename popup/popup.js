
document.getElementById('option').addEventListener('click',() =>{
    chrome.tabs.create({url: 'options/options.html'});
});