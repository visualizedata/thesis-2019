//inspired by https://pudding.cool/2019/03/hype/

let theID = null;

function showingSlide_4() {
  //alert("showing slide 4!");

  d3.csv("data/DataSampleModel3.csv", function(data) {
    //d3.csv("https://gavamedia.com/TEMP/DataSampleModel4.csv", function(data) {
    //for (var i = 0; i < data.length; i++) {}
    ///console.log(data[0]);

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

    let totalKPICounter = {
      "Mid-Point": 0,
      Contentious: 0,
      "Contenders for repatriation": 0,
      "Overall Collection": 0
    };

    // Calculate total number of each category
    data.forEach(function(row) {
      totalKPICounter[row.CaseTotalKPI]++;
    });

    // Remember what circle number we're currently on (for each cateogry)
    let currentCircle = {
      "Mid-Point": 0,
      Contentious: 0,
      "Contenders for repatriation": 0,
      "Overall Collection": 0
    };

    // console.log(d3.select("#modelViz").attr("class"));

    // if (d3.select("#modelViz").attr("class") == "slide-visible") {
    // console.log("hey");
    var circles = svg
      .selectAll("circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => {
        let currentCircleNum = currentCircle[data[i].CaseTotalKPI];
        let totalKPIs = totalKPICounter[data[i].CaseTotalKPI];

        // Spread elements equally
        let cxPos = scaleX((currentCircleNum / (totalKPIs - 1)) * 100);

        // Remember what circle number we're currently on (for each cateogry)
        currentCircle[data[i].CaseTotalKPI]++;

        return cxPos;
      })
      .attr("r", 7)
      .attr("class", d => {
        return (
          d.CaseTotalKPI.replace(/ /g, "_") +
          " c" +
          d.ObjectNumber.replace(/[\.\, ]/g, "_").replace(/__+/g, "_")
        );
      })
      //.style("fill", "rgb(112,112,112)")
      .attr("cy", -100)
      .on("mouseover", function(d) {
        console.log(d);
        tooltipMain.show(
          `
          <div>
          <h3>${d.ObjectName}</h3>
          <span class="label">Object Number:</span> ${d.ObjectNumber}<br>
  
        <span class="label">Culture of Origin:</span> ${
          d.Culture === "" ? "not defined" : d.Culture
        }<br>
        <span class="label">Classification:</span> ${d.Classification}<br>
        <span class="label">Model Score:</span> ${d.totalKPIs}<br>
        </div>
        `
        );

        d3.select(this).moveToFront();
        d3.selectAll("circle").attr("fill-opacity", 0.2);
        d3.select(this).attr("fill-opacity", 1);
      })
      .on("mousemove", function(d) {
        tooltipMain.move();
      })
      .on("mouseout", function(d) {
        tooltipMain.hide();
        d3.select(this).moveToBack();
        d3.selectAll("circle").attr("fill-opacity", 0.75);
      })
      .on("click", function(d) {
        let lookup = document.querySelector(".show-panel");
        if (lookup) {
          lookup.classList.remove("show-panel");
          lookup.classList.add("hide-panel");
        }

        theID = d.ObjectNumber.replace(" ", "-");
        //document.getElementById(theID).classList.remove("show-panel");
        //document.getElementById(theID).classList.add("hide-panel");
        //d3.select(theID).classed("show-panel", true);
        console.log(document.getElementById(theID));
        document.getElementById(theID).classList.add("show-panel");
      })

      // if (d3.select("#modelVizSVG").attr("class") === "slide-hidden") {
      //   console.log(this);
      // d3.selectAll(circles)
      .transition()
      .ease(d3.easeLinear)
      .duration((d, i) => {
        let shelf = levels[d.CaseTotalKPI];
        return scaleY(shelf) * (Math.floor(Math.random() * 6) + 5);
      })
      .attr("cy", (d, i) => {
        let shelf = levels[d.CaseTotalKPI];
        let newY = scaleY(shelf);

        if (d.CaseTotalKPI === "Overall Collection")
          newY = scaleY(shelf) - 4 + 10 * Math.random();

        return newY;
      });
    // }
    /*
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
	*/

    /////////////////////////////////////////////
    // Left text labels
    svg
      .append("text")
      .attr("x", 190)
      .attr("y", scaleY(levels["Overall Collection"]) + 5)
      .attr("text-anchor", "end")
      .text("Overall Collection")
      .attr("font-family", "adobe-devanagari")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", 190)
      .attr("y", scaleY(levels["Mid-Point"]) + 5)
      .attr("text-anchor", "end")
      .text("Mid-Point")
      .attr("font-family", "adobe-devanagari")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", 190)
      .attr("y", scaleY(levels["Contentious"]) + 5)
      .attr("text-anchor", "end")
      .text("Contentious")
      .attr("font-family", "adobe-devanagari")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", 190)
      .attr("y", scaleY(levels["Contenders for repatriation"]) + 5)
      .attr("text-anchor", "end")
      .text("Contenders for repatriation")
      .attr("font-family", "adobe-devanagari")
      .attr("font-size", "17px");
    /////////////////////////////////////////////

    /////////////////////////////////////////////
    // Right text labels

    svg
      .append("text")
      .attr("x", width)
      .attr("y", 20)
      .attr("text-anchor", "end")
      .text("% of Collection")
      .attr("font-family", "courier-prime", "monospace")
      .attr("font-size", "15px");

    svg
      .append("text")
      .attr("x", width)
      .attr("y", scaleY(levels["Overall Collection"]) + 5)
      .attr("text-anchor", "end")
      .text("100%")
      .attr("font-family", "courier-prime", "monospace")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", width)
      .attr("y", scaleY(levels["Mid-Point"]) + 5)
      .attr("text-anchor", "end")
      .text("8%")
      .attr("font-family", "courier-prime", "monospace")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", width)
      .attr("y", scaleY(levels["Contentious"]) + 5)
      .attr("text-anchor", "end")
      .text("2%")
      .attr("font-family", "courier-prime", "monospace")
      .attr("font-size", "17px");

    svg
      .append("text")
      .attr("x", width)
      .attr("y", scaleY(levels["Contenders for repatriation"]) + 5)
      .attr("text-anchor", "end")
      .text("0.4%")
      .attr("font-family", "courier-prime", "monospace")
      .attr("font-size", "17px");

    /////////////////////////////////////////////

    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
        this.parentNode.appendChild(this);
      });
    };

    d3.selection.prototype.moveToBack = function() {
      return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
        }
      });
    };

    // tooltip method
    var tooltipMain = {
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

    tooltipMain.init();
  });
}

function closePanel() {
  document.getElementById(theID).classList.remove("show-panel");
  document.getElementById(theID).classList.add("hide-panel");
}
