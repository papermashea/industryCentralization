$(document).ready(function() {

  var ctx = document.getElementById('canvas').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'bar',
    plugins: [ChartDataSource],
    data: {
      datasets: [{
        xAxisID: 'year',
      }],
    },
    options: {
      daatasource: {
        url: './data/_wip/timeline/1955-2020_sector-industry_small.xlsx',
        delimiter: ',',
        rowMapping: 'dataset',
        datasetLabels: true,
        indexLabels: true
      }
    }
  });

});