export class Camera{
    private link: HTMLAnchorElement;

    constructor() {
        this.link = document.createElement("a");
    }

    screenShot() {}
    fullScreenShot() {}
    videoShot() {}
    
    downloadImage(dataUrl: string, filename: string): void{
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    }
}
//