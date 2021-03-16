$(document).ready(function() {

  var TITLE = 'Industry centralization 1955-2020';
  var HORIZONTAL = false;
  var STACKED = true;
  var LABELS = 'year';

  var SERIES = [  
       {
      column: 'sector',
      name: 'Communication Services',
      color: 'lightsteelblue'
    },
    {
      column: 'sector',
      name: 'Consumer Discretionary',
      color: 'cadetblue'
    },
    {
      column: 'sector',
      name: 'Consumer Staples',
      color: 'orchid'
    },
    {
      column: 'sector',
      name: 'Energy',
      color: 'thistle'
    },
    {
      column: 'sector',
      name: 'Financials',
      color: 'darkseagreen'
    },
    {
      column: 'sector',
      name: 'Health Care',
      color: 'lightcoral'
    },
    {
      column: 'sector',
      name: 'Information Technology',
      color: 'cornflowerblue'
    },
    {
      column: 'sector',
      name: 'Industrials',
      color: 'gold'
    },
    {
      column: 'sector',
      name: 'Materials',
      color: 'darkorange'
    },
    {
      column: 'sector',
      name: 'Real Estate',
      color: 'sandybrown'
    },
    {
      column: 'sector',
      name: 'Utilities',
      color: 'firebrick'
    },
    {
      column: 'sector',
      name: 'Not found',
      color: 'grey'
    },
  ];

  var YEARS = ['1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1971', '1968', '1967', '1966', '1969', '1970', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1984', '1985', '1986', '1983', '1988', '1987', '1981', '1982', '1989', '1992', '1991', '1990', '1993', '1994', '1995', '1999', '1997', '1996', '1998', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2010', '2011', '2009', '2012', '2013', '2014', '2016', '2015', '2017', '2018', '2019', '2020']

  // `true` to show the grid, `false` to hide
  var SHOW_GRID = false; 

  // `true` to show the legend, `false` to hide
  var SHOW_LEGEND = true; 

  // Read data file and create a chart
  $.get('./data/_wip/timeline/1955-2020_sector-industry_small.csv', function(csvString) {
      var rows = Papa.parse(csvString, {header: true}).data;

      console.log(tData)


    var datasets = tData.map(function(el) {
      for each row
        return {
          year: year,
          revenue: el.revenue_m,
          rank: el.rank,
          backgroundColor: el.sector,
          data: []
        }
    });
    // console.log(datasets)


    // rows.map(function(row) {
    //   datasets.map(function(d) {
    //     d.data.push(row[d.revenue])
    //   })
    // });

    // var barChartData = {
    //   labels: rows.map(function(el) { return el[YEARS] }),
    //   datasets: datasets
    // };

    var ctx = document.getElementById('canvas').getContext('2d');


    new Chart(ctx, {
      type: HORIZONTAL ? 'horizontalBar' : 'bar',
      data: tData,
      
      options: {
        title: {
          display: false,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: SHOW_LEGEND,
        },
        scales: {
          xAxes: [{
            stacked: true,
            scaleLabel: {
              display: tData.year,
              labelString: 'Year'
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toLocaleString();
              }
            }
          }],
          yAxes: [{
            stacked: true,
            beginAtZero: true,
            scaleLabel: {
              display: tData.revenue,
              labelString: 'Revenue (m)'
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toLocaleString()
              }
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function(tooltipItem, all) {
              return all.datasets[tooltipItem.datasetIndex].label
                + ': ' + tooltipItem.yLabel.toLocaleString();
            }
          }
        }
      }
    });

  });

});
