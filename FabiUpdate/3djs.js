//Globale Werte - Array, welches die bereits requesteten Werte bereithalten kann
const FETCHED_DATA = [[], [], [], []];
let chart1;
let chart2;
let chart3;
let updateInterval = 10;
let timeLeft;
let timerRunning = null;
let timerWait = false;
let warnings = 0;

let bruch = false;
let weakBalljoints = false;
let leck = false;
let weakOil = false;
let lose = false;

const redLight = document.getElementById("redlight");
const yellowLight = document.getElementById("yellowlight");
const greenLight = document.getElementById("greenlight");
const whiteLight = document.getElementById("whitelight");
let activeLight = greenLight;

whiteLight.style.opacity = 1;

function drop() {
  console.log("Dropped");
  $(".dropdown-toggle").dropdown();
}

function timer() {
  if (timerRunning) {
    timerWait = true;
    return;
  }
  const timerButton = document.querySelector("#timer-btn");
  timeLeft = updateInterval;
  console.log(timeLeft);
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

function selectInterval(item_id) {
  console.log(item_id);
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

function checkForProblems(dataset, data, thresholdA, thresholdB) {
  //let min = Math.min.apply(Math, data);
  let max = Math.max.apply(Math, data);
  let badgeIcon = document.getElementById("warningBadge");
  console.log("Daten:", data);

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
        console.log("Leck");
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        leck = true;
      }
      if (updateInterval > 0) {
        break;
      }
    case "Kugellagerlauf – Vibration und Akustik":
      let maxSpike2 = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        let tempSpike = data[i + 1] - data[i];
        if (tempSpike > maxSpike2) {
          maxSpike2 = tempSpike;
        }
      }
      if (!bruch && maxSpike2 > 5) {
        console.log("Bruch: ", maxSpike2);
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        bruch = true;
      } else if (!bruch && !weakBalljoints && maxSpike2 > 0.3) {
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        weakBalljoints = true;
      }
      if (updateInterval > 0) {
        break;
      }
    case "Anlageninnenleben – Vibration und Akustik":
      let maxSpike3 = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        let tempSpike = data[i + 1] - data[i];
        if (tempSpike > maxSpike3) {
          maxSpike3 = tempSpike;
        }
      }
      if (!lose && maxSpike3 >= 0.3) {
        console.log("Lose Teile: ", maxSpike3);
        warnings = warnings + 1;
        badgeIcon.innerText = warnings;
        lose = true;
      }
      if (updateInterval > 0) {
        break;
      }
    default:
      console.log("Not recognized");
  }

  if (max > thresholdB) {
    console.log("Red line excedded: ", dataset);
    let dialog = document.getElementById("redLine");
    if (dialog !== null && dialog.open.id != dataset) {
      dialog.showModal();
      dialog.id = dataset;
    } else {
      console.log("Dialog is already displaying");
    }

    let nameField = document.getElementById("placerholderRed");
    if (activeLight !== redLight) {
      activeLight.style.opacity = 0.3;
      activeLight = redLight;
      redLight.style.opacity = 1;
    }

    nameField.innerHTML = '"' + dataset + '"';
  } else if (max > thresholdA) {
    console.log("Yellow line excedded: ", dataset);
    if (dataset === "Schmiermittelverbrauch – Temperatur" && !weakOil) {
      warnings = warnings + 1;
      badgeIcon.innerText = warnings;
      weakOil = true;
    }
    let dialog = document.getElementById("yellowLine");
    if (dialog !== null && dialog.open.id != dataset) {
      dialog.showModal();
      dialog.id = dataset;
    } else {
      console.log("Dialog is already displaying");
    }

    let nameField = document.getElementById("placerholderYellow");
    nameField.innerHTML = '"' + dataset + '"';
    if (activeLight !== yellowLight && redLight.opacity !== 1) {
      //yellowLight.style.opacity = 0.3;
      activeLight.style.opacity = 0.3;
      activeLight = yellowLight;
      yellowLight.style.opacity = 1;
    }
  }
}

