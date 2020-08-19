
const videoElement = document.createElement('video');
videoElement.width = 300;
videoElement.height = 300;
videoElement.setAttribute('playsinline', '');
videoElement.muted = true;
videoElement.style.backgroundColor = '#000000';
document.body.appendChild(videoElement);

const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d')
canvasElement.width = 300;
canvasElement.height = 300;
canvasElement.style.backgroundColor = '#000000';
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
  alert(error.message);
});

(function render() {
  requestAnimationFrame(render);
  if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) return;
  const mediaTrackSettings = mediaStream.getVideoTracks()[0].getSettings();

  console.log(`w=${mediaTrackSettings.width}:h=${mediaTrackSettings.height}`);

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = mediaTrackSettings.width;
  let sourceHeight = mediaTrackSettings.height;
  const canvasAspectRatio = canvasElement.width / canvasElement.height;
  if (mediaTrackSettings.aspectRatio > canvasAspectRatio) {
    // 左右トリミング
    console.log('左右トリミング');
    sourceX = (mediaTrackSettings.width - mediaTrackSettings.height) * 0.5;
    sourceWidth = mediaTrackSettings.height;
  } else if (mediaTrackSettings.aspectRatio < canvasAspectRatio) {
    // 上下トリミング
    console.log('上下トリミング');
    sourceY = (mediaTrackSettings.height - mediaTrackSettings.width) * 0.5;
    sourceHeight = mediaTrackSettings.width;
  }

  canvasContext.drawImage(videoElement,
    sourceX, sourceY, sourceWidth, sourceHeight,
    0, 0, canvasElement.width, canvasElement.height
  );
}());
