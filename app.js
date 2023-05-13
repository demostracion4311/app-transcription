const microfonoAnimation = document.querySelector(".microfono_animation");
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const copyBtn = document.getElementById('copy-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let transcription = document.getElementById('transcription').value;

recognition.continuous = true;
recognition.maxAlternatives = 1;
recognition.interimResults = true;
recognition.lang = 'es-ES';

recognition.addEventListener("result", (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  if (event.results[event.results.length - 1].isFinal) {
    transcription = document.getElementById('transcription');
    transcription.value += transcript + ' ';
  }
});

microfonoAnimation.addEventListener("click", () => {
  startRecognition();
});

startBtn.addEventListener("click", () => {
  startRecognition();
});

stopBtn.addEventListener("click", () => {
  stopRecognition();
});

copyBtn.addEventListener("click", () => {
  copyTranscription();
});

// Función para iniciar el reconocimiento de voz
function startRecognition() {
  // Comenzar a escuchar el audio
  recognition.start();
  microfonoAnimation.style.animationPlayState = "running";
}

// Función para detener el reconocimiento de voz
function stopRecognition() {
  // Detener el reconocimiento de voz
  recognition.stop();
  microfonoAnimation.style.animationPlayState = "paused";
}

function copyTranscription() {
    let transcriptionTextarea = document.getElementById('transcription');
    transcriptionTextarea.select();
  
    try {
      navigator.clipboard.writeText(transcriptionTextarea.value);
      console.log('Texto copiado al portapapeles');
    } catch (err) {
      console.log('No se pudo copiar el texto: ', err);
    }
  }
  
  
  

// Detectar cuando el reconocimiento de voz ha terminado
recognition.addEventListener("end", () => {
  microfonoAnimation.style.animationPlayState = "paused";
});
