//Globale Werte - Array, welches die bereits requesteten Werte bereithalten kann
const FETCHED_DATA = [[], [], [], []];
let chart1;
let chart2;
let chart3;
let updateInterval = 1;
let timeLeft;
let timerRunning = null;
let timerWait = false;
let warnings = 0;
let intervall = -1; 
let bruch = false;
let weakBalljoints = false;
let leck = false;
let weakOil = false;
let lose = false;
let machineStopped = false;

let losesTeil1Indiz = false; 
let losesTeil2Indiz =false;

let activeLightYellow = false; 
let activeLightRed = false;


const redLight = document.getElementById("redlight");
const yellowLight = document.getElementById("yellowlight");
const greenLight = document.getElementById("greenlight");
const whiteLight = document.getElementById("whitelight");

let activeLight = greenLight;

let btnContinue = document.getElementById("btnContinue");
let btnStopMachine = document.getElementById("btnStopMachine");

whiteLight.style.opacity = 1;

async function getData(version) {
  let response = [];
/* 
  let randmonDataSet = Math.floor(Math.random() * 4); */
  let randmonDataSet = 2;



  switch (randmonDataSet) {
    case 0:
      if (FETCHED_DATA[0].length === 0) {
        /*         console.log(FETCHED_DATA[0]); */
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall1")
        ).json();
        /*         console.log("Fall1") */
        FETCHED_DATA[0] = response;
      } else {
        response = FETCHED_DATA[0];
        /*         console.log("Buffer 0: ", FETCHED_DATA); */
      }
      break;

    case 1:
      if (FETCHED_DATA[1].length === 0) {
        console.log(FETCHED_DATA[1]);
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall2")
        ).json();
        FETCHED_DATA[1] = response;
        /*         console.log("Fall2") */
      } else {
        response = FETCHED_DATA[1];
        /*         console.log("Buffer 1: ", FETCHED_DATA); */
      }
      break;

    case 2:
      if (FETCHED_DATA[2].length === 0) {
        /*         console.log(FETCHED_DATA[2]); */
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall3")
        ).json();
        /*         console.log("Fall3") */
        FETCHED_DATA[2] = response;
      } else {
        response = FETCHED_DATA[2];
        /*         console.log("Buffer 2: ", FETCHED_DATA); */
      }
      break;

    case 3:
      if (FETCHED_DATA[3].length === 0) {
        /*         console.log(FETCHED_DATA[3]); */
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall4")
        ).json();
        /*         console.log("Fall4") */
        FETCHED_DATA[3] = response;
      } else {
        response = FETCHED_DATA[3];
        /*         console.log("Buffer 3: ", FETCHED_DATA); */
      }
      break;

    default:
    /*       console.log("Fatal error getting data"); */
  }

  /*   console.log("FETCH: ", FETCHED_DATA[0].length); */

  return getDataPoints(response, version);
}
async function getDataPoints(dataSet, version) {
  XData = [];
  YData = [];
  YData2 = [];

  switch (version) {
    case "temperatur":
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_temp);
        XData.push(dataSet[i].datum);
  

      }
      break;

    case "vibration":
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_vibr);
        XData.push(dataSet[i].datum);
        YData2.push(dataSet[i].werte.Tavg_temp);

      }
      break;

    case "laut":
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_laut);
        XData.push(dataSet[i].datum);
      }
      break;
    default:
    /*       console.log("Unknown Parsing type"); */
  }
  return [XData, YData,YData2];
}






let values = [];

function checkDifference() {
    if (values.length >= 5) {
        if (Math.abs(values[0] - values[4]) > 6) {
          /*   throw new Error("Die Differenz zwischen dem ersten und dem fünften Wert ist größer oder gleich 6"); */
        losesTeil1Indiz = true;
        }
    }
}

function receiveData(value) {
    values.push(value);
    if (values.length > 5) {
        values.shift();
    }
    checkDifference();
}


let values2 = [];

function checkDifference2() {
    if (values2.length >= 5) {
        if (Math.abs(values2[0] - values2[4]) > 0.02) {
            losesTeil2Indiz = true; 
            console.log("Diff > 0.02")
        }
    }
}

