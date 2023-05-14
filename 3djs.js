
async function visualizeData1(){
  const response1= await fetch('https://it2wi1.if-lab.de/rest/mpr_fall1');
  const response2 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall2');
  const response3 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall3');
  const response4 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall4');

  const data = await response1.json();
  const data2 = await response2.json();
  const data3 = await response3.json();
  const data4 = await response4.json();
  let Ydata = [];
  let Ydata2 = [];
  let Xdata = [];
  for (let i = 0; i < data.length; i++) {
     Ydata.push(data[i].werte.Tavg_temp);
     Xdata.push(data[i].datum);
  }
  for (let i = 0; i < data2.length; i++) {
    Ydata.push(data2[i].werte.Tavg_temp);
    Xdata.push(data2[i].datum);
 }
 for (let i = 0; i < data3.length; i++) {
  Ydata.push(data3[i].werte.Tavg_temp);
  Xdata.push(data3[i].datum);
}
for (let i = 0; i < data4.length; i++) {
  Ydata.push(data4[i].werte.Tavg_temp);
  Xdata.push(data4[i].datum);
}

  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));

  
  let timeArray2 = getMinutesEveryFive(timeArray);

  
  const options = {
    toolbar: {
     borderColor:'black',
        
      },
    
    chart: {
        fontFamily:'Roboto, sans-serif',
        type: 'line',
        width: '600px',
        height: '600px',
        background: '#859cac'
      },
      title: {
        text: 'Schmiermittelverbrauch – Temperatur',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            if (value >= 150) {
              return 'Schadensgrenze überschritten!: ' + value;
            } else if (value >= 75){
              return 'Toleranzgrenze überschritten!: ' + value;
            } else {
              return 'Schmiermittelverbrauch Normal: ' + value;
            }
          }
        },
        
        style: {
          backgroundColor: "FF0099"
        }
      },
      series: [
        {
          name: '',
          data: Ydata
        },
/*         {
          name: "Tavg_laut",
          data: Ydata2
        } */
      ],
      annotations: {
        yaxis: [
          {
            y: 150,
            y2:75,
            borderColor: '#000',
            fillColor: '#FEB019',
            label: {
              text: 'Schadensgrenze_temp: 150',
              position: 'left',
              offsetX:140,
            }
          },
          {
            y: 75,
            borderColor: '#000',
            fillColor: '#FEB019',
            
            label: {
              text: 'Toleranzgrenze_temp: 75',
              position: 'left',
              offsetX: 130,
              
              
            }
          }
        ]
      },
      yaxis: {
        min: 0,
        max: 300,
        title:{
          text: 'Tavg_temp',
          style:{
            fontSize: '15px'
          },
        },
      },
      xaxis: {
        labels: {},
        categories: timeArray2,
      }
    };

  const chart = new ApexCharts(document.querySelector('#chart1'), options);
  chart.render();
  
  
  
  let nameEditor = ""
  }
  async function visualizeData2(){
    const response1= await fetch('https://it2wi1.if-lab.de/rest/mpr_fall1');
    const response2 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall2');
    const response3 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall3');
    const response4 = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall4');
  
    const data = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    const data4 = await response4.json();
    let Ydata = [];
    let Ydata2 = [];
    let Xdata = [];
    for (let i = 0; i < data.length; i++) {
       Ydata.push(data[i].werte.Tavg_laut);
       Xdata.push(data[i].datum);
    }
    for (let i = 0; i < data2.length; i++) {
      Ydata.push(data2[i].werte.Tavg_laut);
      Xdata.push(data2[i].datum);
   }
   for (let i = 0; i < data3.length; i++) {
    Ydata.push(data3[i].werte.Tavg_laut);
    Xdata.push(data3[i].datum);
  }
  for (let i = 0; i < data4.length; i++) {
    Ydata.push(data4[i].werte.Tavg_laut);
    Xdata.push(data4[i].datum);
  }

    let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
    
    
    let timeArray2 = getMinutesEveryFive(timeArray);
  
    
    const options = {
    
      chart: {
        fontFamily:'Roboto, sans-serif',
        type: 'line',
          width: 600,
          height: 600,
          background: '#859cac'
        },
        title: {
          text: 'Kugellagerlauf – Vibration und Akustik',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#263238'
          }
        },
        tooltip: {
          theme: "dark",
          y: {
            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
              if (value >= 117) {
                
                return 'Schadensgrenze überschritten!: ' + value;
              } else if (value >= 80) {
                
                return 'Toleranzgrenze überschritten!: ' + value;
              } else {
                return "Kugellagerakustik Normal: " + value;
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
            data: Ydata
          },
        ],
        annotations: {
          yaxis: [
            {
              y: 117,
              y2:80,
              borderColor: '#000',
              fillColor: '#FEB019',
              label: {
                text: 'Schadengrenze_laut: 117',
                position: 'left',
                offsetX:129,
              }
            },
            {
              y: 80,
              borderColor: '#000',
              fillColor: '#FEB019',
              
              label: {
                text: 'Toleranzgrenze_laut: 80',
                position: 'left',
                offsetX: 121,
                
                
              }
            }
          ]
        },
        yaxis: {
          min: 0,
          max: 150,
          title: {
            text: "Tavg_laut",
            style:{
              fontSize: "15px",
            }
          },
        },
        xaxis: {
          labels: {},
          categories: timeArray2,
        }
      };
  
    const chart = new ApexCharts(document.querySelector('#chart2'), options);
    chart.render();
    
    
    
    
    }

