const microfonoAnimation = document.querySelector(".microfono_animation");
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const copyBtn = document.getElementById('copy-btn');
const vaciar = document.getElementById('vaciar');
const transcription = document.getElementById('transcription');
vaciar.addEventListener("click",Vaciar)

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.maxAlternatives = 1;
recognition.interimResults = true;
recognition.lang = 'es-ES';

function startRecognition() {
  transcription.value = ''; // Vaciar la transcripción anterior
  recognition.start();
  microfonoAnimation.style.animationPlayState = "running";
}

function stopRecognition() {
  recognition.stop();
  microfonoAnimation.style.animationPlayState = "paused";
}

function copyTranscription() {
  try {
    navigator.clipboard.writeText(transcription.value);
    console.log('Texto copiado al portapapeles');
  } catch (err) {
    console.log('No se pudo copiar el texto: ', err);
  }
}

function Vaciar (){
  console.log( transcription.value = "")
}

recognition.addEventListener("result", (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  if (event.results[event.results.length - 1].isFinal) {
    transcription.value += transcript + ' ';
  }
});

microfonoAnimation.addEventListener("click", startRecognition);
startBtn.addEventListener("click", startRecognition);
stopBtn.addEventListener("click", stopRecognition);
copyBtn.addEventListener("click", copyTranscription);

recognition.addEventListener("nomatch", () => {
  recognition.start();
});

recognition.addEventListener("error", (event) => {
  console.error(event.error);
});

recognition.addEventListener("end", () => {
  microfonoAnimation.style.animationPlayState = "paused";
});
