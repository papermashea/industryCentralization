// set the dimensions and margins of the graph
var width = 1000
var height = 800


// window.onload = function () {
// append the svg object to the body of the page
var svg = d3.select("#central-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// Data
cData = d3.csv("./data/2017-2019_sectors_cpr.csv", function(cData) {
// data = d3.csv("./data/2017-2019_simple.csv", function(data) {  
    console.log(cData)

  // Color palette for 11 sectors
  var color = d3.scaleOrdinal()
    .domain(["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "Health Care", "Information Technology",  "Industrials", "Materials", "Real Estate", "Utilities", "Not found"])
    .range(["cornflowerblue", "cadetblue", "thistle", "orchid", "darkseagreen", "mediumorchid", "darkslateblue", "firebrick", "sandybrown", "gold", "darkorange", "whitesmoke"]);


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


  // Size scale for revenue
  var size = d3.scaleLinear()
    .domain([0, 600000])
    .range([5,80])  // circle will be between 10 and 100 px wide

  // create a tooltip
  var Tooltip = d3.select("#central-container")
    .data(cData)
    .enter()
    .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<h1>' + d.company + '</h1>'
        + '<p class="sector-industry">' + d.sector + ' | ' 
          + '<span class="industry">' + d.industry + '</span>'+ '</p>'
        + '<p class="details">' + d.revenue + " in revenue" + '</p>'
        + '<p class="details">' + d.employees + " employees" + '</p>'
        + '<p class="details">' + d.market_cap_billions + " in market cap (billions)" + '</p>'
        + '<p class="year">' + "in " + d.fiscal_year + '</p>'
        )
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
        .style("opacity", 0)
  }

  // Circle based on revenue
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
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

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

});
// }