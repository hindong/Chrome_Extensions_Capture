class Camera{
    
    constructor() {}

    screenShot() {}
    fullScreenShot() {}
    videoShot() {}
    
    downloadImage(dateUrl, filename){
        const link = document.getElementById("downloadLink");
        link.href = dataUrl;
        link.download = filename;
        link.click();
    }
}