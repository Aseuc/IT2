var bar = {
  series: [
    {
      name: "Anzahl",
      data: [10, 8, 6, 4, 2]
    }
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false
    }
  },
  colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%"
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: [
      "CO2",
      "Radon Gas",
      "Feinstaub",
      "Methan",
      "Birkenpollen"
    ],
    title: {
      text: "",
      position: "bottom"
    }
  },
  yaxis: {
    title: {
      text: "Konzentration im Raum in Prozent"
    }
  }
};

var barChart = new ApexCharts(document.querySelector("#barChart"), bar);
barChart.render();

var area = {
  series: [
    {
      name: "CO2",
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: "Feinstaub",
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false
    }
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth"
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: "CO2 Konzentration",
        style: {
          fontSize: "10px",
          floating: true
        }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false
  }
};

var areaChart = new ApexCharts(document.querySelector("#areaChart"), area);
areaChart.render();

var options = {
  series: [20, 78, 0, 0, 1],
  chart: {
    width: 380,
    type: "pie"
  },
  labels: ["CO2", "N2", "O2", "O2", "Aerosole"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

var chart = new ApexCharts(document.querySelector("#pieChart"), options);
chart.render();

var options = {
  chart: {
    height: 280,
    type: "radialBar"
  },

  series: [67],
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#293450"
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px"
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true
        }
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: "round"
  },
  labels: ["Progress"]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


/* let timeLeft = 10;
const timerButton = document.querySelector('#timer-btn');

  const timer = setInterval(() => {
    timeLeft--;
    timerButton.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
    }
  }, 1000); */
