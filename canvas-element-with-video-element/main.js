
const videoElement = document.createElement('video');
videoElement.width = 300;
videoElement.height = 300;
videoElement.setAttribute('playsinline', '');
videoElement.muted = true;
videoElement.style.backgroundColor = '#000000';
videoElement.style.width = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
videoElement.style.height = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
document.body.appendChild(videoElement);

const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d')
canvasElement.width = 300;
canvasElement.height = 300;
canvasElement.style.backgroundColor = '#000000';
canvasElement.style.width = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
canvasElement.style.height = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
document.body.appendChild(canvasElement);

let mediaStream = null;

const videoOption = {
  facingMode: 'environment',
};

window.navigator.mediaDevices.getUserMedia({
  video: videoOption,
  audio: false,
}).then((_mediaStream) => {
  mediaStream = _mediaStream;
  videoElement.srcObject = _mediaStream;
  videoElement.play();
}).catch((error) => {
  alert(`Catch Error name=[${error.name}] message=[${error.message}] constraint=[${error.constraint}]`);
});

(function render() {
  requestAnimationFrame(render);
  if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) return;
  const mediaTrackSettings = mediaStream.getVideoTracks()[0].getSettings();

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = mediaTrackSettings.width;
  let sourceHeight = mediaTrackSettings.height;
  const videoAspectRatio = mediaTrackSettings.aspectRatio ? mediaTrackSettings.aspectRatio : sourceWidth / sourceHeight;
  const canvasAspectRatio = canvasElement.width / canvasElement.height;
  if (videoAspectRatio > canvasAspectRatio) {
    // 左右トリミング
    sourceX = (sourceWidth - sourceHeight) * 0.5;
    sourceWidth = sourceHeight;
  } else if (videoAspectRatio < canvasAspectRatio) {
    // 上下トリミング
    sourceY = (sourceHeight - sourceWidth) * 0.5;
    sourceHeight = sourceWidth;
  }

  canvasContext.drawImage(videoElement,
    sourceX, sourceY, sourceWidth, sourceHeight,
    0, 0, canvasElement.width, canvasElement.height
  );
}());
