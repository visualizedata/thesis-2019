function radialLoad(t) {
//set dynamic svg width
// var width = forceDiv.clientWidth - margin.left - margin.right;
// var height = forceDiv.clientHeight - margin.top - margin.bottom;

//     // Use the extracted size to set the size of an SVG element.
//     svg
//       .attr("width", width)
//       .attr("height", height);


// set the dimensions and margins of the graph
var margin = {top: 300, right: 50, bottom: 40, left: 325},
    width = 625 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgRadius = d3.select("#radiusGraph")
   .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");
          // "translate(" + margin.left * 2 + "," + margin.top * 2 + ")");

// var forceDiv = document.getElementById("radiusGraph");
// var svg = d3.select(forceDiv).append("svg"),
//     margin = {top: 40, right: 50, bottom: 40, left: 50};


var nodes = [].concat(
  d3.range(30).map(function() { return {type: 0}; }),
  d3.range(250).map(function() { return {type: 1}; }),
  d3.range(160).map(function() { return {type: 2}; }),
  d3.range(200).map(function() { return {type: 3}; }),
  d3.range(140).map(function() { return {type: 4}; }),
  d3.range(110).map(function() { return {type: 5}; }),
  d3.range(40).map(function() { return {type: 6}; }),
  d3.range(40).map(function() { return {type: 7}; }),
  d3.range(30).map(function() { return {type: 8}; }),
  d3.range(20).map(function() { return {type: 9}; })
);

// var nodeRadiusAll = [220, 210, 180, 200, 190, 230, 165, 175];
var nodeRadiusAll = [115, 200, 160, 175, 145, 130, 120, 115, 110, 100];

// var nodeRadiusCluster = [200, 170, 70, 130, 100, 230, 10, 40];
var nodeRadiusCluster = [60, 230, 200, 175, 150, 115, 90, 75, 35, 5];

// var colorArr= ["pink", "red", "hotpink", "purple", "orange", "violet", "orange", "violet"];
// var colorArr = ["pink", "purple", "hotpink", '#ce1256', "orange", "violet", '#980043','#67001f', '#e7298a', "red", "purple" ];
// var colorArr= ['#c994c7','#fdbb84','#fc8d59','#ef6548','#f7f4f9','#df65b0','#e7298a','#ce1256','#980043','#67001f'];
var colorArr = ["pink", "hotpink", "orange", "violet",'#ce1256','#980043','#67001f','#ef6548', '#980043', "#fc8d59"];

if (t === "all") {
    return update(nodeRadiusAll);
} if (t=== "cluster") {
    return update(nodeRadiusCluster);
}

function update(nodeRadius) {
   d3.selectAll(".circles").remove()
    var node = d3.select("#radiusGraph")
      .select("svg")
      .selectAll(".circles")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 2.5)
        // .attr("fill", function(d) { return d.type === "a" ? "brown" : "steelblue"; })
        .attr("fill", function(d) { return colorArr[d.type] })
        .attr("class", function(d) { return "cluster" + d.type + " circles"});
        

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceCollide().radius(3.2))
        // .force("r", d3.forceRadial(function(d) { return d.type === "a" ? 100 : 200; }))
        .force("r", d3.forceRadial(function(d) { return nodeRadius[d.type] }))
        .on("tick", ticked);

    function ticked() {
      node
          .attr("cx", function(d) { return d.x + margin.left; })
          .attr("cy", function(d) { return d.y + margin.top; })
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

          // .mouseover("fill", function(d) { // write functionn that then selects a node and higlights all other nodes with same class and words in div tor right with same words, onmouse out rehighlight all)
          //   d3.selectAll("class", function(d){
          //     return 
          //   })
          // })
    }

    function handleMouseOver() {
      var thisClass = d3.select(this).attr("class");
      console.log(thisClass);
        d3.selectAll(".circles circle")
          .transition()
          .duration(150)
          .attr("fill", "#cdcdcd")
          .attr("opacity", 0.5);
        d3.selectAll("." + thisClass + " circle")
        .transition()
          .duration(150)
          .attr("fill", function(d) {  return colorArr[d.type]; })
          .attr("r", 3.5)
          .attr("opacity", 1);            
         
    }
    
    function handleMouseOut() {
      d3.selectAll(".circles")
        .selectAll("circle")
        .attr("fill", function(d) { return colorArr[d.type]; })
        .attr("opacity", 1)
        .attr("r", 2.5)
    }

     var words = d3.selectAll(".terms")
        .on("mouseover", getClass)
        .on("mouseout", leaveClass);

    function getClass() {
        console.log("fired");
        var thisClass = d3.select(this).attr("class");
        var cClass= thisClass.split(' ')[0];
        var second = thisClass.split(' ')[1];
        var clustindex = cClass.slice(-1);
        var clust2index = second.slice(-1);
        console.log(cClass);
        d3.selectAll("circle.circles")
          .transition()
          .duration(150)
          .attr("fill", "#cdcdcd")
          .attr("opacity", 0.5);
        d3.selectAll("circle." + cClass + ".circles")
        .transition()
          .duration(150)
          .attr("fill", function(d) { return colorArr[+clustindex]; })
          .attr("r", 3.5)
          .attr("opacity", 1); 
        if(second != "terms") {
        d3.selectAll("circle." + second + ".circles")
        .transition()
            .duration(150)
            .attr("fill", function(d) { return colorArr[+clust2index]; })
            .attr("r", 3.5)
            .attr("opacity", 1); 
            }
    }
    function leaveClass() {
        console.log("fired");
        var thisClass = d3.select(this).attr("class");
        var cClass= thisClass.split(' ')[0];
        var clustindex = cClass.slice(-1);
        d3.selectAll(".circles")
        .selectAll("circle")
        .attr("fill", function(d) { return colorArr[+clustindex]; })
        .attr("opacity", 1)
        .attr("r", 2.5)
    }
}

// function drop() {
//   var node = d3.select("svg")
//       .selectAll("circle")
//         .transition("drop")
//         .delay(function(d,i){return(i*1.1)})
//         .duration(2000)
//         .attr("cy", function(d) { return -200; });
    
// }

// intro slide can have all cluster around title with intro text on right about the issue and why we care-  anter button that on click sets the nnew radius for all campiagns
// update(nodeRadiusAll);

}
// update(nodeRadiusCluster)
radialLoad("all");
var called = false;

window.addEventListener("scroll", function () {
    var offsets = document.getElementById('radialTrigger1').getBoundingClientRect();
    var top = offsets.top;
    // var bottom = offsets.bottom;
    console.log(called);
    if (!called) {
        if (top < 400) {
        called = !called;
        return radialLoad("cluster");
      }
      return called;
    }
});
// handle mouseover/ mouseout with functions not just callback