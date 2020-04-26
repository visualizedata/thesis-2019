// let width = window.innerWidth;
// let height = window.innerHeight;

var chart = d3.select("#svg-map");
var width = window.innerWidth;
var height = window.innerHeight;
var aspect = width / height;

d3.select(window).on("resize", function() {
  var targetWidth = chart.node().getBoundingClientRect().width;
  console.log(targetWidth);
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

var svg = d3
  .select("#svg-map")
  .append("svg")
  .attr("viewBox", "0 0 " + width + " " + height)
  .attr("width", width)
  .attr("height", height);

// Map and projection
var projection = d3
  .geoMercator()
  .scale([width / 6]) //observablehq D3 mercator
  .translate([width / 2, height / 1.4]);

// A path generator
var path = d3.geoPath().projection(projection);

// Load world shape AND list of connection
d3.queue()
  .defer(
    d3.json,
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ) // World shape
  .defer(d3.csv, "data/ListofRepatriatedItems.csv") // Position of circles
  //.defer(d3.csv, "https://gavamedia.com/TEMP/ListofRepatriatedItems.csv") // Position of circles
  .await(ready);

function ready(error, dataGeo, data) {
  var link = [];
  data.forEach(function(row) {
    source = [+row.Long1, +row.Lat1];
    target = [+row.Long2, +row.Lat2];
    yearRep = [+row.YearRepatriated];
    countryOfOriginationRep = [row.CountryOfOrigination];
    ReceivingCountryRep = [row.ReceivingCountry];
    itemNameRep = [row.ItemName];
    imageURLRep = [row.imageURL];

    topush = {
      type: "LineString",
      coordinates: [source, target],
      year: yearRep,
      countryOfOrigination: countryOfOriginationRep,
      receivingCountry: ReceivingCountryRep,
      itemName: itemNameRep,
      imageURL: imageURLRep
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
    .style("stroke-width", 0.5);

  // Add the path (WITHOUT tooltip)
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
    });

  // Add the path again (WITH tooltip)
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
    .style("stroke", "transparent")
    .style("stroke-width", 20)
    .on("mouseover", d => {
      tooltip.show(
        `



        <div>
        <h3>${d.itemName}</h3>
        <span class="label">Country of Origin:</span> ${
          d.countryOfOrigination
        }<br>
        <span class="label">Receiving Country:</span> ${d.receivingCountry}<br>
        <span class="label">Year Repatriated:</span> ${
          d.year > 0 ? d.year : "None"
        }
        </div>
        <img src="images/${d.imageURL}" alt="image of ${d.itemName}">
        `
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
      .style(
        "left",
        d3.event.pageX + 20 > width - 300
          ? width - 300 + "px"
          : d3.event.pageX + 20 + "px"
      )
      .style(
        "top",
        d3.event.pageY + 20 > height - 550
          ? height - 550 + "px"
          : d3.event.pageY - 20 + "px"
      )
      .style("opacity", 0.4);
  },
  move: function() {
    this.element
      .transition()
      .duration(30)
      .style(
        "left",
        d3.event.pageX + 20 > width - 300
          ? width - 300 + "px"
          : d3.event.pageX + 20 + "px"
      )
      .style(
        "top",
        d3.event.pageY + 20 > height - 550
          ? height - 550 + "px"
          : d3.event.pageY - 20 + "px"
      )
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
