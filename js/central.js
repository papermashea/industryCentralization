// set the dimensions and margins of the graph
const width = 900
const height = 700
const margin = {
  left: 200,
  right: 200,
  top: 50,
  bottom: 50
}

// window.onload = function () {

// append the svg object to the body of the page
var svg = d3.select("#central-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr('viewBox', '0 0 900 700')
  // .attr('preserveAspectRatio', 'xMinYMin meet')
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

 // d3.selectAll(("input[name='power']")).on("change", function(d){
    // powerValue = this.value; 
    // console.log(powerValue)

// Data
const cData = d3.csv("./data/2017-2019_sectors_cpr.csv", function(d) {
  d.revenue = parseInt(d.revenue);
  d.market_cap_billions = parseInt(d.market_cap_billions);
  d.ceo_comp = parseInt(d.ceo_comp);
  d.employee_comp = parseInt(d.employee_comp);
  d.employees = parseInt(d.employees);
  d.cpr = parseInt(d.cpr);

    return d; }, function(cData) {
// data = d3.csv("./data/2017-2019_simple.csv", function(data) {  
    // console.log(cData)



  // Color palette for 11 sectors + unknown
  var color = d3.scaleOrdinal()
    .domain(["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "Health Care", "Information Technology",  "Industrials", "Materials", "Real Estate", "Utilities", "Not found"])
    .range(["cornflowerblue", "cadetblue", "thistle", "orchid", "darkseagreen", "mediumorchid", "darkslateblue", "firebrick", "sandybrown", "gold", "darkorange", "whitesmoke"]);

    // // COLOR KEY
    // Information Technology - darkslateblue 
    // Communication Services - cornflowerblue
    // Consumer Discretionary - cadetblue
    // Financials - darkseagreen
    // Consumer Staples - thistle
    // Energy - orchid
    // Health Care - mediumorchid 
    // Industrials - firebrick
    // Utilities - darkorange
    // Materials - sandybrown
    // Real Estate - gold 
    // Not found - whitesmoke

  // Size scale for revenue
  var size = d3.scaleLinear()
    .domain([0, 600000])
    .range([4,60])  // circle will be between 5 and 80 px wide

  // create a tooltip
  var Tooltip = d3.select("#central-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

  // 3 functions: hover, move, leave cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    Tooltip
      .html('<h3>' + d.company + '</h3>'
        + '<p class="sector-string">' + d.sector + ' | ' 
          + '<span class="industry-string">' + d.industry  + '</span>' + '</p>'
        + '<li class="company">' + '<span class="bold-data">' + "$" + d3.format(",")(d.revenue) + '</span>' + " million in revenue & " + '<span class="bold-data">' + "$" + d3.format(",")(d.market_cap_billions) + '</span>' + " billion in market cap"  
        + '<li class="employees">'+ 'CEO pay ratio of ' + '<span class="bold-data">' +  d3.format(",")(d.cpr) + ':1' + '</span>' 
        + '<li class="employees">'+ 'CEO total compensation: ' + '<span class="bold-data">' + "$" +  d3.format(",")(d.ceo_comp) + '/yr'+ '</span>' 
        + '<li class="employees">' + '<span class="bold-data">' + d3.format(",")(d.employees) + '</span>' + " employees making " + '<span class="bold-data">' + "$" + d3.format(",")(d.employee_comp) + '/yr' + '</span>' + ' or ' + '<span class="bold-data">' + d3.format(",.4r")(d.employee_comp/21960) + '</span>' +' times the Federal Poverty Level for a family of 3'
        + '<p class="year-data">' + 'in ' + d.fiscal_year + '</p>' 
        + '<div class="footer">' + '</div>' )
      .style("background-color", color(d.sector))
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
      .style("background-color", 'white')
  }

  // var maxScale = d3.max(d.ceo_comp)
  // console.log(maxScale)

  // var newSizeScale = d3.scaleLinear()
  //   .domain([0, maxScale])
  //   .range([5,80]);    

// circle click behavior depends on value of "action"
// d3.select("svg#radio").select("circle")
//   .on("click", function () {
//     if (action == "left") {
//       var cx_new = +d3.select(this).attr("cx") - 50;
//       if (cx_new < 20) cx_new = 20;
//       } else {
//       var cx_new = +d3.select(this).attr("cx") + 50;
//       if (cx_new > 280) cx_new = 280;
//       }
//     d3.select(this)
//       .transition()
//       .duration(500)
//       .attr("cx", cx_new);
//       });

  // Initial circle based on revenue
  var node = svg.append("g")
    .selectAll("circle")
    .data(cData)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.revenue)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d){ return color(d.sector)})
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 0)
      .on("mouseover", mouseover)
      .style("fill-opacity", 0.8)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() 
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

    d3.selectAll("input")
      .on("change", change);

    function change() {
      var powerValue = this.value;
      console.log(powerValue)

     // var minScale = d3.min(cData, d => d[powerValue]); 
     // var maxScale = d3.max(cData, d => d[powerValue]); 
     // var maxPower = d3.max(cData, function(d) { return d[powerValue]}) 

     // var maxPower = d3.max(cData, function(d) { 
     //  if (d[powerValue] >= 0) {return d[powerValue]} 
     //  else {return d[powerValue]*-1 }
     //  });

    // console.log(maxPower)

    var maxDomain = d3.max(cData, function(d) { return d[powerValue]})
     console.log(maxDomain)

    var newSize = d3.scaleLinear()
      .domain([0, d3.max(cData, function(d) { return d[powerValue]})])
      .range([4,60])

     var newShape = svg.enter()
        node.attr("r", function(d){ return newSize(d[powerValue])})
            .exit().remove()
        // node.attr("r", function(d){ return newSize(d[powerValue])})
        simulation.force("center", d3.forceCenter().x(width / 2).y(height / 2))
        simulation.force("charge", d3.forceManyBody().strength(.1)) 
        simulation.force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (newSize(d[powerValue])) }).iterations(1))
      // simulation.force("collide", d3.forceCollide().strength(.1).radius(function(d){ return (newSize(d[powerValue])+3) }).iterations(1))      

    }


  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.revenue)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(cData)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });

  // Drag circle
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  // make svg responsive 
  // d3.select(window).on(
  //     'resize.' + container.attr('id'), 
  //     resize
  // );

  // function resize() {
  //     const w = parseInt(container.style('width'));
  //     svg.attr('width', w);
  //     svg.attr('height', Math.round(w / aspect));
  // }


// var aspect = width / height,
//     chart = d3.select('#chart');

// d3.select(window)
//   .on("resize", function() {
//     var targetWidth = chart.node().getBoundingClientRect().width;
//     chart.attr("width", targetWidth);
//     chart.attr("height", targetWidth / aspect);
//   });


  });
// });






















// function conversor(d){
//     d.revenue_m = +d.revenue_m;
//     // d.rank = +d.rank;
//     d.year = +d.year;
//     d.profit_m = +d.profit_m;
//     return d;
// };