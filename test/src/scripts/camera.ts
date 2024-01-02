
import html2canvas from "html2canvas";

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

        chrome.tabs.query({ active: true, currentWindow: true },async function (tabs) {
            let currentTabInfo = tabs[0];
            
            // chrome 권한이 필요한 url에서 실행하는게 아니라면 실행한다.
            if (!currentTabInfo.url.startsWith('chrome://')) {
                
                // 현재 tab에서 해당 스크립트를 실행합니다.
                try{
                    await chrome.scripting.executeScript({
                        target: { tabId: currentTabInfo.id },
                        func: () => {
                            // 사용자에게 영역을 선택하도록 안내
                            alert('Please select the capture area.');
                            
                            const body = document.querySelector('body');
                            // 부분캡쳐를 위한 마우스 커서 변경
                            body.style.cursor = 'cell';

                            // 사용자에게 선택된 영역을 강조
                            let startX, startY;
                            let height = window.innerHeight;
                            let width = window.innerWidth;
                                
                            // 캡쳐시 배경을 어둡게 하기 위한 div 객체 생성
                            let screenBackgorund = document.createElement("div");
                            screenBackgorund.id = "screenshot_background";
                            screenBackgorund.style.borderWidth = "0 0 " + height + "px 0";

                            // 캡쳐중 마우스를 이동하면서 선택한 영역의 크기를 보여주기 위한 div 객체 생성
                            var screenshotArea = document.createElement("div");
                            screenshotArea.id = "screenshot_area";

                            body.appendChild(screenBackgorund);
                            body.appendChild(screenshotArea);

                            let selectArea = false;
                            
                            document.addEventListener('mousedown', handleMouseDown);

                            function handleMouseDown(e) {
                                e.preventDefault();
                                selectArea = true;    
                                startX = e.clientX;
                                startY = e.clientY;                                
                                //이벤트를 실행하면서 이벤트 삭제 (한번만 동작하기 위함)
                                body.removeEventListener("mousedown", handleMouseDown);
                            }

                            function handleMouseUp(e){
                                selectArea = false;
                                //(초기화) 마우스 클릭을 떼면서 mouseMove 이벤트 삭제
                                body.removeEventListener("mousemove", handleMouseMove);

                                screenshotArea.parentNode.removeChild(screenshotArea);
                                screenBackgorund.parentNode.removeChild(screenBackgorund);

                                let x = e.clientX;
                                let y = e.clientY;
                                let top = Math.min(y, startY);
                                let left = Math.min(x, startX);
                                let width = Math.max(x, startX) - left;
                                let height = Math.max(y, startY) - top;

                                html2canvas(document.body).then(
                                    function(canvas){
                                        let img = canvas.getContext('2d').getImageData(left, top, width, height);
                                        let c = document.createElement("canvas");

                                        c.width = width;
                                        c.height = height;
                                        c.getContext('2d').putImageData(img, 0, 0);
                                        save(c); // 이미지 저장
                                    }
                                );

                                body.removeEventListener("mouseup", handleMouseUp);
                                // 기본 마우스 커서로 변경
                                body.style.cursor = 'default';
                            }

                            body.addEventListener("mouseup", handleMouseUp);

                            function handleMouseMove(e){
                                let x = e.clientX;
                                let y = e.clientY;
                                screenshotArea.style.left = x;
                                screenshotArea.style.top = y;
                                // 캡쳐 영역 선택 그림
                                if(selectArea){
                                    let top = Math.min(y, startY);
                                    let right = width - Math.max(x, startX);
                                    let bottom = height - Math.max(y, startY);
                                    let left = Math.min(x, startX);
                                    screenBackgorund.style.borderWidth = top + "px " + right + "px " + bottom + "px " + left + "px";
                                }
                            }

                            body.addEventListener("mousemove", handleMouseMove);

                            function save(canvas){
                                canvas.toBlob(function (blob) {
                                    // Blob을 다운로드할 수 있는 URL을 생성합니다.
                                    const downloadUrl = URL.createObjectURL(blob);
                            
                                    // 다운로드 링크를 생성하고 설정합니다.
                                    const downloadLink = document.createElement('a');
                                    downloadLink.href = downloadUrl;
                                    downloadLink.download = 'filename.png';
                            
                                    // 링크를 클릭하여 다운로드를 시작합니다.
                                    document.body.appendChild(downloadLink);
                                    downloadLink.click();
                            
                                    // 더 이상 필요하지 않은 URL을 해제합니다.
                                    URL.revokeObjectURL(downloadUrl);
                                });
                            }

                            //
                          },
                        });
                        // files: ["/src/scripts/screenshot.js"],
                } catch(err){
                    console.error(`failed to execute script: ${err}`);
                }
                
            }
        });
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