async function visualizeData3(){
  const response = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall3');
  const data = await response.json();
  console.log(data)
  
  let Ydata = [];
  let Xdata = [];
  for (let i = 0; i < data.length; i++) {
     Ydata.push(data[i].werte.Tavg_temp);
     Xdata.push(data[i].datum);
  }
  
  
  let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
      timeArray = getMinutesEveryFive(timeArray);
  
  const options = {
      chart: {
        type: 'line',
        width: 500,
        height: 500,
        background: '#859cac'
      },  
  
      title: {
        text: 'Mindere Qualität',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            if (value >= 75) {
              return 'Toleranzgrenze überschritten!: ' + value;
            } else if (value >= 150){
              return 'Schadensgrenze überschritten!: ' + value;
            }
          }
        },
        style: {
          backgroundColor: "FF0099"
        }
      },
      series: [
        {
          name: '',
          data: Ydata,
        }
      ],
      xaxis: {      
          labels: {
              rotate: -40,
              offsetY: 10 // Fügt einen Abstand von 10 Pixeln zwischen der x-Achse und dem Label hinzu
              
          },
      
        categories: timeArray,
      },
      annotations: {
          xaxis: []
        }
    };
  const chart = new ApexCharts(document.querySelector('#chart'), options);
  chart.render();
  }
async function visualizeData4(){
      const response = await fetch('https://it2wi1.if-lab.de/rest/mpr_fall4');
      const data = await response.json();
      
      
      let Ydata = [];
      let Xdata = [];
      for (let i = 0; i < data.length; i++) {
         Ydata.push(data[i]);
         Xdata.push(data[i].datum);
      }

      
      let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
      
      
      let timeArray2 = getMinutesEveryFive(timeArray);
  
      
      const options = {
          chart: {
            type: 'line',
            width: 500,
            height: 500,
            background: '#859cac'
          },
          title: {
            text: 'Fall4',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#263238'
            }
          },
          tooltip: {
            theme: "dark",
            style: {
              backgroundColor: "FF0099"
            }
          },
          series: [
            {
              name: 'Fall 4',
              data: Ydata,
            }
          ],
          xaxis: {
            labels: {},
            categories: timeArray2,
          }
        };
      /* 
      for (let i = 0; i < data.length; i++) {
          console.log(data[i])
      }
      
       */
      
      
      
      
      
      const chart = new ApexCharts(document.querySelector('#chart4'), options);
      chart.render();
      
      
      
      
      }
function getSecondsEveryFive(array) {
    const result = [];
    array.forEach(time => {
      const minutes = parseInt(time.split(':')[2], 10);
        
      if (minutes % 5 === 0) {
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
      visualizeData1()
      visualizeData2()
/*       visualizeData3()
      visualizeData4() */