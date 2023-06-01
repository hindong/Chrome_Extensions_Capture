export var Camera = /** @class */ (function () {
    function Camera() {
        this.link = document.createElement("a");
    }
    Camera.prototype.screenShot = function () { };
    Camera.prototype.fullScreenShot = function () { };
    Camera.prototype.videoShot = function () { };
    Camera.prototype.downloadImage = function (dataUrl, filename) {
        this.link.href = dataUrl;
        this.link.download = filename;
        this.link.click();
    };
    return Camera;
}());

        


