///NEA audience art museum attendance data 2012-17 race and ethnicity
             
            // d3.json("SPPA_NEA_2017UStrends2012-17_edpopmusraceeth.json").then((data) => {
            //                     svgPlot24(data);
            //         });
                    
            d3.json("data/NEA2012_2017audienceraceethlines.json").then((data) => {
                                 svgPlot24(data);
                    });
                //  console.log(data);
             
// 	var margin = {top: 80, right: 70, bottom: 60, left: 70}; ////this works outside the svgPlot
	
// 	var width = 750 - margin.left - margin.right; // specify the width and give space around the chart
// 	var height = 550 - margin.top - margin.bottom; // specify the width and give space around the chart
// 	console.log(margin.top)
 
	
// 			var svg = d3.select('#svg1')		  
//                 .append('svg')  ////then append an svg 
//                 .attr("width", width + margin.left + margin.right) ///attribute width is width(above) with the margins back on
//     			.attr("height", height + margin.top + margin.bottom)
            
//              var g = svg.append('g')    ////then append to global g - so now the div svg is appended
//              ///note for multiple svgs you need a new g variable so you'd have g1, g2, etc

//             	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//         ////the above transform moves the whole chart away from the left and top of the browser
   
            
            let svgPlot24 = (data) => { ////need to call a different svgPlot 
                console.log(data); ////with each chart for multiple charts
                
        	var margin = {top: 105, right: 90, bottom: 80, left: 90}; ////this works outside the svgPlot
	
	var width = 800 - margin.left - margin.right; // specify the width and give space around the chart
	var height = 550 - margin.top - margin.bottom; // specify the width and give space around the chart
	console.log(margin.top)
 
	
			var svg = d3.select('#svg24')		  
                .append('svg')  ////then append an svg 
                    .attr("width", width + margin.left + margin.right) ///attribute width is width(above) with the margins back on
        			.attr("height", height + margin.top + margin.bottom)
            
             var g = svg.append('g')    ////then append to global g - so now the div svg is appended
             ///note for multiple svgs you need a new g variable so you'd have g1, g2, etc

            	.attr("transform", "translate(" + margin.left/1.3 + "," + margin.top*1.2 + ")");
        ////the above transform moves the whole chart away from the left and top of the browser
                
// to get paired lines for 2012-2017///make new array with just the SAME two numbers 
          	const museum12 = data[0].percent[0]
          	console.log(museum12)
          	
        	  const museum17 = data[0].percent[1]
          	console.log(museum17)
let lines1 = [museum12, museum17];


          	const museu12 = data[1].percent[0]
          	console.log(museu12)
          	
        	  const museu17 = data[1].percent[1]
          	console.log(museu17)
let lines2 = [museu12, museu17];

          	const muse12 = data[2].percent[0]
          	console.log(muse12)
          	
        	  const muse17 = data[2].percent[1]
          	console.log(muse17)
let lines3 = [muse12, muse17];

          	const mus12 = data[3].percent[0]
          	console.log(mus12)
          	
        	  const mus17 = data[3].percent[1]
          	console.log(mus17)
let lines4 = [mus12, mus17];

          	const mu12 = data[4].percent[0]
          	console.log(mu12)
          	
        	  const mu17 = data[4].percent[1]
          	console.log(mu17)
let lines5 = [mu12, mu17];          	


console.log(lines1, lines2, lines3, lines4, lines5);

// // The number of datapoints for paired lines
	var n = 2;
// //////

var xScale = d3.scaleLinear()
				.domain([0, n-1])
				.range([0, width]); ////note don't add margins here
                

// console.log(max)
var yScale = d3.scaleLinear()
				.domain([0, 26.7+5]) ///to give axis height 100% 
				.range([height, 0]);  ////note don't add margins here
                
// console.log(data[0].percent[0])
 
var line = d3.line()
	.x(function(d,i) { // to use “i” in xScale 
					   // you have to list d first and then i and separate by comma
		console.log(xScale(i));
		return xScale(i);
	})
	.y(function(d, i) { 
		return yScale(d);
	});
	
	
// var area = d3.area()  //////can use this twice just call in each of the 2 lines
// 	.x(function(d,i) { // to use “i” in xScale 
// 					   // you have to list d first and then i and separate by comma
// 		console.log(xScale(i))
// 		return xScale(i); 
// 	})
// 	.y1(function(d, i) { 
// 		return yScale(d);
// 	})
// 	.y0(yScale(0));
	

// // // 9. Append the path, bind the data, and call the line generator - Example
// // svg.append("path")
// //     .datum(dataset) // 10. Binds data to the line 
// //     .attr("class", "line") // Assign a class for styling 
// //     .attr("d", line); // 11. Calls the line generator 
    
// ///////\\\\\\\\\\\\\\\showing one line only

/////blue line Hispanic
////tooltip
// let div = d3.select("#svg24").append("div")
//     .append('g')
let div1 = d3.select("g").append("div")
    .attr("class", "tooltipline1") ////best to use #tooltip div for styling
    .style("opacity", 0)
    .style("display", "none");

  function mouseover() {
    div.style("display", "inline");
  }
  
let line1 = g.append("path")
    			.datum(lines1)
    			// .attr("class", "line") // Assign a class for styling
    			.attr('d', (d,i)=> {
    				// return line(d,i)    ////\\here add function in the line generator 
    				console.log(d,i)
    				return line(d,i)
    			})
    			.attr('stroke', 'turquoise')
    			.attr('stroke-width', 1)
    			   .on("mouseover", function(d,i) {
        d3.select(this) 
          line1.append('text')
              .style("color", "turquoise")
              .style('font-size', "100%")
   
          var _x = (d3.mouse(this)[0]);
          var _y = (d3.mouse(this)[1]);
       
        d3.select("#tooltipline1")  //Update the tooltip position and value
          
          .style("left", (_x + margin.right*1.3 ) + "px")
          .style("top", (_y + margin.top/1.1 ) + "px")
            
          .text(`Hispanic: 2012: 14.3%, 2017: 16.2%`)
          
          d3.select("#tooltipline1").classed("hidden", false);  //Show the tooltip
          // d3.select("#tooltipline1").style("opacity", 1);
        })
          .on("mouseout", function () {
                      
            d3.select(this)
                    .transition()
                    .delay(5000)
                    .duration(5000)
                      .style("fill", "")
            d3.select("#tooltipline1").classed("hidden", true)
                  // d3.select("#tooltipline1").style("opacity", 0) 
          });
    
      // line1.append("text")
      //       .text(`Hispanic: 14.3% 2012, 16.2% 2017`)
      //       .attr("class", "textline1")
          //   // .attr("x", lines1 => xScale(d[0]) + 5)
          //   console.log(d)
          //   .attr("x", function(d,i) { return xScale(i) + 5})
          //   .attr("y", function(d,i) {  yScale(d) - 10})
          //   // .attr("x", d => { 
          //   //   return xScale(d[0]) + 1;
          //   // })
          //   // // .attr("y", d => yScale(d[1]) - 10)
          //   // .attr("y", d => { 
          //   //   return yScale(d[1]) + 1; })
        //   })
        // .on("mouseout", function(d) {
        //     d3.select(this)
        //       .style("cursor", "none")  
        //       .transition()
        //       .duration(250)
        //       .selectAll(".text").remove();
        //       })
                    
    			
    				// .on('mouseenter', function(d){
        //                 console.log('hover');
        //                 console.log(d)
        //                 d3.select(this)
        //                     .transition()
				   	// 	    .duration(100)
				   	// 	   // NEED TO CHANGE THIS TEXT
        //                 attr.subhead3.text('art museum audience 2012: '+ d[0] + '% of US adult population; art museum audience 2017: ' + d[1] + '%')
    				// })
        //         .on('mouseout', function(d) {
        //         		console.log(d)
        //         		d3.select(this)
        //         		    .transition()
        //         		    .ease(Math.sqrt)
        //         		    .delay(1000)
				   	// 	    .duration(1000)
        //                 // ytext2.text(d[0]  + ' art museum audience 2012: 21% of US adult population; '+ d[1] + ' art museum audience 2017: 23.7%')
        //                 .attr.subhead3.text('Percent change for each')
        //             });
                     
			   		
 ////just the area below the line
// let line1area = g.append("path")
//     			.datum(data.percent)
//     			.attr('fill', 'purple')
//     //         	.attr('d', area(museumaudience))     
// 				// .attr("fill", "pink")
// 					.on('mouseenter', function(d){
//                         console.log('hover');
//                         console.log(d)
//                         ytext2.text('art museum audience 2012: '+ d[0] + '% of US adult population; art museum audience 2017: ' + d[1] + '%')
//     				})
//                 .on('mouseout', function(d) {
//                 		console.log(d)
//                         // ytext2.text(d[0]  + ' art museum audience 2012: 21% of US adult population; '+ d[1] + ' art museum audience 2017: 23.7%')
//                         ytext2.text('museum audience 2012-2017: 57.5 million adults')
//                         // .attr("class", "line"); 
//                     });
   
  // "White",  [24.1, 26.7]
let line2 = g.append("path")
    			.datum(lines2)
    			// .attr("class", "line") // Assign a class for styling
    			.attr('d', (d,i)=> {
    				// return line(d,i)    ////\\here add function in the line generator 
    				// console.log(d,i)
    				return line(d,i)
    			})
    			.attr('stroke', 'blue')
    			.attr('stroke-width', 1)
    				 .on("mouseover", function(d,i) {
          d3.select(this) 
         
        line2.append('text')
            .style("color", "#ffffff")
            .style('font-size', "100%")
      // var xPosition = parseFloat(d3.select(this).attr("xScale"))
      // var yPosition = parseFloat(d3.select(this).attr("yScale"))
        var _x2 = (d3.mouse(this)[0]);
        var _y2 = (d3.mouse(this)[1]);
   
      
      d3.select("#tooltipline2")  //Update the tooltip position and value
        .style("left", (_x2 + margin.right*1.3 ) + "px")
        .style("top", (_y2 + margin.top/1.1 ) + "px")
        // .select("#value")
        .text(`White: 24.1% 2012, 26.7% 2017`)
        
      d3.select("#tooltipline2").classed("hidden", false);  //Show the tooltip
    })
    .on("mouseout", function () {
      d3.select(this)
                .transition()	
                .delay(500)
                .duration(200)
                  .style("fill", "")
      d3.select("#tooltipline2").classed("hidden", true)
              
    });

// "African American",  [12, 17.1]
let line3 = g.append("path")
    			.datum(lines3)
    			// .attr("class", "line") // Assign a class for styling
    			.attr('d', (d,i)=> {
    				// return line(d,i)    ////\\here add function in the line generator 
    				// console.log(d,i)
    				return line(d,i)
    			})
    			.attr('stroke', 'purple')
    			.attr('stroke-width', 1)
    					 .on("mouseover", function(d,i) {
          d3.select(this) 
        
         
            line3.append('text')
                .style("color", "#ffffff")
                .style('font-size', "100%")
          // var xPosition = parseFloat(d3.select(this).attr("xScale"))
          // var yPosition = parseFloat(d3.select(this).attr("yScale"))
          
        var _x3 = (d3.mouse(this)[0]);
        var _y3 = (d3.mouse(this)[1]);
          
          d3.select("#tooltipline3")  //Update the tooltip position and value
            .style("left", (_x3 + margin.right*1.3 ) + "px")
            .style("top", (_y3 + margin.top/1.1 ) + "px")
            // .select("#value")
            .text(`African American: 12% 2012, 17.1% 2017`)
            
          d3.select("#tooltipline3").classed("hidden", false);  //Show the tooltip
        })
        .on("mouseout", function () {
          d3.select(this).style("fill", "");
          d3.select("#tooltipline3").classed("hidden", true);
        });
    
// "Asian" [23, 26.2]                
let line4 = g.append("path")
    			.datum(lines4)
    			// .attr("class", "line") // Assign a class for styling
    			.attr('d', (d,i)=> {
    				// return line(d,i)    ////\\here add function in the line generator 
    				// console.log(d,i)
    				return line(d,i)
    			})
    			.attr('stroke', 'pink')
    			.attr('stroke-width', 1)
    				 .on("mouseover", function(d,i) {
          d3.select(this) 
         
            line4.append('text')
                .style("color", "#ffffff")
                .style('font-size', "100%")
          // var xPosition = parseFloat(d3.select(this).attr("xScale"))
          // var yPosition = parseFloat(d3.select(this).attr("yScale"))
       
        var _x4 = (d3.mouse(this)[0]);
        var _y4 = (d3.mouse(this)[1]);
          
          d3.select("#tooltipline4")  //Update the tooltip position and value
            .style("left", (_x4 + margin.right*1.3 ) + "px")
            .style("top", (_y4 + margin.top/1.1 ) + "px")
            // .select("#value")
            .text(`Asian: 23% 2012, 26.2% 2017`)
              
            d3.select("#tooltipline4").classed("hidden", false);  //Show the tooltip
          })
          .on("mouseout", function () {
            d3.select(this).style("fill", "");
            d3.select("#tooltipline4").classed("hidden", true);
          });
 
// "Other",  [16.9, 22.1]       
let line5 = g.append("path")
    			.datum(lines5)
    			// .attr("class", "line") // Assign a class for styling
    			.attr('d', (d,i)=> {
    				// return line(d,i)    ////\\here add function in the line generator 
    				// console.log(d,i)
    				return line(d,i)
    			})
    			.attr('stroke', 'red')
    			.attr('stroke-width', 1)
            .on("mouseover", function(d,i) {
          d3.select(this) 
         
            line5.append('text')
                .style("color", "#ffffff")
                .style('font-size', "100%")
          // var xPosition = parseFloat(d3.select(this).attr("xScale"))
          // var yPosition = parseFloat(d3.select(this).attr("yScale"))
      
        var _x5 = (d3.mouse(this)[0]);
        var _y5 = (d3.mouse(this)[1]);
        
          d3.select("#tooltipline5")  //Update the tooltip position and value
            .style("left", (_x5 + margin.right*1.3 ) + "px")
            .style("top", (_y5 + margin.top/1.1 ) + "px")
            // .select("#value")
            .text(`Other: 16.9% 2012, 22.1% 2017`)
              
            d3.select("#tooltipline5").classed("hidden", false);  //Show the tooltip
          })
          .on("mouseout", function () {
            d3.select(this).style("fill", "");
            d3.select("#tooltipline5").classed("hidden", true);
          });
                    
    let yAxis = g.append("g")  // just append axis to global space
        .attr("class", "yaxisnea3")
        .style('fill', 'none')
        .style('stroke', 'darkslategrey')
        .style("color",'darkslategrey')
        .style('stroke-width', 0.2)
        .style('font-size', "70%")
        .attr("transform", `translate(0.19 , 0 )`) 
        .call(d3.axisLeft(yScale) //call axisLeft to use yScale for axis ticks and scale
        	.tickSize(3)
            .ticks("5")
        );

    let yaxisRight = g.append("g")
        .attr("class", "yaxisnea3")
        .style('fill', 'none')
        .style('stroke', 'darkslategrey')
        .style("color",'darkslategrey')
        .style('stroke-width', 0.2)
        .style('font-size', "70%")
         .attr("transform", `translate(${width} , 0 )`)  //////move it to right hand side
        .call(d3.axisRight(yScale)///.above move the axis to place that the chart ends - within the margins
        	.tickSize(3)
        // 	.ticks("")
            .ticks(5)
        );
  
    // console.log(data[0].years[0])
    
     let xaxisbottom = g.append("g")
        .attr("class", "xaxisnea3")
        // .append('text')
        .style('fill', 'none')
        .style('stroke', 'darkslategrey')
        .style("color",'darkslategrey')
        .style('stroke-width', 0.32)
        .style('font-size', "70%")
         .attr("transform", `translate(0, ${height} )`)  //////move it to right hand side
        .datum(lines1)
        .call(d3.axisBottom(xScale)///.above move the axis to place that the chart ends - within the margins
        	.tickSize(0)
        // 	.ticks("1")
        	.ticks("")
        // 	.tickPadding(10)
        //     .tickFormat(function(e,i) {
        //   console.log(data[0].years)
        //   var s = data[0].years[0];
        //   return   s + " ";
        // })
        );

 let chartxaxistick2 = g.append('g')
				.append('text')
    				.attr("class", "xaxisnea3")
                    .text('2017')
                    .attr('x', width-margin.left/4)
                    .attr('y', height*1.06)
                    .attr('font-size', '70%')
                    .style("color", "darkslategrey")
                    .style("fill", "currentColor");
                    
let chartxaxistick1 = g.append('g')
				.append('text')
    				.attr("class", "xaxisnea3")
                    .text('2012')
                    .attr('x', -margin.left/6)
                    .attr('y', height*1.06)
                    .attr('font-size', '70%')
                    .style("color", "darkslategrey")
                    .style("fill", "currentColor");
                    
let line1text = g.append('g')
				.append('text')
             .text('Hispanic')
              .attr('x', width*1.03)
              .attr('y', height/2)
              .attr('font-size', '75%')
              .style("color", "turquoise")
              .style("fill", "currentColor");

let line2text = g.append('g')
				.append('text')
             .text('White')
              .attr('x', width*1.03)
              .attr('y', height/6.7)
              .attr('font-size', '75%')
              .style("color", "blue")
              .style("fill", "currentColor");

let line3text = g.append('g')
				.append('text')
             .text('African American')
              .attr('x', width*1.03)
              .attr('y', height/2.18)
              .attr('font-size', '75%')
              .style("color", "purple")
              .style("fill", "currentColor");

let line4text = g.append('g')
				.append('text')
             .text('Asian')
              .attr('x', width*1.03)
              .attr('y', height/5.3)
              .attr('font-size', '75%')
              .style("color", "pink")
              .style("fill", "currentColor");
              
let line5text = g.append('g')
				.append('text')
             .text('Other')
              .attr('x', width*1.03)
              .attr('y', height/3.3)
              .attr('font-size', '75%')
              .style("color", "red")
              .style("fill", "currentColor");
 
 let chart1 = g.append('g')
				.append('text')
    				.attr("class", "audtext3")
                    .text('percent')
                    .attr('x', -margin.left*3)
                    // .attr('y', 0-margin.top/15)
                    .attr('y', width+margin.left/2)
                    .attr("transform", "rotate(-90)")
                    .attr('font-size', '90%');
                
                
 let heading = g.append('g')  //// append text to global
				.append('text')
    				.attr("class", "audheading3")
                    .text('National Art Museum Audiences: 2012 - 2017')
                    .attr('x', margin.left/18)
                    .attr('y', 0-margin.top)
                    

  let subhead1 = g.append('g')
				.append('text')  /////to site text you can always do negative values to be outside the chart
                    .attr("class", "audsubhd3")
                    .text('Percent trend lines by demographic subgroup during audience uptick')
                    .attr('x', margin.left/18)
                    .attr('y', 0-margin.top/1.5)
  
                  
                    
  let subhead2 = g.append('g')
				.append('text')  /////to site text you can always do negative values to be outside the chart
                    .attr("class", "audsubhead4")
                    .text('Hispanic, White, African American, Asian, Other')
                    .attr('x', margin.left/18)
                    .attr('y', 0-margin.top/5)
                    .attr('font-size', '1.1em'); 
  
   let footnote1 = g.append('g')
				.append('text')  /////to site text you can always do negative values to be outside the chart
                    .attr("class", "audsubhead5")
                    .text('Data: Office of Research & Analysis, National Endowment for the Arts, Sept. 2018')
                    .attr('x', margin.left/18)
                    .attr('y', height+margin.top/2.4)
                    .attr('font-size', '74%'); 
                    
  let footnote2 = g.append('g')
				.append('text')  /////to site text you can always do negative values to be outside the chart
                    .attr("class", "audsubhead5")
                    .text('Percent of U.S. adults visiting art museums/galleries by demographic subgroup: 2012, 2017')
                    .attr('x', margin.left/18)
                    .attr('y', height+margin.top/1.8)
                    .attr('font-size', '74%');


// "Hispanic", [14.3, 16.2]
// "White", [24.1, 26.7]
// "African American", [12, 17.1]
// "Asian",  [23, 26.2]
//   "Other" [16.9, 22.1]
    
// footnote
// Office of Research & Analysis
// National Endowment for the Arts
// September 2018
// Percent of U.S. adults visiting art museums/galleries, touring historic places, or attending a crafts fair, by demographic subgroup: 2012, 2017
// Visited art museums or galleries			

// //     			.on('mouseenter', function(d){
// //                         console.log('hover');
// //                         console.log(d)
// //                         heading.text(d[0]  + ' American Indian or Alaskan Native & Native Hawaiian or Pacific Islander curators; ' + d[1] + ' hired 2010+')
// //                         .attr('font-size', '10px')
// //                         })                            ////// tspan
// //                 .on('mouseout', function(d) {
// //                 		console.log(d)
// //                 	// .transition()
// //                 	// 	.ease(Math.sqrt)
// //                  //       .delay(100)
// //                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
// //                         .attr('font-size', '12px')
// //                         .attr("class", "line");
// //                     });

 
// // let line2 = g.append("path")
// //     			.datum(all2tot2)
// //     			// .attr("class", "line") // Assign a class for styling
// //     			.attr('d', function(d,i) {
// //     				return line(d,i)    ////\\here add function in the line generator taking in the 
// //     			})
// //     			.attr('fill', 'none')
// //     			// .attr('stroke', 'pink')
// //     			.attr('stroke', "#9cb749")
// //     			.attr('stroke-width', 1.5)
// //     			.attr('shape-rendering', 'crispEdges')
// //     			.on('mouseenter', function(d){
// //                         console.log('hover');
// //                         console.log(d)
// //                         heading.text(d[0]  + ' Asian curators; '+ d[1] + ' were hired 2010-2015')
// //     					})   
// //                  .on('mouseout', function(d) {
// //                 		console.log(d)
// //                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
// //                         .attr("class", "line"); 
// //                     });
// //  //console.log(line2)
 
// // let line3 = g.append("path")
// //     			.datum(all3tot3)
// //     			// .attr("class", "line") // Assign a class for styling
// //     			.attr('d', function(d,i) {
// //     				return line(d,i)    ////\\here add function in the line generator taking in the 
// //     			})
// //     			.attr('fill', 'none')
// //     			.attr('stroke', '#58f97e')
// //     			.attr('stroke-width', 1.5)
// //     			.attr('shape-rendering', 'crispEdges')
// //     			.on('mouseenter', function(d){
// //                         console.log('hover');
// //                         console.log(d)
// //                         heading.text(d[0]  + ' Black or African American curators; '+ d[1] + ' were hired 2010-2015')
// //     		     	}) 
// //                  .on('mouseout', function(d) {
// //                 		console.log(d)
// //                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
// //                         .attr("class", "line"); 
// //                     });
// //  //console.log(line3)

// // let line4 = g.append("path")
// //     			.datum(all4tot4)
// //     			// .attr("class", "line") // Assign a class for styling
// //     			.attr('d', function(d,i) {
// //     				return line(d,i)    ////\\here add function in the line generator taking in the 
// //     			})
// //     			.attr('fill', 'none')
// //     			.attr('stroke', '#2be6fc')
// //     			.attr('stroke-width', 1.5)
// //     			.attr('shape-rendering', 'crispEdges')
// //     			.on('mouseenter', function(d){
// //                         console.log('hover');
// //                         console.log(d)
// //                         heading.text(d[0]  + ' Hispanic curators; '+ d[1] + ' were hired 2010-2015')
// //     			   }) 
// //                  .on('mouseout', function(d) {
// //                 		console.log(d)
// //                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
// //                         .attr("class", "line"); 
// //                     });
// //  //console.log(line4)
 
// // let line5 = g.append("path")
// //     			.datum(all5tot5)
// //     			// .attr("class", "line") // Assign a class for styling
// //     			.attr('d', function(d,i) {
// //     				return line(d,i)    ////\\here add function in the line generator taking in the 
// //     			})
// //     			.attr('fill', 'none')
// //     			.attr('stroke', '#fcc42b')
// //     			.attr('stroke-width', 1.5)
// //     			.attr('shape-rendering', 'crispEdges')
// //     				.on('mouseenter', function(d){
// //                         console.log('hover');
// //                         console.log(d)
// //                         heading.text(d[0]  + ' curators of two or more races; '+ d[1] + ' were hired 2010-2015')
// //     				}) 
// //                  .on('mouseout', function(d) {
// //                 		console.log(d)
// //                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
// //                         .attr("class", "line"); 
// //                     });
// //  //console.log(line5)
 
// /////////////\\\\\\\\\\\\\\\end of showing one line only
// // area 

// // 724 above used the line generator
// // var line = d3.line()
// // 	.x(function(d,i) { // to use “i” in xScale 
// // 					   // you have to list d first and then i and separate by comma
// // 		console.log(xScale(i))
// // 		return width/3-(xScale(i)); 
		
// // 	})
// // 	.y(function(d, i) { 
// // 		// console.log(d)
// // 		// return height-(yScale(d)); 
// // 		return yScale(d);
// // 	});


// // var area = d3.area()
// //     .x(function(d) { return x(d.date); })
// //     .y1(function(d) { return y(d.value); })
// //     .y0(y(0));

// var area1 = d3.area()  //////can use this twice just call in each of the 2 lines
// 	.x(function(d,i) { // to use “i” in xScale 
// 					   // you have to list d first and then i and separate by comma
// 		// console.log(xScale(i))
// 		return width/3-(xScale(i)); 
// 	})
// 	.y1(function(d, i) { 
// 		// console.log(d)
// 		// return height-(yScale(d)); 
// 		return yScale(d);
// 	})
// 	.y0(yScale(0));
	
// // var area2 = d3.area()
// // 	.x(function(d,i) { // to use “i” in xScale 
// // 					   // you have to list d first and then i and separate by comma
// // 		// console.log(xScale(i))
// // 		return width/3-(xScale(i)); 
// // 	})
// // 	.y1(function(d,i) {   ///////HOW TO MAKE THIS first data point?????
// // 		console.log(d)
// // 		// return height-(yScale(d)); 
// // 		return yScale(d);      ///////HOW TO MAKE THIS use second data point twice?
// // 		return yScale(d);  
// // 	})
// // 	.y0(yScale(0));
	
// ///////race/ethnicity white - 6
// let line6 = g.append("path")
//     			.datum(all6tot6not)
//     			// .attr("class", "line") // Assign a class for styling
//     			.attr('d', function(d,i) {
//     				return line(d,i)    ////\\here add function in the line generator taking in the 
//     			})
//     			// .attr("transform", "translate(" + margin.left/2 + "," + margin.top + ")")
//     			.attr('fill', 'purple')
//     			.attr('stroke', 'yellow')
//     			.attr('stroke-width', 1)
//     			.attr('shape-rendering', 'crispEdges')
//     			// .call(yAxisRight)
//             	// .call(yAxis)
//             	.attr('d', area1(all6tot6not))     
// 				.attr("fill", "yellow")
// 				// .attr('stroke', 'none')
//     				.on('mouseenter', function(d){
//                         console.log('hover');
//                         console.log(d)
//                         heading.text(d[0]  + ' white curators; '+ d[1] + ' were hired 2010-2015')
//     				}) 
//                  .on('mouseout', function(d) {
//                 		console.log(d)
//                         heading.text((d) => { return "NYC DCLA Grantees 2015: Museum Curators"; })
//                         .attr("class", "line"); 
//                     });
                    
//  //console.log(line6)
 
//  let line6_2 = g.append("path")
//     			.datum(line6v2)  /////use the new array with the same 2 numbers
// 				.attr('d', function(d,i) {
//     				return line(d,i)    ////\\here add function in the line generator taking in the 
//     			})
//     			// .attr("transform", "translate(" + margin.left/2 + "," + margin.top + ")")
//     			.attr("fill-opacity","0.5")
//     			.attr('fill', 'orange')
//     			.attr('stroke-dasharray', '4')
//     			// .top ('stroke-dasharray','4')
//     			.attr('stroke', '#a557fc')
//     			.attr('stroke-width', 1)
//     			.attr('shape-rendering', 'crispEdges')
//     			.attr('d', area1(line6v2))  /////use area 1
//     			// .attr('stroke', 'none');  
    			
//  /////no one declined to state so removing this
//  //let line7 = g.append("path")
//  //   			.datum(all7tot7)
//  //   			// .attr("class", "line") // Assign a class for styling
//  //   			.attr('d', function(d,i) {
//  //   				return line(d,i)    ////\\here add function in the line generator taking in the 
//  //   			})
//  //   			.attr('fill', 'none')
//  //   			.attr('stroke', 'red')
//  //   			.attr('stroke-width', 1.5)
//  //   			.attr('shape-rendering', 'crispEdges')
//  //   				.on('mouseenter', function(d){
//  //                       console.log('hover');
//  //                       console.log(d)
//  //                       heading.text(d[0]  + ' curators who declined to state race/ethnicity of which '+ d[1] + ' were hired since 2010'); 
//  //                   });
//  //console.log(line7)
 
// // let line1 = g.append("line")
// //     			.attr("x1", 0)     // x position of the first end of the line
// //     			.attr("y1", 3*100)      // y position of the first end of the line
// //     			.attr("x2", 1000)     // x position of the second end of the line
// //     			.attr("y2", 4*100)
// //     			.attr('fill', 'none')
// //     			.attr('stroke', 'purple')
// //     			.attr('stroke-width', 1.5)
// //     			.attr('shape-rendering', 'crispEdges');
// //  console.log(line1)
               



// let legend = g.append("g");
// 	svg.append()
// 	.attr("class","legend")
// 	.attr("height", 120)
// 	.attr("width", 100)
//     .attr('transform', 'translate(20,50)')
// 	.style("font-size","10px");
// 	// .call(d3.legend);
	
//  legend.selectAll('rect')
//       //.data(d)
//       .enter()
//       .append("rect")
// 	  .attr("x", width - 65)
//       .attr("y", function(d, i){ 
//       		return i *  20;
//       })
// 	  .attr("width", 2)
// 	  .attr("height", 5)
// 	  .style("fill", function(d) { 
//         var color = color_legend[dataset.indexOf(d)][1];
//         return color;
//       })
      
//  legend.selectAll('text')
//       //.data(d)
//       .enter()
//       .append("text")
// 	  .attr("x", width - 52)
//       .attr("y", function(d, i){ 
//       		return i *  20 + 9;
//       })
// 	  .text(function(d) {
//         var text = color_legend[dataset.indexOf(d)][0];
//         return text;
//       });

// //////////
// // 12. Appends a circle for each datapoint 

// // svg.selectAll('circle') ////\\circle
// //     .data(all1tot1)
// // 	.enter().append("circle") //Uses the enter().append() method
// //     .attr("class", "dot") // Assign a class for styling
// //     .attr('fill', 'pink')
// //     .attr('stroke', 'pink')
// //     .attr('stroke-width', 1)
// //     .attr("cx", function(d,i) { return xScale(i) })////\\same xScale & 
// //     .attr("cy", function(d,i) { return yScale(i) })////\\same yScale as above
// //     // .attr("cx", function(d,i) { return xScale(i) })////\\same xScale & 
// //     // .attr("cy", function(d,i) { return yScale(d) })////\\same yScale as above
// //     .attr("r", 5)
// //  	.on('mouseenter', function(d){
// //             // console.log('hover');
// //             // console.log(d)
// //             heading.text('Last five years: number of ' + 'curators at all levels: ' + d); 
// //          });
       

   }; 
