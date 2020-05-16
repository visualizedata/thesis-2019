var margin = {left:122, top:40, right:140, bottom:50},
	width = Math.max( Math.min(window.innerWidth) - margin.left - margin.right),
	height = Math.max( Math.min(window.innerHeight- 150) - margin.top - margin.bottom ),
    // height = Math.max( Math.min(window.innerHeight-250, 900) - margin.top - margin.bottom - 20, 400),
    innerRadius = Math.min(width * 0.33 , height * .45),
	outerRadius = innerRadius * 1.05;
	
//     innerRadius = Math.min(width * 0.33, height * .45),
//     outerRadius = innerRadius * 1.05;
	
// //Recalculate the width and height now that we know the radius
// width = outerRadius * 2 + margin.right + margin.left;
// height = outerRadius * 2 + margin.top + margin.bottom;
	
	
//Recalculate the width and height now that we know the radius
width = outerRadius + margin.right + margin.left;
height = outerRadius * 2 + margin.top + margin.bottom;
	
//Reset the overall font size
var newFontSize = Math.min(70, Math.max(40, innerRadius * 62.5 / 250));
d3.select("html").style("font-size", newFontSize + "%");

////////////////////////////////////////////////////////////
////////////////// Set-up Chord parameters /////////////////
////////////////////////////////////////////////////////////
	
var pullOutSize = 20 + 30/135 * innerRadius;
var numFormat = d3.format(",.0f");
var defaultOpacity = 0,
	fadeOpacity = 0.02;
						
var loom = d3.loom()
    .padAngle(0.01)
	.sortSubgroups(sortAlpha)
	// .heightInner(100)
	.emptyPerc(0.2)
	.widthInner(20)
	// .widthInner(function(d) { return 6 * d.length; })
	.value(function(d) { return d.words; })
	.inner(function(d) { return d.character; })
	.outer(function(d) { return d.location; });

var arc = d3.arc()
    .innerRadius(innerRadius*1.01)
    .outerRadius(outerRadius);

var string = d3.string()
    .radius(innerRadius/1.0)
	.pullout(pullOutSize);


////////////////////////////////////////////////////////////
//////////////////// Character notes ///////////////////////
////////////////////////////////////////////////////////////

// //pink to green
// ['#8e0152','#c51b7d','#de77ae','#f1b6da','#fde0ef','#e6f5d0','#b8e186','#7fbc41','#4d9221','#276419']
// //brown to torquoise
// ['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#c7eae5','#80cdc1','#35978f','#01665e','#003c30']
// //orange to purple
// ['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b']
// //pink to green
// ['#8e0152','#c51b7d','#de77ae','#f1b6da','#fde0ef','#e6f5d0','#b8e186','#7fbc41','#4d9221','#276419']
// //purple to green
// ['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']
// //blue to red
// ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#d1e5f0','#92c5de','#4393c3','#2166ac','#053061']

var characterNotes = [];
characterNotes["Cluster 0"] = "surgery, severe, need, donations, care";
characterNotes["Cluster 1"] = "cancer, treatments, diagnosis, need, stage";
characterNotes["Cluster 2"] = "heart, medical, surgery, family, recovery";
characterNotes["Cluster 3"] = "medical, care, life, cost, continue";
characterNotes["Cluster 4"] = "work, care, job, days, need";
characterNotes["Cluster 5"] = "family, expenses, years, cost, medical";
characterNotes["Cluster 6"] = "cancer, treatments, surgery, work, family";
characterNotes["Cluster 7"] = "months, recovery, next, work, last";
characterNotes["Cluster 8"] = "getting, pain, back, go, sees";
characterNotes["Cluster 9"] = "amount, family, any, care, life";
characterNotes["Cluster 10"] = "give, life, know, fights, loving";
characterNotes["Cluster 11"] = "recent, stage, donations, cost, diagnosed";
characterNotes["Cluster 12"] = "treatments, cancer, family, years, donations";
characterNotes["Cluster 13"] = "hospital, family, need, time, donations";
characterNotes["Cluster 14"] = "need, friends, family, know, time";
characterNotes["Cluster 15"] = "medical, hospital, bill, getting, tests";
characterNotes["Cluster 16"] = "support, appreciate, family, care, time";
characterNotes["Cluster 17"] = "surgery, pain, know, need, removed";
characterNotes["Cluster 18"] = "causing, hopes, medical, pain, continue";
characterNotes["Cluster 19"] = "treatments, cancer, radiation, chemotherapy, know";
////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////
			
