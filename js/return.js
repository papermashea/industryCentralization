d3.csv("./data/2017-2019_sectors_simple.csv") 
    .row(function(d) { 
      return {
        company: d.company,
        value: +d.value,
        sector: d.sector,
        ceo_comp: +d.ceo_comp,
        industry: d.industry,
        cpr: +d.cpr,  
        employees: +d.employees,
        fy: +d.fy};
      })
    .get(function(error, rows) {
      console.log(rows);
      data = rows;// Now you can assign it
      dataLoad()// Now you can draw it
    });