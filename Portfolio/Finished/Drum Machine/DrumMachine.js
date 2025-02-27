const powerButton = document.getElementById("switch");
const drumButtons = document.querySelectorAll(".drum-button");
const audioElements = document.querySelectorAll(".audio");
const displayWindow = document.getElementById("window");
const volumeSlider = document.getElementById("volume");

let powerOn = true;

powerButton.addEventListener("click", () => {
  powerOn = !powerOn;
  powerButton.classList.toggle("power-off", !powerOn);
});

drumButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (powerOn) {
      playAudio(index);
    }
  });
});

volumeSlider.addEventListener("input", () => {
  setVol(volumeSlider.value);
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const index = [...drumButtons].findIndex((button) => button.id === `btn-${key}`);
  if (powerOn && index !== -1) {
    playAudio(index);
  }
});

function playAudio(index) {
  const selectedAudio = audioElements[index];
  selectedAudio.currentTime = 0;
  selectedAudio.volume = volumeSlider.value;
  selectedAudio.play();
  displayWindow.textContent = selectedAudio.src.split("/").pop();
}

function setVol(volume) {
  audioElements.forEach((audio) => {
    audio.volume = volume;
  });
}
