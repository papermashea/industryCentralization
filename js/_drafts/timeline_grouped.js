$(document).ready(function() {

  var TITLE = 'Industry centralization 1955-2020';
  var STACKED = true;
  var LABELS = 'year';

  // var SERIES = [  
  //      {
  //     column: 'sector',
  //     name: 'Communication Services',
  //     color: 'lightsteelblue'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Consumer Discretionary',
  //     color: 'cadetblue'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Consumer Staples',
  //     color: 'orchid'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Energy',
  //     color: 'thistle'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Financials',
  //     color: 'darkseagreen'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Health Care',
  //     color: 'lightcoral'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Information Technology',
  //     color: 'cornflowerblue'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Industrials',
  //     color: 'gold'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Materials',
  //     color: 'darkorange'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Real Estate',
  //     color: 'sandybrown'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Utilities',
  //     color: 'firebrick'
  //   },
  //   {
  //     column: 'sector',
  //     name: 'Not found',
  //     color: 'grey'
  //   },
  // ];

  var YEARS = ['1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1971', '1968', '1967', '1966', '1969', '1970', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1984', '1985', '1986', '1983', '1988', '1987', '1981', '1982', '1989', '1992', '1991', '1990', '1993', '1994', '1995', '1999', '1997', '1996', '1998', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2010', '2011', '2009', '2012', '2013', '2014', '2016', '2015', '2017', '2018', '2019', '2020']

  var SHOW_GRID = false; 
  var SHOW_LEGEND = true; 

  // Read data file and create a chart

var tData = $.getJSON("./data/1955-2020_industry.json") 
        console.log(tData)

  // $.get('./data/_wip/timeline/1955-2020_sector-industry_small.csv', function(csv) {
  //     var tData = Papa.parse(csv).data;
      // console.log(tData)

      // timelineChart(tData)
    });

  // function timelineChart(pd){
 //    // console.log(pd.length)

 //    var year = [];
 //    var rank = [];
 //    var company = [];
 //    var revenue = [];
 //    var sector = [];

 //    for (var i = 1; i < pd.length; i++) {
 //      year.push(pd[i][0]);
 //      rank.push(pd[i][1]);
 //      company.push(pd[i][2]);
 //      revenue.push(pd[i][4]);
 //      sector.push(pd[i][5]);
 //    }
 //    // console.log(year);
 //    // console.log(rank);

 //  var datasets = tData.pd(function(e) {
 //        return {
 //          label: e.name,
 //          labelDirty: e.column,
 //          backgroundColor: e.color,
 //          data: []
 //        }
      // };


 //  // var legend = SERIES.pd(function(e) {
 //  //       return {
 //  //         backgroundColor: e.color,
 //  //         data: []
 //  //       }
 //  //     });


 //    rows.map(function(row) {
 //      datasets.map(function(d) {
 //        d.data.push(row[d.labelDirty])
 //      })
 //    });

 //    var barChartData = {
 //      labels: rows.map(function(e) { return e[LABELS] }),
 //      datasets: datasets
 //    };

 //    var ctx = document.getElementById('canvas').getContext('2d');

 //    new Chart(ctx, {
 //      type: 'bar',
 //      data: barChartData,
      
 //      options: {
 //        title: {
 //          display: true,
 //          text: TITLE,
 //          fontSize: 14,
 //        },
 //        legend: {
 //          display: SHOW_LEGEND,
 //        },
 //        scales: {
 //          xAxes: [{
 //            stacked: STACKED,
 //            scaleLabel: {
 //              display: X_AXIS !== '',
 //              labelString: X_AXIS
 //            },
 //            gridLines: {
 //              display: SHOW_GRID,
 //            },
 //            ticks: {
 //              beginAtZero: true,
 //              callback: function(value, index, values) {
 //                return value.toLocaleString();
 //              }
 //            }
 //          }],
 //          yAxes: [{
 //            stacked: STACKED,
 //            beginAtZero: true,
 //            scaleLabel: {
 //              display: Y_AXIS !== '',
 //              labelString: Y_AXIS
 //            },
 //            gridLines: {
 //              display: SHOW_GRID,
 //            },
 //            ticks: {
 //              beginAtZero: true,
 //              callback: function(value, index, values) {
 //                return value.toLocaleString()
 //              }
 //            }
 //          }]
 //        },
 //        tooltips: {
 //          displayColors: false,
 //          callbacks: {
 //            label: function(tooltipItem, all) {
 //              return all.datasets[tooltipItem.datasetIndex].label
 //                + ': ' + tooltipItem.yLabel.toLocaleString();
 //            }
 //          }
 //        }
 //      }
 //    });
 //  };
 // });
