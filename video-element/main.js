
const videoElement = document.createElement('video');
videoElement.width = 300;
videoElement.height = 300;
videoElement.setAttribute('playsinline', '');
videoElement.muted = true;
videoElement.autoplay = true;
videoElement.style.backgroundColor = '#000000';
videoElement.style.width = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
videoElement.style.height = window.innerWidth > window.innerHeight ? '100vh' : '100vw';
document.body.appendChild(videoElement);

const videoOption = {
  facingMode: 'environment',
};

window.navigator.mediaDevices.getUserMedia({
  video: videoOption,
  audio: false,
}).then((mediaStream) => {
  videoElement.srcObject = mediaStream;
}).catch((error) => {
  alert(`Catch Error name=[${error.name}] message=[${error.message}] constraint=[${error.constraint}]`);
});