async function getData(version) {
  let response = [];

  let randmonDataSet = Math.floor(Math.random() * 4);
  switch (randmonDataSet) {
    case 0:
      if (FETCHED_DATA[0].length === 0) {
        console.log(FETCHED_DATA[0]);
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall1")
        ).json();
        FETCHED_DATA[0] = response;
      } else {
        response = FETCHED_DATA[0];
        console.log("Buffer 0: ", FETCHED_DATA);
      }
      break;

    case 1:
      if (FETCHED_DATA[1].length === 0) {
        console.log(FETCHED_DATA[1]);
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall2")
        ).json();
        FETCHED_DATA[1] = response;
      } else {
        response = FETCHED_DATA[1];
        console.log("Buffer 1: ", FETCHED_DATA);
      }
      break;

    case 2:
      if (FETCHED_DATA[2].length === 0) {
        console.log(FETCHED_DATA[2]);
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall3")
        ).json();
        FETCHED_DATA[2] = response;
      } else {
        response = FETCHED_DATA[2];
        console.log("Buffer 2: ", FETCHED_DATA);
      }
      break;

    case 3:
      if (FETCHED_DATA[3].length === 0) {
        console.log(FETCHED_DATA[3]);
        response = await (
          await fetch("https://it2wi1.if-lab.de/rest/mpr_fall4")
        ).json();
        FETCHED_DATA[3] = response;
      } else {
        response = FETCHED_DATA[3];
        console.log("Buffer 3: ", FETCHED_DATA);
      }
      break;

    default:
      console.log("Fatal error getting data");
  }

  console.log("FETCH: ", FETCHED_DATA[0].length);

  return getDataPoints(response, version);
}

