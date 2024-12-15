const searchFun = () => {
  let filter = document.getElementById("myInput").value.toUpperCase();
  let myTable = document.getElementById("myTable"); // Correct method
  let tr = myTable.getElementsByTagName("tr"); // Correct method

  for (let i = 1; i < tr.length; i++) {
    // Start from 1 to skip the header row
    let td = tr[i].getElementsByTagName("td"); // Get all cells in the row
    let found = false; // Flag to track if any cell contains the filter text

    // Check each cell in the row
    for (let j = 0; j < td.length; j++) {
      let textValue = td[j].textContent || td[j].innerText; // Use innerText for compatibility
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        // Correct method name
        found = true; // Set flag to true if a match is found
        break; // Exit the loop if a match is found
      }
    }

    // Show or hide the row based on the flag
    tr[i].style.display = found ? "" : "none"; // Use the flag to set display
  }
};

const searchFun2 = () => {
  let filter = document.getElementById("myInput2").value.toUpperCase();
  let myList = document.getElementById("myList");
  let li = myList.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    let ld = li[i].getElementsByClassName("list-text");
    console.log("ld", ld);
    let found = false;
    for (let j = 0; j < ld.length; j++) {
      let textValue = ld[j].textContent || ld[j].innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }
    li[i].style.display = found ? "" : "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const sidebar = body.querySelector(".sidebar");
  const toggle = body.querySelector(".toggle");
  const content = body.querySelector(".content");
  const leftSide = body.querySelector(".left-side");

  if (sidebar && toggle && content) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");

      if (sidebar.classList.contains("close")) {
        leftSide.classList.remove("col-xl-2");
        leftSide.classList.add("col-xl-1");
        content.classList.remove("col-xl-10");
        content.classList.add("col-xl-11");

        leftSide.classList.remove("col-lg-2");
        leftSide.classList.add("col-lg-1");
        content.classList.remove("col-lg-10");
        content.classList.add("col-lg-11");

        leftSide.classList.remove("col-md-4");
        leftSide.classList.add("d-md-none");
        content.classList.remove("col-md-8");
        content.classList.add("col-md-12");

        leftSide.classList.remove("col-sm-3");
        leftSide.classList.add("d-sm-none");
        content.classList.remove("col-sm-9");
        content.classList.add("col-sm-12");

        leftSide.classList.remove("col-3");
        leftSide.classList.add("d-none");
        content.classList.remove("col-9");
        content.classList.add("col-12");
      } else {
        leftSide.classList.remove("col-xl-1");
        leftSide.classList.add("col-xl-2");
        content.classList.remove("col-xl-11");
        content.classList.add("col-xl-10");

        leftSide.classList.remove("col-lg-1");
        leftSide.classList.add("col-lg-2");
        content.classList.remove("col-lg-11");
        content.classList.add("col--10");

        leftSide.classList.remove("d-md-none");
        leftSide.classList.add("col-md-4");
        content.classList.remove("col-md-12");
        content.classList.add("col-md-8");

        leftSide.classList.remove("d-sm-none");
        leftSide.classList.add("col-sm-3");
        content.classList.remove("col-sm-12");
        content.classList.add("col-sm-9");

        leftSide.classList.remove("d-none");
        leftSide.classList.add("col-3");
        content.classList.remove("col-12");
        content.classList.add("col-9");
      }
    });
  }
});

//bar chart
Highcharts.chart("container1", {
  chart: {
    type: "column",
  },
  title: {
    align: "left",
    text: "Top Companies (Users)",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Active Users",
    },
  },
  legend: {
    enabled: false, // Ensure the legend is disabled
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}%",
      },
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: ' +
      "<b>{point.y:.2f}%</b> of total<br/>",
  },
  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        { name: "Company 1", y: 63.06 },
        { name: "Company 2", y: 51.84 },
        { name: "Company 3", y: 41.18 },
        { name: "Company 4", y: 38.12 },
        { name: "Company 5", y: 28.33 },
        { name: "Company 6", y: 18.45 },
        { name: "Company 7", y: 8.582 },
      ],
    },
  ],
});

// doghnut chart start
Highcharts.chart("container2", {
  chart: {
    type: "pie",
    custom: {},
    events: {
      render() {
        const chart = this,
          series = chart.series[0];
        let customLabel = chart.options.chart.custom.label;

        if (!customLabel) {
          customLabel = chart.options.chart.custom.label = chart.renderer
            .label("Total<br/>" + "<strong>2 877 820</strong>")
            .css({
              color: "#000",
              textAnchor: "middle",
            })
            .add();
        }

        const x = series.center[0] + chart.plotLeft,
          y = series.center[1] + chart.plotTop - customLabel.attr("height") / 2;

        customLabel.attr({
          x,
          y,
        });
        // Set font size based on chart diameter
        customLabel.css({
          fontSize: `${series.center[2] / 12}px`,
        });
      },
    },
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  title: {
    text: "Top Companies (Revenue)",
  },
  subtitle: {
    text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>',
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.0f}%</b>",
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      borderRadius: 8,
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          format: "{point.name}",
        },
        {
          enabled: true,
          distance: -15,
          format: "{point.percentage:.0f}%",
          style: {
            fontSize: "0.9em",
          },
        },
      ],
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Registrations",
      colorByPoint: true,
      innerSize: "75%",
      data: [
        {
          name: "EV",
          y: 23.9,
        },
        {
          name: "Hybrids",
          y: 12.6,
        },
        {
          name: "Diesel",
          y: 37.0,
        },
        {
          name: "Petrol",
          y: 26.4,
        },
      ],
    },
  ],
});

// score chart start

// Data retrieved from: https://ferjedatabanken.no/statistikk
Highcharts.chart("container3", {
  chart: {
    type: "bar",
  },

  xAxis: {
    categories: [],
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
    },
  },
  legend: {
    reversed: true,
  },
  plotOptions: {
    series: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {},
    {},
    {
      data: [12213, 12721, 15242, 16518, 25037],
    },
  ],
});
