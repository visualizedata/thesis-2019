// let width = window.innerWidth;
// let height = window.innerHeight;

var chart = d3.select("#map");
var width = 900;
var height = 500;
var aspect = width / height;

d3.select(window).on("resize", function() {
  var targetWidth = chart.node().getBoundingClientRect().width;
  console.log(targetWidth);
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

var svg = d3
  .select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Map and projection
var projection = d3
  .geoMercator()
  .scale([width / 5.5]) //observablehq D3 mercator
  .translate([width / 2, height / 1.1]);

// A path generator
var path = d3.geoPath().projection(projection);

// Load world shape AND list of connection
d3.queue()
  .defer(
    d3.json,
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ) // World shape
  .defer(d3.csv, "https://gavamedia.com/TEMP/ListofRepatriatedItems.csv") // Position of circles
  .await(ready);

function ready(error, dataGeo, data) {
  console.log(data);
  // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
  var link = [];
  data.forEach(function(row) {
    source = [+row.Long1, +row.Lat1];
    target = [+row.Long2, +row.Lat2];
    yearRep = [+row.YearRepatriated];
    topush = {
      type: "LineString",
      coordinates: [source, target],
      year: yearRep
    };
    link.push(topush);
  });

  console.log(link);

  // Draw the map
  svg
    .insert("g")
    .selectAll("path")
    .data(dataGeo.features)
    .enter()
    .append("path")
    .attr("fill", "#b8b8b8")
    .attr("d", d3.geoPath().projection(projection))
    .style("stroke", "#fff")
    .style("stroke-width", 0);

  // Add the path
  svg
    .selectAll("myPath")
    .data(link)
    .enter()
    .append("path")
    .attr("d", function(d) {
      return path(d);
    })
    .style("fill", "none")
    // .style("stroke", d => {
    //   return d.year > 0 ? "coral" : "#707070";
    // })
    .style("stroke-width", 2)
    .attr("class", d => {
      return d.year > 0 ? "repatriated" : "not-rep";
    })
    .on("mouseover", d => {
      tooltip.show(
        `Hi, I was repatriated ${d.year > 0 ? "in " + d.year : "never :("}`
      );
    })
    .on("mousemove", function(d) {
      tooltip.move();
    })
    .on("mouseout", d => {
      tooltip.hide();
    });
}

// tooltip method
var tooltip = {
  element: null,
  init: function() {
    this.element = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  },
  show: function(t) {
    this.element
      .html(t)
      .transition()
      .duration(200)
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY - 20 + "px")
      .style("opacity", 0.4);
  },
  move: function() {
    this.element
      .transition()
      .duration(30)
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY - 20 + "px")
      .style("opacity", 0.9);
  },
  hide: function() {
    this.element
      .transition()
      .duration(500)
      .style("opacity", 0);
  }
};

tooltip.init();
