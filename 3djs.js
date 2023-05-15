
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

/*   timeArray = timeArray.map(function (value) {return value.slice(5);}); */

  
  let timeArray2 = getMinutesEveryFive(timeArray);

  Ydata = Ydata.map(function(value){ return value.replace(",",".")})
  const options = {
   /*  dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 2,
        padding: 4,
        opacity: 0.9
      }
    }, */
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
            borderColor: 'red',
            fillColor: 'red',
            label: {
              text: 'Schadensgrenze_temp: 150',
              position: 'left',
              offsetX:140,
            }
          },
          {
            y: 75,
            borderColor: 'red',
            fillColor: 'red',
 
            label: {
              text: 'Toleranzgrenze_temp: 75',
              position: 'left',
              offsetX: 127,
            
              
            },
     
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
        title:{

            text:"Zeit in Sekunden"
          
        },
        style:{
          margin:10,
        },
        
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
    Ydata = Ydata.map(function(value){ return value.replace(",",".")})
    
    const options = {
    /*   dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          foreColor: '#fff',
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 2,
          padding: 4,
          opacity: 0.9
        }
      }, */
      toolbar: {
        borderColor:'black',
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
                
                return 'Schadensgrenze_laut überschritten!: ' + value;
              } else if (value >= 80) {
                
                return 'Toleranzgrenze_laut überschritten!: ' + value;
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
              borderColor: 'red',
              fillColor: 'red',
              label: {
                text: 'Schadensgrenze_laut: 117',
                position: 'left',
                offsetX:134,
              }
            },
            {
              y: 80,
              borderColor: 'red',
              fillColor: 'red',
              backgroundColor:"green",
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
          title:{
            text:"Zeit in Sekunden"
          },
          categories: timeArray,
        }
      };
  
    const chart = new ApexCharts(document.querySelector('#chart2'), options);
    chart.render();
    
    
    
    
    }

    async function visualizeData3(){
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
         Ydata.push(data[i].werte.Tavg_vibr);
         Xdata.push(data[i].datum);
      }
      for (let i = 0; i < data2.length; i++) {
        Ydata.push(data2[i].werte.Tavg_vibr);
        Xdata.push(data2[i].datum);
     }
     for (let i = 0; i < data3.length; i++) {
      Ydata.push(data3[i].werte.Tavg_vibr);
      Xdata.push(data3[i].datum);
    }
    for (let i = 0; i < data4.length; i++) {
      Ydata.push(data4[i].werte.Tavg_vibr);
      Xdata.push(data4[i].datum);
    }

      let timeArray = Xdata.map((str) => str.replace(/\d{2}\.\d{2}\.\d{4}/, ''));
      
      
      let timeArray2 = getMinutesEveryFive(timeArray);
  
      Ydata = Ydata.map(function(value){ return value.replace(",",".")})

      const options = {
       /*  dataLabels: {
          enabled: true,
          background: {
            enabled: true,
            foreColor: '#fff',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 3,
            padding: 4,
            opacity: 0.9
          }
        }, */
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
            text: 'Anlageninnenleben – Vibration und Akustik ',
            align: 'center',
            margin: 10,
        
            floating: false,
            style: {
              fontSize: '15px',
         
              color: '#263238'
            }
          },
          tooltip: {
            theme: "dark",
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                if (value.toFixed(4) >= 0.4000) {
               
                  return 'Schadengrenze_vibr überschritten!: ' + value.toFixed(4);
                } else if (value.toFixed(4) >= 0.1500) {
     
                  return 'Toleranzgrenze_vibr überschritten!: ' + value.toFixed(4);
                } else {
                  return "Anlageninnenleben Normal: " + value.toFixed(4);
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
                y: 0.4000,
                y2:0.1500,
                borderColor: 'red',
                fillColor: 'red',
                label: {
                  text: 'Schadensgrenze_vibr: 0.40000',
                  position: 'left',
                  offsetX:155,
                }
              },
              {
                y: 0.15000,
                borderColor: 'red',
                fillColor: 'red',
                
                label: {
                  text: 'Toleranzgrenze_laut: 0.15000',
                  position: 'left',
                  offsetX: 150,
                  
                  
                }
              }
            ]
          },
          yaxis: {
            min: 0.0000,
            max: 1.0000,
            title: {
              text: "Tavg_vibr",
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
    
      const chart = new ApexCharts(document.querySelector('#chart3'), options);
      chart.render();
      
      
      
      
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
      visualizeData1()
      visualizeData2()
      visualizeData3()
