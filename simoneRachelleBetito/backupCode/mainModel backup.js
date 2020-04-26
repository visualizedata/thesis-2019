//d3.csv("data/DataSampleModel3.csv", function(data) {
d3.csv("https://gavamedia.com/TEMP/DataSampleModel4.csv", function(data) {
  //for (var i = 0; i < data.length; i++) {}
  ///console.log(data[0]);

  // data[0].score = 0;
  // data[1].score = 2;
  // data[2].score = 1;

  const levels = {
    "Overall Collection": 0,
    "Mid-Point": 1,
    Contentious: 2,
    "Contenders for repatriation": 3
  };

  let width = window.innerWidth * 0.75;
  let height = window.innerHeight * 0.75;
  let margin = { top: 50, right: 100, bottom: 50, left: 220 };
  var svg = d3
    .select("#modelVizSVG")
    .attr("width", width)
    .attr("height", height);

  let scaleY = d3
    .scaleLinear()
    .domain([0, 3])
    .range([margin.top, height - margin.bottom]);

  let scaleX = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

  var circle = svg
    .selectAll("circle")
    .data(data)
    .enter()

    .append("circle")
    .attr("cx", (d, i) => {
      return scaleX((i / data.length) * 100);
    })
    // .attr("cy", (d, i) => {
    //   let shelf = levels[d.CaseTotalKPI];
    //   return scaleY(shelf);
    // })
    .attr("r", 7)
    .attr("class", d => {
      return d.CaseTotalKPI;
    })
    .style("fill", "rgb(112,112,112)")
    .transition()
    .attr("cy", (d, i) => {
      let shelf = levels[d.CaseTotalKPI];			
      return scaleY(shelf);
    }) //animate cy for downwards motion, distribute by pixels/#items/
    //d3 spread elements equally
    // .attr("cx", (d) => { return 100 * d.score })
		.on("mouseover", d => {
			tooltip.show(`test`);
		})
		.on("mousemove", function(d) {
			tooltip.move();
		})
		.on("mouseout", d => {
			tooltip.hide();
		})
	
    .duration(1000);
  /*svg
    .on("mouseover", d => {
      tooltip.show(`test`);
    })
    .on("mousemove", function(d) {
      tooltip.move();
    })
    .on("mouseout", d => {
      tooltip.hide();
    });*/

  var text = svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text");

  var textLabels = text
    .attr("x", 190)
    .attr("y", (d, i) => {
      let shelf = levels[d.CaseTotalKPI];
      return scaleY(shelf) + 5;
    })
    .attr("text-anchor", "end")
    .text(d => {
      return d.CaseTotalKPI;
    })
    .attr("font-family", "adobe-devanagari")
    .attr("font-size", "17px");

  //tooltip
});
