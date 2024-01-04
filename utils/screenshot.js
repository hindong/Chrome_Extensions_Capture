const body = document.querySelector("body");

/* test code
const testButton = document.querySelector("#btn");
*/

testButton.addEventListener('click', screenshot);

function screenshot(e){
    let startX, startY;
    let height = window.innerHeight;
    let width = window.innerWidth;

    // 캡쳐시 마우스 cursor = "cell"
    body.classList.add("edit_cursor");
    
    // 스크린샷 동작시 배경을 어둡게 하기 위한 div객체 생성
    const screenshotBackground = document.createElement("div");
    screenshotBackground.id = "screenshot_background";
    screenshotBackground.style.borderWidth = "0 0 " + height + "px 0";

    // 스크린샷 동작시 선택한 영역의 크기를 보여주기 위한 div객체 생성
    const screenshotArea = document.createElement("div");
    screenshotArea.id = "screenshot_area";

    body.appendChild(screenshotBackground);
    body.appendChild(screenshotArea);

    let selectArea = false;

    let handleMouseDown = function(e){
        e.preventDefault;
        selectArea = true;
        startX = e.clientX;
        startY = e.clientY;

        // 이벤트를 실행하면서 이벤트 삭제 (한번만 동작하도록)
		body.removeEventListener("mousedown", handleMouseDown);
    }

    body.addEventListener("mousedown", handleMouseDown);
    
    let handleMouseUp = function(e){
        selectArea = false;
        // (초기화)
        // 마우스 클릭을 떼면서 mousemove 이벤트 삭제
        body.removeEventListener("mousemove", handleMouseMove);
        // 스크린샷을 위해 생성한 객체 삭제
        screenshotArea.parentNode.removeChild(screenshotArea);
        screenshotBackground.parentNode.removeChild(screenshotBackground);

        let x = e.clientX;
        let y = e.clientY;
        let top = Math.min(y, startY);
		let left = Math.min(x, startX);
		let width = Math.max(x, startX) - left;
		let height = Math.max(y, startY) - top;
        
        html2canvas(document.body).then(
            function(canvas){
                // 선택 영역만큽 crop
                let img = canvas.getContext('2d').getImageData(left, top, width, height);
				let c = document.createElement("canvas");
				c.width = width;
				c.height = height;
				c.getContext('2d').putImageData(img, 0, 0);
				save(c); // crop한 이미지 저장
            }
        );
        body.removeEventListener("mouseup", handleMouseUp);
        // 마우스 커서 기본으로 변경
        body.classList.remove("edit_cursor")
    }

    body.addEventListener("mouseup", handleMouseUp);

    let handleMouseMove = function(e){
        let x = e.clientX;
		let y = e.clientY;
		screenshotArea.style.left = x;
		screenshotArea.style.top = y;
		if (selectArea) { //캡쳐 영역 선택 그림
			var top = Math.min(y, startY);
			var right = width - Math.max(x, startX);
			var bottom = height - Math.max(y, startY);
			var left = Math.min(x, startX);
			screenshotBackground.style.borderWidth = top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px';
		}
    }

    body.addEventListener("mousemove", handleMouseMove);

    let save = function save(canvas) { 
        if (navigator.msSaveBlob) {
            // Internet Explorer
            var blob = canvas.msToBlob();
            return navigator.msSaveBlob(blob, '파일명.jpg');
        } else {
            // Other browsers
            canvas.toBlob(function(blob) {
                var el = document.createElement('a');
                el.href = URL.createObjectURL(blob);
                el.download = '파일명.jpg';
                el.click();
            }, 'image/jpeg');
        }
    }
}

console.log(body);
