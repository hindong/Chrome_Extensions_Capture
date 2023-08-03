var bodyElement = document.querySelector('body');

// 마우스 포인터를 설정해준다.
document.body.style.cursor = "cell";
document.title = "New Page Title";

console.log("load script");

// 마우스를 누르는 순간 이벤트 발생
bodyElement.addEventListener('mousedown', captureEvent);

function captureEvent() {
    // dosomething

    // 화면이 어두워진다.
    document.body.style.background = "red";
    // 마우스를 드래그하는 순간 캡쳐범위를 지정해준다.

    // 마우스를 뗴는 순간 캡쳐가 완료된다.

    // 모든 이벤트를 처리하고 종료된다.

    // 마우스 포인터를 원래 모양으로 변경시킨다.

    document.body.style.cursor = "default";
    bodyElement.removeEventListener('mousedown', captureEvent);
}

