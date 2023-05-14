/* Werden wir evtl. spätbenötigen für die Requests an die Datenbank */

let data1 = [];

async function getData1() {
  return fetch('https://it2wi1.if-lab.de/rest/mpr_fall1')
    .then(response => response.json())
    .catch(error => console.error(error));
}

const xhr = new XMLHttpRequest();
function getData12(){
xhr.open('GET', 'https://it2wi1.if-lab.de/rest/mpr_fall1');
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    // Use the data here
   return  data.forEach(element => {
    data1.push(element.werte)
   });



  } else {
    console.error('Request failed. Status code: ' + xhr.status);
  }
};
xhr.send();}

getData12();







async function getData2(){

  try {
    const response = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall2');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function getData3(){
  try {
    const response = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall3');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function getData4(){
  try {
    const response = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall4');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