function receiveData2(value2) {
    values2.push(value2);
    if (values2.length > 5) {
        values2.shift();
    }
    checkDifference2();
}








function closeDialogAfterDelay(dialogId) {
  let dialog = document.getElementById(dialogId);
  let timeLeft = 10;
  dialog.showModal();
  let timer = setInterval(function () {
    if (timeLeft == 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Anzeige wird geschlossen!";
      dialog.close();
    } else {
      document.getElementById("timer").innerHTML =
        "Anzeige wird in " + timeLeft + " Sekunden geschlossen!";
    }
    timeLeft -= 1;
  }, 1000);
}

let tempArray = [];
/* function checkDifference(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (Math.abs(array[i] - array[i+1]) > 6) {
      return true;
    }
  }
  return false;
}
 */
/* function checkDifference2(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (Math.abs(array[i] - array[i+1]) > 0.2) {
      return true;
    }
  }
  return false;
}

function checkDifference(array) {
  for (let i = 0; i < array.length - 1; i++) {
      if (Math.abs(array[i] - array[i + 1]) <= 6) {
          return false;
      }
  }
  return true;
}
 */



/* function checkIncomingData(value1, value2) {


  tempArray.push(value1);
  if (tempArray.length === 5) {
    let result = checkDifference(tempArray);
    if (result) {
      console.log('1. Indiz für loses Teil (Abweichung letzte 5 Sec. >): Temp: 6');
    } else {
      console.log('Keine Differenz von mehr als 6 wurde gefunden');
    }
    tempArray.shift();
  }


  if (Math.abs(value2 - tempArray[1]) > 0.02) {
    console.log('2. Indiz für loses Teil (Abweichung letzte 5 Sec. >): Vibr: 0.02');
  } else {
    console.log('Die Differenz zwischen dem zweiten und dem dritten Wert überschreitet nicht 0.02');
  }
}
 */
