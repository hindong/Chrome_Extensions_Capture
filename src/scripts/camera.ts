import html2canvas from 'html2canvas';

export class Camera{
    private link: HTMLAnchorElement;
    private static instance: Camera;

    private constructor() {
        this.link = document.createElement("a");
    }

    public static getInstance(): Camera{
        if(!Camera.instance){
            Camera.instance = new Camera();
        }
        return Camera.instance;
    }


    public videoShot() {}

    public screenShot() {
        // popup.html 창을 닫아준다.
        window.close();
        
        // document.body.style.cursor = "cell";
        // chrome.scripting.executeScript(
        //     {
        //         target: { tabId: 1 },
        //         function: test
        //     },
        // );

    }


    public screenShotFull(formatInfo:string): void {
        chrome.tabs.captureVisibleTab(null, { format: formatInfo }, dataUrl => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        
        console.log("Captured image data URL:", dataUrl);
        this.downloadImage(dataUrl, "captured_image.png");
      });
    }
    
    private downloadImage(dataUrl: string, filename: string): void{
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    }
}
//

