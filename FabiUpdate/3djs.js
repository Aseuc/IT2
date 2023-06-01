
//Globale Werte - Array, welches die bereits requesteten Werte bereithalten kann
const FETCHED_DATA = [[],[],[],[]];

async function getData(version) {

  let response = [];

  let randmonDataSet = Math.floor(Math.random() * 4);
  switch(randmonDataSet) {
    case 0:
      if(FETCHED_DATA[0].length === 0){
        console.log(FETCHED_DATA[0]);
        response = await (await fetch('https://it2wi1.if-lab.de/rest/mpr_fall1')).json();
        FETCHED_DATA[0] = response;
      } else {
        response = FETCHED_DATA[0];
        console.log("Buffer 0: ", FETCHED_DATA);
      }   
      break;

    case 1:
      if(FETCHED_DATA[1].length === 0){
        console.log(FETCHED_DATA[1]);
        response = await (await fetch('https://it2wi1.if-lab.de/rest/mpr_fall2')).json()
        FETCHED_DATA[1] = response;
      } else {
        response = FETCHED_DATA[1];
        console.log("Buffer 1: ", FETCHED_DATA);
      }    
      break;

    case 2:
      if(FETCHED_DATA[2].length === 0) {
        console.log(FETCHED_DATA[2]);
        response = await (await fetch('https://it2wi1.if-lab.de/rest/mpr_fall3')).json()
        FETCHED_DATA[2] = response;
      } else {
        response = FETCHED_DATA[2];
        console.log("Buffer 2: ", FETCHED_DATA);
      }
      break;

    case 3:
      if(FETCHED_DATA[3].length === 0) {
        console.log(FETCHED_DATA[3]);
        response = await (await fetch('https://it2wi1.if-lab.de/rest/mpr_fall4')).json()
        FETCHED_DATA[3] = response;
      } else {
        response = FETCHED_DATA[3];
        console.log("Buffer 3: ", FETCHED_DATA);
      }
      break;

    default:
      console.log("Fatal error getting data")
  }

  console.log("FETCH: ", FETCHED_DATA[0].length);

  return getDataPoints(response, version);
}

async function getDataPoints(dataSet, version) {
  XData = [];
  YData = [];

  switch(version) {
    case 'temperatur':
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_temp);
        XData.push(dataSet[i].datum);
      }
      break;

    case 'vibration':
      for (let i = 0; i < dataSet.length; i++) {
        YData.push(dataSet[i].werte.Tavg_vibr);
        XData.push(dataSet[i].datum);
      }
      break;
    
    case 'laut':
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

async function visualizeData1(){
  renderData1 = [
    {
      title: 'Schmiermittelverbrauch – Temperatur',
      schaden: 'Schadensgrenze überschritten!: ',
      schadenText: 'Schadensgrenze_temp: 150',
      schadenWert: 150,
      toleranz: 'Toleranzgrenze überschritten!: ',
      toleranzText: 'Toleranzgrenze_temp: 75',
      toleranzWert: 75,
      innenleben: 'Schmiermittelverbrauch Normal: ',
      chartID: 1,
      yText: "Tavg_laut",
      offsetX_S: 140,
      offsetX_T: 127,
      min: 0,
      max: 300
    }
  ]

  let rawData = await getData('temperatur');

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];


  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
  let timeArray2 = getMinutesEveryFive(timeArray);

  Ydata = Ydata.map(function(value){ return value.replace(",",".")})

  RenderChart(renderData1, Ydata, timeArray2);
}

async function visualizeData2(){
  renderData2 = [
    {
      title: 'Kugellagerlauf – Vibration und Akustik',
      schaden: 'Schadensgrenze_laut überschritten!: ',
      schadenText: 'Schadensgrenze_laut: 117',
      schadenWert: 117,
      toleranz: 'Toleranzgrenze_laut überschritten!: ',
      toleranzText: 'Toleranzgrenze_laut: 80',
      toleranzWert: 80,
      innenleben: "Kugellagerakustik Normal: ",
      chartID: 2,
      yText: "Tavg_laut",
      offsetX_S: 134,
      offsetX_T: 121,
      min: 0,
      max: 300
    }
  ]

  let rawData = await getData('laut');

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];


  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
  let timeArray2 = getMinutesEveryFive(timeArray);

  Ydata = Ydata.map(function(value){ return value.replace(",",".")})

  RenderChart(renderData2, Ydata, timeArray2);
}