function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
function drop() {
  /*   console.log("Dropped"); */
  $(".dropdown-toggle").dropdown();
}
function timer() {
  if (timerRunning) {
    timerWait = true;
    return;
  }
  const timerButton = document.querySelector("#timer-btn");
  timeLeft = updateInterval;
  /* console.log(timeLeft); */
  timerRunning = setInterval(() => {
    timeLeft--;
    timerButton.textContent = timeLeft;

    if ((timeLeft <= 0) & !timerWait) {
      timeLeft = updateInterval;
    } else if (timeLeft <= 0) {
      clearTimeout(timerRunning);
      timerRunning = null;
      timerWait = false;
      timer();
    }
  }, 1000);
}
async function countdownTimer() {
  let timeLeft = 5;

  let timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Zeit abgelaufen!";
    } else {
      document.getElementById("timer").innerHTML =
        timeLeft + " Sekunden verbleibend";
    }
    timeLeft -= 1;
  }, 1000);
}
function reloadPage() {
  location.reload();
}
function selectInterval(item_id) {
  /*   console.log(item_id); */
  switch (item_id) {
    case "5s":
      updateInterval = 5;
      timer();
      break;
    case "10s":
      updateInterval = 10;
      timer();
      break;
    case "30s":
      updateInterval = 30;
      timer();
      break;
    case "1m":
      updateInterval = 60;
      timer();
      break;
    case "3m":
      updateInterval = 3 * 60;
      timer();
      break;
    case "5m":
      updateInterval = 5 * 60;
      timer();
      break;
    case "debug":
      updateInterval = 0;
      whiteLight.style.opacity = 0.3;
      break;
  }
  let dialog = document.getElementById("succUpdateDialog");
  dialog.showModal();
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function sleepCheckMachine(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function checkForProblems(dataset, data, thresholdA, thresholdB) {
  //let min = Math.min.apply(Math, data);
  let max = Math.max.apply(Math, data);
  let badgeIcon = document.getElementById("warningBadge");

  switch (dataset) {
    case "Schmiermittelverbrauch – Temperatur":
      let maxSpike1 = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        let tempSpike = data[i + 1] - data[i];
        if (tempSpike > maxSpike1) {
          maxSpike1 = tempSpike;
        }
      }
      if (!leck && maxSpike1 > 2.5) {
        /*       console.log("Leck"); */
        if(!weakOil) {
          warnings = warnings + 1;
          badgeIcon.innerText = warnings;
        }    
        leck = true;
        console.log("Leck + 1");
      }
      break;
    case "Kugellagerlauf – Vibration und Akustik":
      let maxSpike2 = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        let tempSpike = data[i + 1] - data[i];
        if (tempSpike > maxSpike2) {
          maxSpike2 = tempSpike;
        }
      }
      if (!bruch && maxSpike2 > 5) {
        /*         console.log("Bruch: ", maxSpike2); */
        if(!weakBalljoints){
          warnings = warnings + 1;
          badgeIcon.innerText = warnings;
        }
        bruch = true;
        console.log("Bearing + 1");
      } else if (!bruch && !weakBalljoints && maxSpike2 > 0.3) {
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        weakBalljoints = true;
        console.log("Bruch + 1");
      }
      break;
    case "Anlageninnenleben – Vibration und Akustik":
      let maxSpike3 = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        let tempSpike = data[i + 1] - data[i];
        if (tempSpike > maxSpike3) {
          maxSpike3 = tempSpike;
        }
      }
      if (!lose && maxSpike3 >= 0.3) {
        /*         console.log("Lose Teile: ", maxSpike3); */
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        lose = true;
        console.log("Lose + 1");
      }
      break;
    default:
    /*       console.log("Not recognized"); */
  }

  if (max > thresholdB) {
    /*     countdownTimer() */
    machineStopped = true;
    /*     console.log("Red line excedded: ", dataset); */
    let dialog = document.getElementById("redLine");
    let tasksRed = document.getElementById("tasksRed1");
    let tasksRed2 = document.getElementById("tasksRed2");
    let tasksRed3 = document.getElementById("tasksRed3");
    let tasksRed4 = document.getElementById("tasksRed4");
    
    if (dialog !== null /* &&  *//* dialog.open.id != dataset */) {
      dialog.showModal();
   /*    dialog.id = dataset; */
    } else {
      /*  console.log("Dialog is already displaying"); */
    }

    let nameField = document.getElementById("placerholderRed");

    if (/* activeLight !== redLight */ activeLightYellow == true) {
      activeLight.style.opacity = 0.3;
      activeLight = redLight;
      redLight.style.opacity = 1;
    }

/*     console.log(dataset); */
    if (dataset === "Schmiermittelverbrauch – Temperatur" && tasksRed.innerHTML === "") {
      nameField.innerHTML = '"' + dataset + '"';
      tasksRed.innerHTML = "Step 1: Check for leaks!";
      tasksRed2.innerHTML = "Step 2: Clean motor!";
      tasksRed3.innerHTML = "Step 3: Change Oil!";
      return; 
    } else if (dataset === "Anlageninnenleben – Vibration und Akustik" && tasksRed.innerHTML === "") {
      nameField.innerHTML = '"' + dataset + '"';
      tasksRed.innerHTML = "Step 1: Check for foreign objects!";
      tasksRed2.innerHTML = "Step 2: Check for wear!";
      tasksRed3.innerHTML = "Step 3: Perform maintenance!";
      return;
    } else if (dataset === "Kugellagerlauf – Vibration und Akustik" && tasksRed.innerHTML ==="") {
      nameField.innerHTML = '"' + dataset + '"';
      tasksRed.innerHTML = "Step 1: Check the bearing for wear!";
      tasksRed2.innerHTML = "Step 2: Check the bearing for contamination!";
      tasksRed3.innerHTML = "Step 3: Add lubricant!";
      tasksRed4.innerHTML = "Step 4: Replace the bearing!";
      return; 
    }


  } else if (max > thresholdA) {
    /*     console.log("Yellow line excedded: ", dataset); */
    if (dataset === "Schmiermittelverbrauch – Temperatur" && !weakOil && !leck) {
      warnings = warnings + 1;
      badgeIcon.innerText = warnings;
      weakOil = true;
      console.log("WeakOil")
    }
    let dialog = document.getElementById("yellowLine");
    if (dialog !== null && dialog.open.id != dataset) {
    /*   closeDialogAfterDelay("yellowLine"); */
    dialog.showModal()
      dialog.id = dataset;
    } 

    let nameField2 = document.getElementById("placerholderYellow");

    if ( activeLightYellow == false/*  && activeLight !== yellowLight && redLight.style.opacity !== 1 */) {
      activeLightYellow = true;
      //yellowLight.style.opacity = 0.3;
      nameField2.innerHTML = '"' + dataset + '"';
      activeLight.style.opacity = 0.3;
      activeLight = yellowLight;
      yellowLight.style.opacity = 1;
    }
  }
}
function stopMachine() {
  machineStopped = true;
  return machineStopped;
}
function continueMachine() {
  machineStopped = false;
  return machineStopped;
}

