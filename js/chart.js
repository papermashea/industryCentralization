chart = {

  // set the dimensions and margins of the graph
  var width = 1000
  var height = 800
  
  // append the svg object to the body of the page
  var svg = d3.select("#vis-container")
    .append("svg")
      .attr("width", width)
      .attr("height", height)

  // Test data
  // data = d3.csv("./data/2017_simple.csv", function(data) {
  // data = d3.csv("./data/2017-2019_sectors_cpr_simple.csv", function(data) {
  // data = d3.csv("./data/2017-2019_sectors_v3.csv", function(data) {
  let data = d3.csv("./data/2017-2019_sectors_simple.csv", function(data) {


  // Current data
  // data = d3.csv("./data/2017-2019_sectors_cpr.csv", function(data) {
    // console.log(data)

    // Color palette for 11 sectors
    var color = d3.scaleOrdinal()
      .domain(["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "Health Care", "Information Technology",  "Industrials", "Materials", "Real Estate", "Utilities"])
      .range(d3.schemeCategory20c);

    // Size scale for countries
    var size = d3.scaleLinear()
      .domain([0, 600000])
      .range([5,100])  // circle will be between 7 and 55 px wide

    // create a tooltip
    var Tooltip = d3.select("#vis-container")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      Tooltip
        .html('<h1>' + d.company + '</h1>' +  "<br>"
          + '<p class="sector-industry">' + d.sector + ' | ' 
          + '<span class="industry">' + d.industry + '</span>'+ '</p>' +  "<br>"
          + d.value + " in revenue")
        .style("left", (d3.mouse(this)[0]+20) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
      Tooltip
        .style("opacity", 0)
    }

    // Initialize the circle: all located at the center of the svg area
    var node = svg.append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "node")
        .attr("r", function(d){ return size(d.value)})
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d){ return color(d.sector)})
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 0)
        .on("mouseover", mouseover) // What to do when hovered
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
        .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(data)
        .on("tick", function(d){
          node
              .attr("cx", function(d){ return d.x; })
              .attr("cy", function(d){ return d.y; })
        });

    // What happens when a circle is dragged?
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

  })

}