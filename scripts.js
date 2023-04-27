const redLight = document.querySelector('.red');
const yellowLight = document.querySelector('.yellow');
const greenLight = document.querySelector('.green');

let activeLight = redLight;

setInterval(() => {
  activeLight.classList.remove('on');

  if (activeLight === redLight) {
    activeLight = greenLight;
  } else if (activeLight === yellowLight) {
    activeLight = redLight;
  } else {
    activeLight = yellowLight;
  }

  activeLight.classList.add('on');
}, 2000);
