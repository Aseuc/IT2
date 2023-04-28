const redLight = document.getElementById("redlight");
const yellowLight = document.getElementById('yellowlight');
const greenLight = document.getElementById('greenlight');
const whiteLight = document.getElementById('whitelight');
let activeLight = redLight;




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
