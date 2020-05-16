// var m = d3.marcon().top(30).right(30).bottom(30).left(30).width(window.innerWidth).height(window.innerHeight);
// m.render()
// var width = m.innerWidth(), height = m.innerHeight(), svg = m.svg(), margin = {top: m.top(), left: m.left(), right: m.right()};

var termDiv = document.getElementById("term-swarm");
var svg = d3.select(termDiv).append("svg"),
    margin = {top: 40, right: 50, bottom: 40, left: 50};

    // width = svg.attr("width") - margin.left - margin.right,
    // height = svg.attr("height") - margin.top - margin.bottom;
function redraw(){
    
     var width = termDiv.clientWidth - margin.left - margin.right;
     var height = termDiv.clientHeight - margin.top - margin.bottom;

    // Use the extracted size to set the size of an SVG element.
    svg
      .attr("width", width)
      .attr("height", height);
    

var formatValue = d3.format(",d");

var x = d3.scaleLinear()
    .rangeRound([0, width-100]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/swarm-terms.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.value; }));

  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x(d.value); }).strength(7))
      .force("y", d3.forceY(height / 2))
      .force("collide", d3.forceCollide(25))
      .stop();

  for (var i = 0; i < 120; ++i) simulation.tick();

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(2, ".0s"));

  var cell = g.append("g")
      .attr("class", "cells")
        .selectAll("g").data(d3.voronoi()
        .extent([[0, 0], [width, height]])
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .polygons(data)).enter().append("g");
        // .on("mouseover", function(d){ d3.select(this).attr("fill", "pink"); })
        // .on("mouseout", function(){ d3.select(this).attr("fill", "black"); });
       


  cell.append("circle")
      .attr("r", function(d) { return (d.data.value * 0.001) * 10 + 3; })
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; })
      .style("fill", function(d) {
        var colorsArr = ['#c994c7','#fdbb84','#fc8d59','#ef6548','#f7f4f9','#df65b0','#e7298a','#ce1256','#980043','#67001f'];
        console.log(d.data.cluster);
        if (d.data.cluster == 10) {
            console.log(d.data.cluster, d.data.id);
            d.data.cluster = 0;
        }
        return colorsArr[d.data.cluster];
        });
    
  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  cell.append("title")
      .text(function(d) { return d.data.id + "\n" + formatValue(d.data.value); });
});

function type(d) {
  if (!d.value) return;
  d.value = +d.value;
  d.cluster = +d.cluster;
  return d;
    }
}
redraw();
// function redo() {
//     var clearOld = d3.select(termDiv);
//     clearOld.selectAll("svg").remove();
// }

window.addEventListener("scroll", function () {
    var pos = document.getElementById('terms-block').getBoundingClientRect();
    var posBot = pos.bottom;
    if (posBot < 800) {
        var termHeading = document.getElementById('terms-head');
        var introDiv = document.getElementById('intro');
        termHeading.style.opacity = 1;
        introDiv.style.opacity = 0;
        introDiv.style.transition = "opacity 1s ease-out";
        termHeading.style.transition = "opacity 1s ease-in";

    }
    // console.log(posBot);
    if (posBot < 750) {
        var termDiv = document.getElementById('terms-block');
        termDiv.style.opacity = 1;
//         termDiv.style.transition =  opacity 2s ease-in-out;
//         termDiv.style. -moz-transition: opacity 2s ease-in-out;
//    -webkit-transition: opacity 2s ease-in-out;
//         -webkit-transition: opacity 2s ease-in;
//        -moz-transition: opacity 2s ease-in;
//         -ms-transition: opacity 2s ease-in;
//          -o-transition: opacity 2s ease-in;
         termDiv.style.transition = "opacity 1s ease-in";

    }
});