var svg = d3.select("#lotr-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

////////////////////////////////////////////////////////////
///////////////////// Read in data /////////////////////////
////////////////////////////////////////////////////////////
			
d3.json('data/loom_cluster_terms.json', function (error, dataAgg) {

	////////////////////////////////////////////////////////////
	///////////////////// Prepare the data /////////////////////
	////////////////////////////////////////////////////////////
	
	//Sort the inner characters based on the total number of words spoken
	
	//Find the total number of words per character
	var dataChar = d3.nest()
		.key(function(d) { return d.character; })
		.rollup(function(leaves) { return d3.sum(leaves, function(d) { return d.words; }); })
		.entries(dataAgg)
		.sort(function(a, b){ return d3.descending(a.value, b.value); });				
	//Unflatten the result
	var characterOrder = dataChar.map(function(d) { return d.key; });
	//Sort the characters on a specific order
	function sortCharacter(a, b) {
	  	return characterOrder.indexOf(a) - characterOrder.indexOf(b);
	}//sortCharacter
	
	//Set more loom functions
	loom
		.sortSubgroups(sortCharacter)
		.heightInner(innerRadius*.75/characterOrder.length + 10);

		// .heightInner(innerRadius*0.75/characterOrder.length);
	
	////////////////////////////////////////////////////////////
	///////////////////////// Colors ///////////////////////////
	////////////////////////////////////////////////////////////
					
	//Color for the unique locations
	var locations = ["Cluster 0", "Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4", "Cluster 5", "Cluster 6", "Cluster 7", "Cluster 8", "Cluster 9", "Cluster 10", "Cluster 11", "Cluster 12", "Cluster 13", "Cluster 14", "Cluster 15", "Cluster 16", "Cluster 17", "Cluster 18", "Cluster 19"];
	// var colors = ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#fff7f3','#f768a1','#dd3497','#fde0dd','#fcc5c0','#fa9fb5','#f768a1'];
	var colors = ['#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#e7e1ef','#d4b9da','#c994c7','#df65b0'];
	//'#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043'
	var color = d3.scaleOrdinal()
    	.domain(locations)
    	.range(colors);
	//Create a group that already holds the data
	var g = svg.append("g")
		.attr("transform", "translate("+ (width/2 + margin.left) + ","+ (height/2 + margin.top) + ")")
		.datum(loom(dataAgg));	

	////////////////////////////////////////////////////////////
	///////////////////// Set-up title /////////////////////////
	////////////////////////////////////////////////////////////

	var titles = g.append("g")
		.attr("class", "texts")
		.style("opacity", 0);
		
	titles.append("text")
		.attr("class", "name-title")
		.attr("x", 0)
		.attr("y", -innerRadius*5/6);
		
	titles.append("text")
		.attr("class", "value-title")
		.attr("x", 0)
		.attr("y", -innerRadius*5/6 + 25);
	
	//The character pieces	
	titles.append("text")
		.attr("class", "character-note")
		.attr("x", 0)
		.attr("y", innerRadius/1.5)
		.attr("dy", "0.35em");
					
	////////////////////////////////////////////////////////////
	////////////////////// Draw outer arcs /////////////////////
	////////////////////////////////////////////////////////////

	var arcs = g.append("g")
		.attr("class", "arcs")
	  .selectAll("g")
	    .data(function(s) { 
			return s.groups; 
		})
	  .enter().append("g")
		.attr("class", "arc-wrapper")
	  	.each(function(d) { 
			d.pullOutSize = (pullOutSize * ( d.startAngle > Math.PI + 1e-2 ? -1 : 1)) 
		})
 	 	.on("mouseover", function(d) {

			//add arc labels on interaction
			d3.selectAll(".outer-labels")
			  .transition()
			d3.selectAll(".outer-label")
			  .style("opacity", 0.4)
			d3.selectAll(".outer-label-values")
			   .style("opacity", 0.4)
			
			//Hide all other arcs	
			d3.selectAll(".arc-wrapper")
		      	.transition()
				.style("opacity", function(s) { return s.outername === d.outername ? 1 : 0.5; });
			
			//Hide all other strings
		    d3.selectAll(".string")
		      	.transition()
		        .style("opacity", function(s) { return s.outer.outername === d.outername ? 1 : fadeOpacity; });
				
			//Find the data for the strings of the hovered over location
			var locationData = loom(dataAgg).filter(function(s) { return s.outer.outername === d.outername; });
			//Hide the characters who haven't said a word
			d3.selectAll(".inner-label")
		      	.transition()
		        .style("opacity", function(s) {
					//Find out how many words the character said at the hovered over location
					var char = locationData.filter(function(c) { return c.outer.innername === s.name; });
					return char.length === 0 ? 0.1 : 1;
				});
			d3.selectAll(".texts")
				.transition()
				.style("opacity", 1)
			d3.selectAll(".name-title")
				.text(d.outername)
			d3.selectAll(".character-note")
				.text(characterNotes[d.outername])
				.call(wrap, 2.25*pullOutSize);
				// //.text(characterNotes[d.name])
 	 	})
     	.on("mouseout", function(d) {

			//add arc labels on interaction
			d3.selectAll(".outer-labels")
			  .transition()
			d3.selectAll(".outer-label")
			  .style("opacity", 0)
			d3.selectAll(".outer-label-values")
			   .style("opacity", 0)
			
			d3.selectAll(".texts")
				.transition()
				.style("opacity", 0)
			//Sjow all arc labels
			d3.selectAll(".arc-wrapper")
		      	.transition()
				.style("opacity", 1);
			
			//Show all strings again
		    d3.selectAll(".string")
		      	.transition()
				.style("opacity", 0.04);
				
			//Show all characters again
			d3.selectAll(".inner-label")
		      	.transition()
		        .style("opacity", 1);
 	 	});

	var outerArcs = arcs.append("path")
		.attr("class", "arc")
	    .style("fill", function(d) { return color(d.outername); })
	    .attr("d", arc)
		.attr("transform", function(d, i) { //Pull the two slices apart
			  return "translate("+ d.pullOutSize + ',' + 0 + ")";
		 });
		 					
	////////////////////////////////////////////////////////////
	//////////////////// Draw outer labels /////////////////////
	////////////////////////////////////////////////////////////

	//The text needs to be rotated with the offset in the clockwise direction
	var outerLabels = arcs.append("g")
		.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2); })
		.attr("class", "outer-labels")
		.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end": null; })
		.attr("transform", function(d,i) { 
			var c = arc.centroid(d);
			return "translate("+ (c[0] + d.pullOutSize) + ","+ c[1] + ")"
			+ "rotate("+ (d.angle * 180 / Math.PI - 90) + ")"
			+ "translate("+ 26 + ",0)"
			+ (d.angle > Math.PI ? "rotate(180)": "")
		})
		
	//The outer name
	outerLabels.append("text")
		.attr("class", "outer-label")
		.attr("dy", ".35em")
		.style("opacity", defaultOpacity)
		.text(function(d,i){ return d.outername });
		
	//The value below it
	outerLabels.append("text")
		.attr("class", "outer-label-value")
		.attr("dy", "1.5em")
		.style("opacity", defaultOpacity)
		.html(function(d,i){ return numFormat(d.value) });
		
	////////////////////////////////////////////////////////////
	////////////////// Draw inner strings //////////////////////
	////////////////////////////////////////////////////////////
	
	var strings = g.append("g")
	    .attr("class", "stringWrapper")
		.style("isolation", "isolate")
	  .selectAll("path")
	    .data(function(strings) { 
			return strings; 
		})
	  .enter().append("path")
		.attr("class", "string")
		.style("mix-blend-mode", "multiply")
	    .attr("d", string)
	    .style("fill", function(d) { return d3.rgb( color(d.outer.outername) ).brighter(0.2) ; })
		.style("opacity", defaultOpacity);
		
	////////////////////////////////////////////////////////////
	//////////////////// Draw inner labels /////////////////////
	////////////////////////////////////////////////////////////
			
	//The text also needs to be displaced in the horizontal directions
	//And also rotated with the offset in the clockwise direction
	var innerLabels = g.append("g")
		.attr("class","inner-labels")
	  .selectAll("text")
	    .data(function(s) { 
			return s.innergroups; 
		})
	  .enter().append("text")
		.attr("class", "inner-label")
		.attr("x", function(d,i) { return d.x; })
		.attr("y", function(d,i) { return d.y; })
		.style("text-anchor", "middle")
		.attr("dy", ".35em")
	    .text(function(d,i) { return d.name; })
 	 	.on("mouseover", function(d) {

			//add arc labels on interaction
			d3.selectAll(".outer-labels")
			  .transition()
			d3.selectAll(".outer-label")
			  .style("opacity", 0.4)
			d3.selectAll(".outer-label-values")
			   .style("opacity", 0.4)
			
			
			//Show all the strings of the highlighted character and hide all else
		    d3.selectAll(".string")
		      	.transition()
		        .style("opacity", function(s) {
					return s.outer.innername !== d.name ? fadeOpacity : 1;
				});
			
			//Update the word count of the outer labels
			var characterData = loom(dataAgg).filter(function(s) { return s.outer.innername === d.name; });
			
			// d3.selectAll(".outer-label-value")
			// 	.html(characterNotes[d.name])
			// 	//.text(characterNotes[d.name])
			// 	.call(wrap, 2.25*pullOutSize);
				// .text(function(s,i){
				// 	//Find which characterData is the correct one based on location
				// 	//var loc = characterData.filter(function(c) { return c.outer.outername === s.outername; });
				// 	// if(loc.length === 0) {
				// 	// 	var value = 0;
				// 	// } else {
				// 	// 	var value = loc[0].outer.value;
				// 	// }
				// 	console.log(s.outername);
				// 	console.log(d.name);
				// 	return characterNotes[s.outername];
					
				// 	// return numFormat(value) + (value === 1 ? "word": "test words"); 
					
				// });
			
			//Hide the arc where the character hasn't said a thing
			d3.selectAll(".arc-wrapper")
		      	.transition()
		        .style("opacity", function(s) {
					//Find which characterData is the correct one based on location
					var loc = characterData.filter(function(c) { return c.outer.outername === s.outername; });
					return loc.length === 0 ? 0.1 : 1;
				});
					
			//Update the title to show the total word count of the character
			d3.selectAll(".texts")
				.transition()
				.style("opacity", 1);	
			d3.select(".name-title")
				.text(d.name);
			d3.select(".value-title")
				.text(function() {
					var words = dataChar.filter(function(s) { return s.key === d.name; });
					return numFormat(words[0].value);
				});
				
			//Show the character note
			d3.selectAll(".character-note")
				.text(characterNotes[d.name])
				.call(wrap, 2.25*pullOutSize);
				
		})
     	.on("mouseout", function(d) {

			//add arc labels on interaction
			d3.selectAll(".outer-labels")
			  .transition()
			d3.selectAll(".outer-label")
			  .style("opacity", 0)
			d3.selectAll(".outer-label-values")
			   .style("opacity", 0)
			

			
			//Put the string opacity back to normal
		    d3.selectAll(".string")
		      	.transition()
				.style("opacity", 0.04);
				
			//Return the word count to what it was
			d3.selectAll(".outer-label-value")	
				.text(function(s,i){ return numFormat(s.value)});
				
			//Show all arcs again
			d3.selectAll(".arc-wrapper")
		      	.transition()
		        .style("opacity", 1);
			
			//Hide the title
			d3.selectAll(".texts")
				.transition()
				.style("opacity", 0);
			
		});
	  		
});//d3.csv

////////////////////////////////////////////////////////////
///////////////////// Extra functions //////////////////////
////////////////////////////////////////////////////////////

//Sort alphabetically
function sortAlpha(a, b){
	    if(a < b) return -1;
	    if(a > b) return 1;
	    return 0;
}//sortAlpha

//Sort on the number of words
function sortWords(a, b){
	    if(a.words < b.words) return -1;
	    if(a.words > b.words) return 1;
	    return 0;
}//sortWords

/*Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text*/
function wrap(text, width) {
  text.each(function() {
	var text = d3.select(this),
		words = text.text().split(/\s+/).reverse(),
		word,
		line = [],
		lineNumber = 0,
		lineHeight = 1.2, // ems
		y = parseFloat(text.attr("y")),
		x = parseFloat(text.attr("x")),
		dy = parseFloat(text.attr("dy")),
		tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

	while (word = words.pop()) {
	  line.push(word);
	  tspan.text(line.join(""));
	  if (tspan.node().getComputedTextLength() > width) {
		line.pop();
		tspan.text(line.join(""));
		line = [word];
		tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	  }
	}
  });
}//wrap