async function visualizeData1() {
  renderData1 = [
    {
      title: "Schmiermittelverbrauch – Temperatur",
      schaden: "Schadensgrenze überschritten!: ",
      schadenText: "Schadensgrenze_temp: 150",
      schadenWert: 150,
      toleranz: "Toleranzgrenze überschritten!: ",
      toleranzText: "Toleranzgrenze_temp: 75",
      toleranzWert: 75,
      innenleben: "Schmiermittelverbrauch Normal: ",
      chartID: 1,
      yText: "Tavg_laut",
      offsetX_S: 140,
      offsetX_T: 127,
      min: 0,
      max: 300
    }
  ];

  let rawData = await getData("temperatur");
  let Xdata = await rawData[0];
  let Ydata = await rawData[1];
/*   let Ydata2 = await rawData2[1];
 */
  
  
  Ydata = Ydata.map(function (value) {
    return value.replace(",", ".");
  });
/*   Ydata2 = Ydata2.map(function (value) {
    return value.replace(",", ".");
  }); */



  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ""));
  let timeArray2 = getMinutesEveryFive(timeArray);
  let currentDataX = timeArray2.slice(0, 10);
  let currentDataY = Ydata.slice(0,10);
/*   let currentDataY2 = Ydata2.slice(0,10);
 */
  

  /*   console.log("X: ", timeArray2); */

  if (updateInterval !== 0) {
    RenderChart(renderData1, [], []);
    //checkForProblems(renderData1[0].title, currentDataY, renderData1[0].toleranzWert, renderData1[0].schadenWert);
    let i = 0;
    let timeStart = 0;
    while (1) {

 
      if (updateInterval === 0) {
        break;
      }
      let timeEnd = timeStart + updateInterval;
/* 
      if (i == timeArray2.length) {
        visualizeData1();
      }
 */
      await sleep(updateInterval * intervall);
      currentDataX[i] = getCurrentTime();
      currentDataY = Ydata.slice(0, timeEnd);
/*       currentDataY2 = Ydata2.slice(0, timeEnd)
      checkIncomingData(currentDataY[i],currentDataY2[i]) */



      RenderChart(renderData1, currentDataY, currentDataX);
      /*  console.log(currentDataX, "\n", currentDataY); */
      checkForProblems(
        renderData1[0].title,
        currentDataY,
        renderData1[0].toleranzWert,
        renderData1[0].schadenWert
      );



       
      
      if (i === 1) {
        //Grundeisntellung Licht von weiß auf Grün (einmalig)
        /*    console.log("Go green"); */
        whiteLight.style.opacity = 0.3;
        activeLight = greenLight;
        greenLight.style.opacity = 1;
      }

/*       if (machineStopped == true){
        console.log("Machine Stopped VS1")
        return;
      } */

      timeStart = timeEnd;
      i++;
    }
  }

}
async function visualizeData2() {
  renderData2 = [
    {
      title: "Kugellagerlauf – Vibration und Akustik",
      schaden: "Schadensgrenze_laut überschritten!: ",
      schadenText: "Schadensgrenze_laut: 117",
      schadenWert: 117,
      toleranz: "Toleranzgrenze_laut überschritten!: ",
      toleranzText: "Toleranzgrenze_laut: 80",
      toleranzWert: 80,
      innenleben: "Kugellagerakustik Normal: ",
      chartID: 2,
      yText: "Tavg_laut",
      offsetX_S: 134,
      offsetX_T: 121,
      min: 0,
      max: 300
    }
  ];

  let rawData = await getData("laut");

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];

  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ""));
  let timeArray2 = getMinutesEveryFive(timeArray);
  let currentDataX = timeArray2.slice(0, 10);
  Ydata = Ydata.map(function (value) {
    return value.replace(",", ".");
  });
  let currentDataY = Ydata.slice(0, 10);

  if (updateInterval !== 0) {
    RenderChart(renderData2, [], []);
    let i = 0;

    let timeStart = 0;
    while (1) {

     
      if (updateInterval === 0) {
        break;
      }

      let timeEnd = timeStart + updateInterval;

      if (i == timeArray2.length) {
        visualizeData2();
      }
      await sleep(updateInterval * intervall);
      currentDataX[i] = getCurrentTime();
      currentDataY = Ydata.slice(0, timeEnd);
      RenderChart(renderData2, currentDataY, currentDataX);
      checkForProblems(
        renderData2[0].title,
        currentDataY,
        renderData2[0].toleranzWert,
        renderData2[0].schadenWert
      );
/*         if(machineStopped == true){
          console.log("Machine stopped VS2")
          
          return; 
        }
 */
      timeStart = timeEnd;
      i++;
    }
  }
  RenderChart(renderData2, Ydata, timeArray2);
  checkForProblems(
    renderData2[0].title,
    Ydata,
    renderData2[0].toleranzWert,
    renderData2[0].schadenWert
  );
  if (machineStopped == true) {
    return;}









}
async function visualizeData3() {
  renderData3 = [
    {
      title: "Anlageninnenleben – Vibration und Akustik",
      schaden: "Schadengrenze_vibr überschritten!: ",
      schadenText: "Schadensgrenze_vibr: 0.40000",
      schadenWert: 0.4,
      toleranz: "Toleranzgrenze_vibr überschritten!: ",
      toleranzText: "Toleranzgrenze_laut: 0.15000",
      toleranzWert: 0.15,
      innenleben: "Anlageninnenleben Normal: ",
      chartID: 3,
      yText: "Tavg_vibr",
      offsetX_S: 155,
      offsetX_T: 150,
      min: 0.0,
      max: 1.0
    }
  ];

  let rawData = await getData("vibration");

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];
  let YData2 = await rawData[2];
  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ""));
  let timeArray2 = getMinutesEveryFive(timeArray);
  let currentDataX = timeArray2.slice(0, 10);
  Ydata = Ydata.map(function (value) {
    return value.replace(",", ".");
  });
  let currentDataY = Ydata.slice(0, 10);
  YData2 = YData2.map(function (value) {
     return value.replace(",", ".");
  });




  if (updateInterval !== 0) {
    RenderChart(renderData3, [], []);
    let i = 0;
    let timeStart = 0; //Weil in erster Interation updateInterval * 2 nötig
    while (1) {



      if (updateInterval === 0) {
        break;
      }
      let timeEnd = timeStart + updateInterval;
      /*       if (timeEnd >= Ydata.length) {
        break;
      } */

   /*    if (i == timeArray2.length) {
        visualizeData3();
      }
 */
      await sleep(updateInterval * intervall);
      currentDataX[i] = getCurrentTime();
      currentDataY = Ydata.slice(0, timeEnd);

      receiveData(YData2[i]);
      receiveData2(Ydata[i]);
   
      //console.log("Anlageninnenleben_temp: " + YData2[i] +" Anlageninnenleben_vibration: " + Ydata[i])
     









      RenderChart(renderData3, currentDataY, currentDataX);

      checkForProblems(
        renderData3[0].title,
        currentDataY,
        renderData3[0].toleranzWert,
        renderData3[0].schadenWert
      );
/*       if(machineStopped==true){
        console.log("Machine Stopped VS3")
        return; 
      } */
      timeStart = timeEnd;
      i++;
    }
  }
  RenderChart(renderData3, Ydata, timeArray2);
  checkForProblems(
    renderData3[0].title,
    currentDataY,
    renderData3[0].toleranzWert,
    renderData3[0].schadenWert
  );
}
function RenderChart(renderData, YData, timeArray2) {
  if (machineStopped == false) {
    if (renderData[0].chartID === 1) {
      if (chart1 !== undefined) {
        chart1.updateSeries([
          {
            data: YData
          }
        ]);
        chart1.updateOptions({
          xaxis: {
            title: {
              text: "Zeit in Sekunden"
            },
            labels: {},
            categories: timeArray2
          }
        });
        return;
      }
    } else if (renderData[0].chartID === 2) {
      if (chart2 !== undefined) {
        chart2.updateSeries([
          {
            data: YData
          }
        ]);
        chart2.updateOptions({
          xaxis: {
            title: {
              text: "Zeit in Sekunden"
            },
            labels: {},
            categories: timeArray2
          }
        });
        return;
      }
    } else {
      if (chart3 !== undefined) {
        chart3.updateSeries([
          {
            data: YData
          }
        ]);
        chart3.updateOptions({
          xaxis: {
            title: {
              text: "Zeit in Sekunden"
            },
            labels: {},
            categories: timeArray2
          }
        });
        return;
      }
    }

    /*   console.log("Render: ", renderData[0].title); */
    const options = {
      toolbar: {
        tools: {
          pan: true
        }
      },
      chart: {
        fontFamily: "Roboto, sans-serif",
        type: "line",
        width: 600,
        height: 600,
        background: "#859cac"
      },
      title: {
        text: renderData[0].title,
        align: "center",
        margin: 10,
        floating: false,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#263238"
        }
      },
      zoom: {
        enabled: true
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            switch (renderData[0].chartID) {
              case 3:
                if (value.toFixed(4) >= renderData[0].schadenWert) {
                  return renderData[0].schaden + value.toFixed(4);
                } else if (value.toFixed(4) >= renderData[0].toleranzWert) {
                  return renderData[0].toleranz + value.toFixed(4);
                } else {
                  return renderData[0].innenleben + value.toFixed(4);
                }
              default:
                if (value >= renderData[0].schadenWert) {
                  return renderData[0].schaden + value;
                } else if (value >= renderData[0].toleranzWert) {
                  return renderData[0].toleranz + value;
                } else {
                  return renderData[0].innenleben + value;
                }
            }
          }
        },
        style: {
          backgroundColor: "FF0099"
        }
      },
      series: [
        {
          name: "",
          data: YData
        }
      ],
      annotations: {
        yaxis: [
          {
            y: renderData[0].max,
            y2: renderData[0].schadenWert,
            borderColor: "red",
            fillColor: "red",
            label: {
              text: "Sehr sehr schlecht",
              position: "left",
              offsetX: 95
            }
          },
          {
            y: renderData[0].schadenWert,
            y2: renderData[0].toleranzWert,
            borderColor: "yellow",
            fillColor: "yellow",
            label: {
              text: renderData[0].schadenText,
              position: "left",
              offsetX: renderData[0].offsetX_S
            }
          },
          {
            y: renderData[0].toleranzWert,
            borderColor: "yellow",
            fillColor: "yellow",
            label: {
              text: renderData[0].toleranzText,
              position: "left",
              offsetX: renderData[0].offsetX_T
            }
          }
        ]
      },
      yaxis: {
        min: renderData[0].min,
        max: renderData[0].max,
        title: {
          text: renderData[0].yText,
          style: {
            fontSize: "15px"
          }
        }
      },
      xaxis: {
        title: {
          text: "Zeit in Sekunden"
        },
        labels: {},
        categories: timeArray2
      },
      noData: {
        text: "Please wait while we fetch data...",
        style: {
          fontSize: "30px",
          fontWeight: "bold"
        }
      }
    };

    if (renderData[0].chartID === 1) {
      chart1 = new ApexCharts(document.querySelector("#chart1"), options);
      /*    console.log("Render 1"); */
      chart1.render();
    } else if (renderData[0].chartID === 2) {
      chart2 = new ApexCharts(document.querySelector("#chart2"), options);
      /*     console.log("Render 2"); */
      chart2.render();
    } else {
      chart3 = new ApexCharts(document.querySelector("#chart3"), options);
      /*     console.log("Render 3"); */
      chart3.render();
    }
  } else {
    renderData = [];
  }
}
function getSecondsEveryFive(array) {
  const result = [];
  array.forEach((time) => {
    const seconds = parseInt(time.split(":")[2], 10);

    if (seconds % 5 === 0) {
      /*       console.log(result); */
      result.push(time);
    }
  });
  return result;
}
function getMinutesEveryFive(array) {
  const result = [];
  array.forEach((time) => {
    const minutes = parseInt(time.split(":")[1], 10);

    if (minutes % 1 === 0) {
      result.push(time);
    }
  });
  return result;
}
function showWarnings() {
  let targetModal = document.getElementById("warningModal");
  let inner = "All problems are listed below:<br>";
  let cardHeader =
    '<div class="card" style="width: 18rem; margin-top:2rem; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">';
  let cardBody = '<div class="card-body">';
  let cardEnd = "</div></div>";

  if (warnings === 0) {
    /*     console.log("Warning pressed"); */
    let text =
      "There are no signs of failures within the machine. <br> Keep monitoring the setup closely.";
    inner =
      inner +
      cardHeader +
      cardBody +
      '<h5 class="card-title" style="color: green;">' +
      "All good" +
      "</h5>" +
      '<p class="card-text" style="line-height: 2;">' +
      text +
      "</p>" +
      cardEnd;
  } else {
    if (weakOil && !leck) {
      let text01 =
        "<p> The oil is most likely going bad! <br> You should request a technician to inspect the oil as soon as possible to prevent damage.</p>";
      inner =
        inner +
        cardHeader +
        cardBody +
        '<h5 class="card-title" style="color: #e0eb44;">' +
        "Check oil!" +
        "</h5>" +
        '<p class="card-text" style="line-height: 2;">' +
        text01 +
        "</p>" +
        cardEnd;
    }
    if (weakBalljoints && !bruch) {
      let text02 =
        "<p> The ball-bearings are most likely going bad! <br> You should request a technician to inspect the ball-bearings as soon as possible to prevent damage.</p>";
      inner =
        inner +
        cardHeader +
        cardBody +
        '<h5 class="card-title" style="color:#e0eb44;">' +
        "Check ball-bearings" +
        "</h5>" +
        '<p class="card-text" style="line-height: 2;">' +
        text02 +
        "</p>" +
        cardEnd;
    }
    if (leck) {
      let text1 =
        "<p> It looks like the motor is leaking oil resulting in rapid overheating! <br> You should immediatly request a technician to inspect any potetial damage.</p>";
      inner =
        inner +
        cardHeader +
        cardBody +
        '<h5 class="card-title" style="color: red;">' +
        "Leakage detected" +
        "</h5>" +
        '<p class="card-text" style="line-height: 2;">' +
        text1 +
        "</p>" +
        cardEnd;
    }
    if (bruch) {
      let text2 =
        "<p> It is highly likely a part of the machine broke off! <br> You should immediatly request a technician to inspect any potetial damage.</p>";
      inner =
        inner +
        cardHeader +
        cardBody +
        '<h5 class="card-title" style="color: red;">' +
        "Breakage detected" +
        "</h5>" +
        '<p class="card-text" style="line-height: 2;">' +
        text2 +
        "</p>" +
        cardEnd;
    }
    if (lose) {
      let text3 =
        "<p> There seem to be parts of  <br> You should immediatly request a technician to inspect any potetial damage.</p>";
      inner =
        inner +
        cardHeader +
        cardBody +
        '<h5 class="card-title" style="color: red;">' +
        "Lose parts detected" +
        "</h5>" +
        '<p class="card-text" style="line-height: 2;">' +
        text3 +
        "</p>" +
        cardEnd;
    }
  }
  inner =
    inner +
    '<form method="dialog" style="margin-top: 30px;">' +
    '<button class="btn btn-warning" style="float: right; margin-right: 4rem;" value="cancel" formmethod="dialog">OK</button>' +
    "</form>";
  targetModal.showModal();
  targetModal.innerHTML = inner;
}







const dialog = document.querySelector("#text-dialog");
const openDialogBtn = document.querySelector("#open-dialog-btn");
const closeDialogBtn = document.querySelector("#close-dialog-btn");
const dialog2 = document.querySelector("#yellowLine");




function main(){
visualizeData1();
visualizeData2();
visualizeData3();


if (machineStopped == true){
  console.log("Machine stopped");
  return;
}
}








main()