async function getDataPoints(dataSet, version) {
  XData = [];
  YData = [];

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
      }
      break;

    case "laut":
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_laut);
        XData.push(dataSet[i].datum);
      }
      break;
    default:
      console.log("Unknown Parsing type");
  }
  return [XData, YData];
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
      max: 300,
    },
  ];

  let rawData = await getData("temperatur");

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];

  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ""));
  let timeArray2 = getMinutesEveryFive(timeArray);
  let currentDataX = timeArray2.slice(0, 10);
  Ydata = Ydata.map(function (value) {
    return value.replace(",", ".");
  });
  let currentDataY = Ydata.slice(0, 10);
  console.log("X: ", timeArray2);

  if (updateInterval !== 0) {
    RenderChart(renderData1, [], []);
    //checkForProblems(renderData1[0].title, currentDataY, renderData1[0].toleranzWert, renderData1[0].schadenWert);
    let i = 1;
    let timeStart = 0;
    while (1) {
      if (updateInterval === 0) {
        break;
      }
      let timeEnd = timeStart + updateInterval;
      if (timeEnd >= Ydata.length) {
        break;
      }
      await sleep(updateInterval * 1000);
      currentDataX = timeArray2.slice(0, timeEnd);
      currentDataY = Ydata.slice(0, timeEnd);
      RenderChart(renderData1, currentDataY, currentDataX);
      console.log(currentDataX, "\n", currentDataY);
      checkForProblems(
        renderData1[0].title,
        currentDataY,
        renderData1[0].toleranzWert,
        renderData1[0].schadenWert
      );
      if (i === 1) {
        //Grundeisntellung Licht von weiß auf Grün (einmalig)
        console.log("Go green");
        whiteLight.style.opacity = 0.3;
        activeLight = greenLight;
        greenLight.style.opacity = 1;
      }
      timeStart = timeEnd;
      i++;
    }
  }
  RenderChart(renderData1, Ydata, timeArray2);
  checkForProblems(
    renderData1[0].title,
    Ydata,
    renderData1[0].toleranzWert,
    renderData1[0].schadenWert
  );
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
      max: 300,
    },
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
    let i = 1;
    let timeStart = 0;
    while (1) {
      if (updateInterval === 0) {
        break;
      }
      let timeEnd = timeStart + updateInterval;
      if (timeEnd >= Ydata.length) {
        break;
      }
      await sleep(updateInterval * 1000);
      currentDataX = timeArray2.slice(0, timeEnd);
      currentDataY = Ydata.slice(0, timeEnd);
      RenderChart(renderData2, currentDataY, currentDataX);
      checkForProblems(
        renderData2[0].title,
        currentDataY,
        renderData2[0].toleranzWert,
        renderData2[0].schadenWert
      );
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
      max: 1.0,
    },
  ];

  let rawData = await getData("vibration");

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
    RenderChart(renderData3, [], []);
    let i = 1;
    let timeStart = 0; //Weil in erster Interation updateInterval * 2 nötig
    while (1) {
      if (updateInterval === 0) {
        break;
      }
      let timeEnd = timeStart + updateInterval;
      if (timeEnd >= Ydata.length) {
        break;
      }
      await sleep(updateInterval * 1000);
      currentDataX = timeArray2.slice(0, timeEnd);
      currentDataY = Ydata.slice(0, timeEnd);
      RenderChart(renderData3, currentDataY, currentDataX);
      checkForProblems(
        renderData3[0].title,
        currentDataY,
        renderData3[0].toleranzWert,
        renderData3[0].schadenWert
      );
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
  if (renderData[0].chartID === 1) {
    if (chart1 !== undefined) {
      chart1.updateSeries([
        {
          data: YData,
        },
      ]);
      chart1.updateOptions({
        xaxis: {
          title: {
            text: "Zeit in Sekunden",
          },
          labels: {},
          categories: timeArray2,
        },
      });
      return;
    }
  } else if (renderData[0].chartID === 2) {
    if (chart2 !== undefined) {
      chart2.updateSeries([
        {
          data: YData,
        },
      ]);
      chart2.updateOptions({
        xaxis: {
          title: {
            text: "Zeit in Sekunden",
          },
          labels: {},
          categories: timeArray2,
        },
      });
      return;
    }
  } else {
    if (chart3 !== undefined) {
      chart3.updateSeries([
        {
          data: YData,
        },
      ]);
      chart3.updateOptions({
        xaxis: {
          title: {
            text: "Zeit in Sekunden",
          },
          labels: {},
          categories: timeArray2,
        },
      });
      return;
    }
  }

  console.log("Render: ", renderData[0].title);
  const options = {
    toolbar: {
      tools: {
        pan: true,
      },
    },
    chart: {
      fontFamily: "Roboto, sans-serif",
      type: "line",
      width: 600,
      height: 600,
      background: "#859cac",
    },
    title: {
      text: renderData[0].title,
      align: "center",
      margin: 10,
      floating: false,
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    zoom: {
      enabled: true,
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
        },
      },
      style: {
        backgroundColor: "FF0099",
      },
    },
    series: [
      {
        name: "",
        data: YData,
      },
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
            offsetX: 95,
          },
        },
        {
          y: renderData[0].schadenWert,
          y2: renderData[0].toleranzWert,
          borderColor: "yellow",
          fillColor: "yellow",
          label: {
            text: renderData[0].schadenText,
            position: "left",
            offsetX: renderData[0].offsetX_S,
          },
        },
        {
          y: renderData[0].toleranzWert,
          borderColor: "yellow",
          fillColor: "yellow",
          label: {
            text: renderData[0].toleranzText,
            position: "left",
            offsetX: renderData[0].offsetX_T,
          },
        },
      ],
    },
    yaxis: {
      min: renderData[0].min,
      max: renderData[0].max,
      title: {
        text: renderData[0].yText,
        style: {
          fontSize: "15px",
        },
      },
    },
    xaxis: {
      title: {
        text: "Zeit in Sekunden",
      },
      labels: {},
      categories: timeArray2,
    },
    noData: {
      text: "Please wait while we fetch data...",
      style: {
        fontSize: "30px",
        fontWeight: "bold",
      },
    },
  };

  if (renderData[0].chartID === 1) {
    chart1 = new ApexCharts(document.querySelector("#chart1"), options);
    console.log("Render 1");
    chart1.render();
  } else if (renderData[0].chartID === 2) {
    chart2 = new ApexCharts(document.querySelector("#chart2"), options);
    console.log("Render 2");
    chart2.render();
  } else {
    chart3 = new ApexCharts(document.querySelector("#chart3"), options);
    console.log("Render 3");
    chart3.render();
  }
}

function getSecondsEveryFive(array) {
  const result = [];
  array.forEach((time) => {
    const seconds = parseInt(time.split(":")[2], 10);

    if (seconds % 5 === 0) {
      console.log(result);
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
    console.log("Warning pressed");
    let text =
      "There are no signs of failures within the machine. <br> Keep monitoring the setup closely.";
    inner =
      inner +
      cardHeader +
      cardBody +
      '<h5 class="card-title" style="color: red;">' +
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
        '<h5 class="card-title" style="color: yellow;">' +
        "Check oil" +
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
        '<h5 class="card-title" style="color: yellow;">' +
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
    '<button class="btn btn-warning" style="float: right;" value="cancel" formmethod="dialog">OK</button>' +
    "</form>";
  targetModal.showModal();
  targetModal.innerHTML = inner;
}

visualizeData1();
visualizeData2();
visualizeData3();