async function visualizeData3(){
  renderData3 = [
    {
      title: 'Anlageninnenleben – Vibration und Akustik ',
      schaden: 'Schadengrenze_vibr überschritten!: ',
      schadenText: 'Schadensgrenze_vibr: 0.40000',
      schadenWert: 0.40000,
      toleranz: 'Toleranzgrenze_vibr überschritten!: ',
      toleranzText: 'Toleranzgrenze_laut: 0.15000',
      toleranzWert: 0.15000,
      innenleben: "Anlageninnenleben Normal: ",
      chartID: 3,
      yText: "Tavg_vibr",
      offsetX_S: 155,
      offsetX_T: 150,
      min: 0.0000,
      max: 1.0000
    }
  ]

  let rawData = await getData('vibration');

  let Xdata = await rawData[0];
  let Ydata = await rawData[1];


  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
  let timeArray2 = getMinutesEveryFive(timeArray);

  Ydata = Ydata.map(function(value){ return value.replace(",",".")})

  RenderChart(renderData3, Ydata, timeArray2);
}


function RenderChart(renderData, YData, timeArray2) {
  console.log("Render: ", renderData[0].title);
  const options = {
     toolbar: {
       tools: {
        pan: true
      }
        },
     chart: {
       fontFamily:'Roboto, sans-serif',
       type: 'line',
         width: 600,
         height: 600,
         background: '#859cac'
       },
       title: {
         text: renderData[0].title,
         align: 'center',
         margin: 10,   
         floating: false,
         style: {
           fontSize: '15px',
           fontWeight: 'bold',
           color: '#263238'
         }
       },
       zoom: {
        enabled: true,
       },
       tooltip: {
         theme: "dark",
         y: {
           formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            switch(renderData[0].chartID) {
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
         },
       ],
       annotations: {
         yaxis: [
            {
              y: renderData[0].max,
              y2: renderData[0].schadenWert,
              borderColor: 'red',
              fillColor: 'red',        
              label: {
                text: "Sehr sehr schlecht",
                position: 'left',
                offsetX: 95,           
              }
            },
           {
             y: renderData[0].schadenWert,
             y2: renderData[0].toleranzWert,
             borderColor: 'yellow',
             fillColor: 'yellow',
             label: {
               text: renderData[0].schadenText,
               position: 'left',
               offsetX: renderData[0].offsetX_S,
             }
           },
           {
             y: renderData[0].toleranzWert,
             borderColor: 'yellow',
             fillColor: 'yellow',        
             label: {
               text: renderData[0].toleranzText,
               position: 'left',
               offsetX: renderData[0].offsetX_T,           
             }
           }
         ]
       },
       yaxis: {
         min: renderData[0].min,
         max: renderData[0].max,
         title: {
           text: renderData[0].yText,
           style:{
             fontSize: "15px",
           },
         },
       },
       xaxis: {
         title:{
           text:"Zeit in Sekunden"
         },
         labels: {},
         categories: timeArray2,
       }
     };

     if(renderData[0].chartID === 1){
      const chart1 = new ApexCharts(document.querySelector('#chart1'), options);
      console.log("Render 1");
      chart1.render();
     } else if (renderData[0].chartID === 2) {
      const chart2 = new ApexCharts(document.querySelector('#chart2'), options);
      console.log("Render 2");
      chart2.render();
     } else {
      const chart3 = new ApexCharts(document.querySelector('#chart3'), options);
      console.log("Render 3");
      chart3.render();
     }
}

function getSecondsEveryFive(array) {
const result = [];
array.forEach(time => {
  const seconds = parseInt(time.split(':')[2], 10);
    
  if (seconds % 5 === 0) {
    console.log(result)
    result.push(time);
  }
});
return result;
}


function getMinutesEveryFive(array) {
const result = [];
array.forEach(time => {
  const minutes = parseInt(time.split(':')[1], 10);
    
  if (minutes % 1 === 0) {
    result.push(time);
  }
});
return result;
}


visualizeData1();
visualizeData2();
visualizeData3();

/*
const chart_1 = document.querySelector('#chart1');
chart_1.addEventListener('wheel', scrollZoom(chart1));
const chart_2 = document.querySelector('#chart2');
chart_2.addEventListener('wheel', scrollZoom(chart2));
const chart_3 = document.querySelector('#chart3');
chart_3.addEventListener('wheel', scrollZoom(chart3));
//console.log(chart1);
*/
