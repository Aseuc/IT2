/* HTML Elemente sind mit IDs versehen (id="redlight"...), womit man durch javascript auf diese Elemente zugreifen kann */

const redLight = document.getElementById("redlight");
const yellowLight = document.getElementById('yellowlight');
const greenLight = document.getElementById('greenlight');
const whiteLight = document.getElementById('whitelight');
let activeLight = redLight;


/* Ändert die Transparenz der Ampellichter jede Sekunde ein anderes Licht  */

 setInterval(() => {

  if (activeLight === redLight) {
    redLight.style.opacity = 1;
    whiteLight.style.opacity = 0.3;
    activeLight = yellowLight;
  } else if (activeLight === yellowLight) {
    yellowLight.style.opacity = 1;
    redLight.style.opacity = 0.3;
    activeLight = greenLight;
  } else if (activeLight === greenLight) {
    greenLight.style.opacity = 1;
    yellowLight.style.opacity = 0.3;
    activeLight = whiteLight;
   } else if (activeLight === whiteLight) {
        whiteLight.style.opacity = 1;
        greenLight.style.opacity = 0.3;
        activeLight = redLight;

    }
  
}, 1000);

/* Für den Timer wird hier die Zeit angezeigt wie lange beispielsweise die Anwendung etc. noch läuft. erstmal nur Beispielcode*/
function timer(){
let timeLeft = 60;
const timerButton = document.querySelector('#timer-btn');

  const timer = setInterval(() => {
    timeLeft--;
    timerButton.textContent = timeLeft;

    if (timeLeft === 0) {
      /* clearInterval(timer); */
      timeLeft = 10;
    }
  }, 1000);}