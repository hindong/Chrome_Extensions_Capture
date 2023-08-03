// screenshot script

let body = document.querySelector('body');



// 마우스 커서를 변경
body.style.cursor = "cell";


let overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // 어둡게 만들고자 하는 배경색 설정
overlay.style.zIndex = '9999'; // 다른 요소들보다 위에 표시하기 위한 z-index 값

let underlay = document.createElement('div');
underlay.style.position = 'fixed';
underlay.style.top = '0';
underlay.style.left = '0';
underlay.style.width = '100%';
underlay.style.height = '100%';
underlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 밝게 만들고자 하는 배경색 설정
underlay.style.zIndex = '9999'; // 다른 요소들보다 위에 표시하기 위한 z-index 값


// body에 어둡게 만들고자 하는 배경 추가
body.appendChild(overlay);


// 마우스 좌표
let startX, startY, endX, endY;

let mousedownHandler = body.addEventListener('mousedown', (event)=>{
    startX = event.clientX;
    startY = event.clientY;
    body.appendChild(underlay);
});


let mousemoveHandler = document.addEventListener('mousemove', function(event) {
    if (underlay.parentNode) {
      endX = event.clientX;
      endY = event.clientY;
  
      const selectionWidth = Math.abs(endX - startX);
      const selectionHeight = Math.abs(endY - startY);
  
      underlay.style.clipPath = `inset(${startY}px ${window.innerWidth - endX}px ${window.innerHeight - endY}px ${startX}px)`;
    }
});

let mouseupHandler = document.addEventListener('mouseup', function() {
    if (underlay.parentNode) {
      body.removeChild(underlay);
      body.removeChild(overlay);
      // 여기에서 선택한 부분에 대한 처리 로직을 추가할 수 있습니다.
    }
});



document.removeEventListener('mousedown', mousedownHandler);
document.removeEventListener('mousemove', mousemoveHandler);
document.removeEventListener('mouseup', mouseupHandler);