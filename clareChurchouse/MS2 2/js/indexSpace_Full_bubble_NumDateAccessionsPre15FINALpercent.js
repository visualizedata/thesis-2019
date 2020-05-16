// <!--PERCENT-->
//////full Brooklyn Museum contemporary collection artworks dataset with accession information
//////accession number and accession dates of artworks with artist name and nationality 
/////count nationality for artwork bubbles grouped by artist nationality by before 2015 and 2015 and after
/////3 with no accession number / corresponding accession date
/////here artworks acquired before 2015
////data from full Brooklyn Museum contemporary collection, artist, accession date and accession number - see cloud9
// <!--see indexSpace_Full_bubble_NumDateAccessionspre15.js for data wrangling-->

// d3.json("BkMus10253fullaccessNumDatenationalityAll.json").then((data) => {
//   // dataWrangling(data);
//   svgPlot26(data); // called later in the dateWrangling function
// });

d3.json("data/before15groupsortcontinent.json").then((before15groupCount) => {
  // dataWrangling(data);
  svgPlot28(before15groupCount); // called later in the dateWrangling function
});

// ---------------------------- Data ----------------------------
// const dataWrangling = (data) => {
// console.log(data)
//   console.log(data.length);
//   // let nationalityCount = data.sort((a, b) => (a.count > b.count) ? -1 : 1); // This is to sort the array large to small
//   // //   nationalityCount = nationalityCount.sort((a, b) => (a.count > b.count) ? 1 : -1); // small to large
//   // console.log(nationalityCount[0].count)
  
//   // let reformattedData = data.slice(0, 3);
//   let reformattedData = accession;
//   svgPlot23(reformattedData);
// }

            const svgPlot28 = (before15groupCount) => { ////different svgPlot 
                // console.log(data[2]);
                console.log(before15groupCount)
                console.log(before15groupCount.length);
                // console.log(data)
//                 let test_data = data.forEach((d, i) => {
//                 // let test_data = (data,(d, i) => {
//                 // console.log(d[i]);
//                 var dat = i[0+1];
//                 console.log(dat);
//                 return i[0+1];
//               })
// //              
// console.log(test_data)
   var margin = {top: 5, right: 120, bottom: 60, left: 120}; ////this works outside the svgPlot
	
	var width = 960 - margin.left - margin.right; // specify the width and give space around the chart
	var height = 850 - margin.top - margin.bottom; // specify the width and give space around the chart
// 	console.log(margin.top)



    var svg = d3.select('#svg28')		  
            .append('svg')  ////then append an svg 
              .attr("width", width + margin.left + margin.right) ///attribute width is width(above) with the margins back on
      			  .attr("height", height + margin.top + margin.bottom)
            
        var g = svg.append('g')    ////then append to global g - so now the div svg is appended
             ///note for multiple svgs you need a new g variable so you'd have g1, g2, etc

            	.attr("transform", "translate(" + margin.left*2 + "," + margin.top + ")");
        ////the above transform moves the whole chart away from the left and top of the browser
        
        var modal = svg.append('g').attr("id", "modal3")     

              .attr("transform", "translate(" + margin.left*2 + "," + margin.top + ")");
     
                
// /////data wrangling
// /////returns data with accession number 4 digits, artist name and artist nationality for each artwork

//       var return_data = [];
            
//               let test_data = data.forEach((d, i) => {
                
//                 if (data[i].artist.length  > 0) { // if artist is not empty
//                     var str = "19";
//                     var year = data[i].accessionnumber.split('.')[0]; //split accession number at period
                
//                           if(year < 100){  //if number less than 100, concat '19' to make years 1900s
//                             var new_year = str.concat(year);
//                             // console.log(new_year)
//                               } else {
//                                 var new_year = data[i].accessionnumber.split('.')[0];
//                               }
//                     // return_data[i] = [new_year, data[i].artist[0].name, data[i].artist[0].nationality];
//                     return_data[i] = [new_year, data[i].artist[0].name, data[i].artist[0].nationality, data[i].accessiondate];
//                 } else { // if artist array is empty
//                     // console.log("here");
//                     var str = "19";
//                     var year = data[i].accessionnumber.split('.')[0];
                
//                         if(year < 100){  // if accession number is 4 digits
//                           var new_year = str.concat(year);
//                           // console.log(new_year)
//                         }else {
//                           var new_year = data[i].accessionnumber.split('.')[0];
//                         }

//                     // return_data[i] = [new_year, "null", "null"];
//                     return_data[i] = [new_year, "null", "null", data[i].accessiondate];
//                 }
//                 // console.log(return_data);
//               });

//         let accessionNum = return_data;
            
//             console.log(accessionNum);
//             console.log(accessionNum.length);
            
// ////======array of objects - so need to loop to get each item within the count
// // //return data by year grouped into before and after  

// // //group the accession date years into before 2010 and after 2010
// // // second group 2015 before and after

// let datenull10 =[];
// let datebefore10 = []; 
// let dateafter10 = [];
// let datenull15 =[];
// let datebefore15 = []; 
// let dateafter15 = [];


// // ////====console.log test

// // // for(let i = 0; i < datenodes.length; i++){
// // //   if(datenodes[i][0] == "null"){
// // //     // console.log("data " +i+ " is null, and nationality is "+ datenodes[i][1] );
// // //   } else if (datenodes[i][0] < 2010){
// // //     // console.log("data " +i+ "'s date is " + datenodes[i][0] + " is before 2010, and nationality is "+ datenodes[i][1]);
// // //     datebefore[i] = [datenodes[i]];
// // //   } else {
// // //     console.log("data " +i+ " is after 2010, and nationality is "+ datenodes[i][1]);
// // //   }
// // // }

// // /////=======2010: loop through and push into groups: null dates, before 2010 and after 2010

// for(let i = 0; i < accessionNum.length; i++)
//   {
//     if ((accessionNum[i][0]) == "date unknown")
//       {
//       console.log("data " +i+ " is date unknown, and artist is "+ accessionNum[i][1] );
//         // console.log(accessionNum[i]); /////this works to get each array
//         datenull10.push(accessionNum[i])
//     } 
//       else if ((accessionNum[i][0])<2010)
//         {
//     // // console.log("data " +i+ "'s date is " + datenodes[i][0] + " is before 2010, and nationality is "+ datenodes[i][1]);
//           // console.log(datenodes[i])
//           datebefore10.push(accessionNum[i])
//     } else if ((accessionNum[i][0])>=2010)
//       {
//     // // console.log("data " +i+ " is after 2010, and nationality is "+ datenodes[i][1]);
//           // console.log(datenodes[i])
//           dateafter10.push(accessionNum[i])
//     }
//     // else  ((accessionNum[i][0]))
// }
// console.log(datenull10.length);
// console.log(datebefore10.length);
// console.log(dateafter10.length);
// console.log(datenull10);
// console.log(datebefore10);
// console.log(dateafter10);


// // ////=======do same loop for 2015 and after 
// // /////=======2015: loop through and push into groups: null dates, before 2015, and 2015 and after

// for(let i = 0; i < accessionNum.length; i++)
//   {
//     if ((accessionNum[i][0]) == "date unknown")
//       {
//       //console.log("data " +i+ " is null, and nationality is "+ accessionNum[i][1] );
//         datenull15.push(accessionNum[i])
//     } 
//       else if ((accessionNum[i][0])<2015)
//         {
//     // // console.log("data " +i+ "'s date is " + accessionNum[i][0] + " is before 2010, and nationality is "+ accessionNum[i][1]);
//           datebefore15.push(accessionNum[i])
//     } else if ((accessionNum[i][0])>=2015)
//       {
//     // // console.log("data " +i+ " is after 2010, and nationality is "+ accessionNum[i][1]);
//           // console.log(accessionNum[i])
//           dateafter15.push(accessionNum[i])
//     }
// }

// console.log(datenull15.length);
// console.log(datebefore15.length);
// console.log(dateafter15.length);
// console.log(datenull15);
// console.log(datebefore15);
// console.log(dateafter15);


// // //////===== return keys for date and nationality
// let null15 = [];
//         null15 = datenull15.map((e,i) => { 
//                     return {date: e[0], artist: e[1], nationality: e[2]};
//                 })
//         // console.log(null15[0].date)
//         console.log(null15)  
//         console.log(null15.length);
 
// let before15 = [];
//         before15 = datebefore15.map((e,i) => { 
//                     return {date: e[0], artist: e[1], nationality: e[2]};
//                 })
//         // console.log(before15[0].date)
//         console.log(before15)  
//         console.log(before15.length);

// let after15 = [];
//         after15 = dateafter15.map((e,i) => { 
//                     return {date: e[0], artist: e[1], nationality: e[2]};
//                 })
//         // console.log(after15[0].date)
//         console.log(after15.length);
//         console.log(after15)
     
// // /////====== then for each group count by nationality

// // // ===example http://learnjsdata.com/group_data.html

// // //////====== before15 group by nationality and keep date == 

// let before15group = d3.nest()
//                     // .key(function(d) { return d.nationality; })
//               ////retains date array and group by nationality     
//                     .key(function(d) { return  d.date, d.artist, d.nationality; })
//                     .entries(before15);
//             console.log(before15group)
//             console.log(before15group.length)

// // //// =====map is a very useful method in JavaScript to re-arrange arrays
// // //// https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

// // ////====count by nationality and keep date

//     var before15groupCount = before15group.map((e,i) => { 
//                     // return {nationality: e.key, count: e.values.length};
//     //////keep the arrays in each nationality group
//                     return {artists: e.values, nationality: e.key, count: e.values.length};
//                 });
//                 // console.log(nationalityCount[0].count)
//       console.log(before15groupCount)  
//       console.log(before15groupCount.length);
      
// // ////====sort by nationality length before 2015

// before15groupsort = before15groupCount.sort((a, b) => (a.count > b.count) ? -1 : 1); // This is to sort the array large to small
// console.log(before15groupsort)

  
// // ////to get max number
// //             let nat = after15group.map((e,i) => { 
// //                     return {count: e.values.length}; /////returns count: value
// //                 });
// //                    console.log(nat);  //////just the counts

// //             var maxnatctun = nat.map(function (art) {
// //                   return art.count;   ////returns just the values
// //                     });
//   //                  // console.log(maxnatctun);
//   //             // d3.max(nat);
            
// //             let maxnatct = maxnatctun.sort((a, b) => (a > b) ? -1 : 1);
// //                  console.log(maxnatct)
            
// //             let maxnatcount = d3.max(maxnatct);
// //                  console.log(maxnatcount);   //////max number


console.log(before15groupCount)
console.log(before15groupCount.length)

////get the count
            let nat = before15groupCount.map((e,i) => { 
                    // return {artists: e.artists, nationality: e.nationality, continent: e.continent, continentnum: e.continentnum, count: e.count }; /////returns count: value
                    // return {count: e.count}
                    return e.count
                    });
                    console.log(nat);  //////just the counts

////sum the numbers
var numbers = nat
var sum = 0;
for (var i = 0; i<numbers.length; i++) {
  sum += numbers[i]
}
console.log(sum)

////get the percentages
// for (var i = 0; i<numbers.length; i++) {
//   var percentage = before15groupCount[i].count*100/sum;
//   if(i==2){
//     console.log(percentage+"%");
//   }
//   console.log(percentage+"%")
// }

////do this on the whole dataset


// for (var i = 0; i<before15groupCount.length; i++){
//   var percentage = before15groupCount[i].count*100/sum;
//           // return {percent: percentage}
//           console.log(percentage)
//     //       before15groupCountperc.push(percentage)
//     // console.log(percentage+"%");
  
// }
// console.log(percentage)

////to get percentages
return_data = [];

var before15groupCountpercent 
for (let i = 0; i < before15groupCount.length; i++){
  var counts = before15groupCount[i].count;
  var percentage = before15groupCount[i].count*100/sum;{
          console.log(percentage)
          
           return_data[i] = [percentage, before15groupCount[i].artists, before15groupCount[i].continent, before15groupCount[i].continentnum, before15groupCount[i].nationality, counts];
          
          // before15groupCountperc = percentage
  }
}

before15groupCountpercent= return_data;
console.log(before15groupCountpercent)

// var before15groupCountperc 
// for (let i = 0; i < before15groupCount.length; i++){
//             before15groupCountperc[i] = [count[i].count]
// }
// console.log(before15groupCountperc)



////map to add keys

let before15grouppercent = [];
        before15grouppercent = before15groupCountpercent.map((e,i) => { 
                    return {percent: e[0], artist: e[1], continent: e[2], continentnum: e[3], nationality: e[4], count: e[5]};
                })

  
// console.log("hi")
console.log(before15grouppercent)
  

// ////use same max number as in all artwork circles 
//////percentages use max percentage and range is relative % of range 97.18% from number (270)
let radareadate = d3.scaleSqrt()    ////to get area of circles need square root 
                      // .domain([0, 68.37666900913563])  
                      .domain([0, 68.37666900913563]) 
                      // .range([0, 270]); change range to 97.18%
                      .range([0, 262.39]);
                      // .range([0, 97]);
            console.log(radareadate(68.37666900913563))

// //Initialize a simple force layout, using the nodes and edges in dataset

let force = d3.forceSimulation(before15grouppercent) 
  			  .force("charge", d3.forceManyBody().strength(15))
  			   // .force("charge", d3.forceManyBody().strength(20))
  				// .force("link", d3.forceLink(dataset.edges).distance(30))  
  			  .force("center", d3.forceCenter().x(width/3.5).y(height/1.66))
  				.force("collision", d3.forceCollide().radius(function(d, i) {
  				    return radareadate(d.percent) + 1;
  				}));


var colors = d3.scaleLinear().domain([1,13]).range(["#c9d3d6", "#ffe114","#c9d3d6", "#e0f75d", "#c5e3f9","#ffd6c9","#ffa14f"])

// var colors = d3.scaleSequential(d3.interpolateOrRd).domain([1, 13])
// var colors = "#a50026","#a70226","#a90426","#ab0626","#ad0826","#af0926","#b10b26","#b30d26","#b50f26","#b61127","#b81327","#ba1527","#bc1727","#be1927","#c01b27","#c21d28","#c41f28","#c52128"
// var colors = ("#543005","#563105","#583305","#5b3406","#5d3506","#5f3606","#613806","#633906","#663a07","#683c07","#6a3d07","#6c3e08","#6e4008")
// var colors = d3.scaleLinear().domain([1,13]).range(["#c9d3d6", "#ffe114","#c9d3d6", "#e0f75d", "#c5e3f9","#ffd6c9","#ffa14f"])
// // var colors = d3.scale.threshold()
// //   .domain([1, 14])  
// //   .range(["blue","yellow","green","orange"]); 

// var colors = d3.scaleLinear().domain([1,13]).range(["#c9d3d6", "#ffe114","#c9d3d6", "#e0f75d", "#c5e3f9","#ffd6c9","#ffa14f"])

// var colors = d3.scaleOrdinal().domain([1,13]).range(["#E0D985","#ffe114","#c9d3d6", "#98ba9e", "#e0f75d", "#c5e3f9", "#c9d3d6", "#ffa14f","#b50f26","#b61127","#b81327","#ba1527","#bc1727"])
// var colors = d3.scaleSequential(d3.interpolateBrBG).domain([1,13])

// var colors = d3.scaleSequential(d3.interpolateGrBl).domain([1, 13])

 
 //Create nodes as circles
console.log(before15grouppercent.length)

// //tooltip for information
// //         ////tooltip
//   let div = d3.select("g").append("div")
//         .attr("class", "tooltipcircles26") ////best to use #tooltip div for styling
//             .style("opacity", 0)
//             .style("display", "none");

//   function mouseover() {
//     div.style("display", "inline");
//   }
  
// //enter

var nodes = g.selectAll("g")
            .data(before15grouppercent)
            .enter()
          .append("g")
             .on('mouseover', function(d,i) {
                console.log(i)
        			   d3.select(`#tooltippre15perc${i}`).style("display", "block").style("opacity", 0.9)
                  // d3.select("#modal2").select(`#tooltippre15${i}`).select("rect").style("fill", "#fff")
                  })
        			.on('mouseleave', function(d,i) {
            		    console.log(i)
    ////////CHANGE
            		// d3.select(`#tooltippre15perc${i}`).style("display", "none").style("opacity", 0)
            		
            		
          			   //d3.select("#modal2").select(`#tooltippre15perc${i}`).select("rect").style("fill", "#fff")
          		  });
    

////13 continent groupings
  let sortcontinent = [];
      sortcontinent = before15grouppercent.sort((a, b) => (a.continentnum > b.continentnum) ? -1 : 1); // This is to sort the array large to small
console.log(sortcontinent)

/////create tooltip for each circle - percent
 var newtooltips = modal.selectAll("g")
                .data(before15grouppercent)
                .enter()
              .append("g")
                .attr("class", "newtooltipspre15perc")
                .attr("id", (d,i) => {   ////create id for each tooltip
                    return `tooltippre15perc${i}`
                  })
                  .style("opacity", 0)   ////hide
                  .style("display", "none")  //// change display on mouseover
                  
              
     newtooltips.append("rect")  
                  .attr("width", 310)
                  .attr("height", 32)
                  .attr("class", "toolrectperc")
                  .attr("x", -155) ////sites text in center of tooltip
                  .attr("y", -28)
                  .attr("rx", 3)
                  .attr("ry", 3)
                  .style("padding", 6)
                  .style("fill", "#a8aa2e")
                  .style("opacity", 0.9)
                  .attr("text-anchor", "middle")

    
    newtooltips.append("text")       	      	
              	   .text((d)=> {
                  	 // if (d.nationality != "") {
                              return (d.nationality + ': ' + (d3.format(".4g")(d.percent)) + "%  " + d.count + ' artworks')
                            // }
                            //   else {
                            //   return "not recorded"
                            //   }
                          })
                          .attr("x", 0)
                          .attr("y", -6)
                          .attr("class", "tiptextperc")
                            .attr("text-anchor", "middle")
                            .style("fill", "#2d2725")
                            .style("font-size", "17px")
              

  var circles = nodes.append("circle") 
            .attr("r", (d, i)=>{
          	 // console.log(before15grouppercent.percent)
          		return radareadate(d.percent);
          	})
              	.style("opacity", 0.6)
              	.style("fill", (d,i) => { 
          		// return colors(before15grouppercent[i].continentnum);
          console.log(before15grouppercent[i].continentnum);
          console.log(before15grouppercent[i].continentnum == 3);
                    if (before15grouppercent[i].continentnum == 1) {
                      return "lightgreen";
                      // return "#E0D985";
                    } else if (before15grouppercent[i].continentnum == 2) {
                      // return "#5f3606"
                      return "gold";
                    } else if (before15grouppercent[i].continentnum == 3) {
                      return "palegoldenrod";
                      // return "#E0D985";
                    } else if (before15grouppercent[i].continentnum == 4) {
                      return "darkkhaki";
                      // return "#583305"
                    } else if (before15grouppercent[i].continentnum == 5) {
                      return "lightgoldenrodyellow";
                      // return "#583305"
                    } else if (before15grouppercent[i].continentnum == 6) {
                      // return "#563105";
                      return "yellowgreen";
                    } else if (before15grouppercent[i].continentnum == 7) {
                      // return "#ffa14f";
                      return "lightsteelblue";
                    } else if (before15grouppercent[i].continentnum == 8) {
                      // return "#ffd6c9";
                      return "silver";  
                    } else if (before15grouppercent[i].continentnum == 9) {
                      // return "#c5e3f9";
                      return "lightgrey";
                    } else if(before15grouppercent[i].continentnum == 10) {
                      // return "#e0f75d";
                      return "khaki";
                    } else if (before15grouppercent[i].continentnum == 11) {
                      // return "#c9d3d6"
                      return "cornsilk";
                    } else if (before15grouppercent[i].continentnum == 12) {
                      // return "#ffe114"
                      return "tan";
                   } else if (before15grouppercent[i].continentnum == 13) {
                      // return "#c9d3d6"
                      return "darkseagreen";
                    } else if (before15grouppercent[i].continentnum == 14) {
                      // return "#6a3d07"
                       return "gainsboro"; 
                    } 
          	})

      //     	.on("mouseover", function (d, i) {
      //     	  div.transition()
      //             .duration(200)
      //           d3.select(this).style("stroke", "#f742eb").style("stroke-weight", "5").style("stroke-opacity", 1)
      //           // d3.select(this).classed("toolTipHover15", true)
      //             console.log("hover")
      //           var xPosition = parseFloat(d3.select(this).attr("cx"))
      //           var yPosition = parseFloat(d3.select(this).attr("cy"))
                
      //           d3.select("#tooltipcircles15")  //Update the tooltip position and value
      //               .style("left", (xPosition + margin.right*2.1) + "px")
      //               .style("top", (yPosition + margin.right/1.8) + "px")
      //             .transition()
      //               .duration(4000)
      //               .attr("text-anchor", "middle")
      //               .attr("alignment-baseline", "middle")
      //             .select("#valuecircles15")
      //               .text(d.nationality + ' artists: ' + d.count + ' artworks before 2015')
                  
      //           d3.select("#tooltipcircles26").classed("hiddencircle26", false);  //Show the tooltip
      //         })
      //         .on("mouseout", function () {
      //           d3.select(this).style("stroke", "none");
      //           // d3.select(this).style("fill", "");
      // //           d3.select(this).style("fill", (d,i) => { 
      // //     		    return colors(data[i].continentnum);
      // // ///try with holding tooltip until hover over next circle
      // //           // d3.select("#tooltipcircles").classed("hiddencircle", true);
      // //         });
      //   });
          	
//   	 //Add a simple tooltip
  nodes.append("title")
      .data(before15grouppercent)
  	 .text((d)=> {
  		return d.name;
  	 });

  var texts = nodes.append("text")
        	.text((d)=>  {
        	  console.log(d.nationality)
        	 if (d.nationality != "") {
              return (d.nationality)
          }
            else {
            return ("not recorded")
            }
        })
          .style("fill", "white")
          .style("text-anchor", "middle")
          .style("font-size", function (d) {
            // console.log(d.count)
            return radareadate(d.percent) * 0.3 + 2 + "px"
          })
          .attr("translate", "transform(0,10)")
       

//   //Every time the simulation "ticks", this will be called
  force.on("tick", function() {
    /*for lines
  	edges.attr("x1", function(d) { return d.source.x; })
  		 .attr("y1", function(d) { return d.source.y; })
  		 .attr("x2", function(d) { return d.target.x; })
  		 .attr("y2", function(d) { return d.target.y; });
    */
    
    // nodes.attr("x", (before15grouppercent,(d)=> { return d.x; }))
  		//   .attr("y", (before15grouppercent,(d)=> { return d.y; }))


    // circles.attr("cx", (before15grouppercent,(d)=> { return d.x; }))
  		//     .attr("cy", (before15grouppercent,(d)=> { return d.y; }))
  		 

    // texts.attr("x", (before15grouppercent,(d)=> { return d.x; }))
  		// 	.attr("y", (before15grouppercent,(d)=> { 
  		// 	 // console.log(d.count)
  		// 	  return d.y + radareadate(d.percent) * 0.07; }))
  		
    nodes.attr("x", function(d) { return d.x; })
  		  .attr("y", function(d) { return d.y; })


    circles.attr("cx", function(d) { return d.x; })
  		    .attr("cy", function(d) { return d.y; })
  		 

    texts.attr("x", function(d) { return d.x; })
  			.attr("y", function(d) {  
  			 // console.log(d.count)
  			  return d.y + radareadate(d.percent) * 0.07; })
  			  
    // newtooltips.attr("transform", d =>`translate(${d.x}, ${d.y-radareadate(d.percent)/3 -15} )`) 
   newtooltips.attr("transform", d =>`translate(${d.x}, ${d.y-radareadate(d.percent)/3 -15} )`) 

})

let heading15 = g.append('text')  //// append text to global
                .text('1943-2015 - percentages')
                .attr('x', margin.left*1.25)
                .attr('y', margin.bottom/3.6)
                .attr("fill", "#f5fcf7")
                .attr('font-size', '1.15em') 

  
}

  
// ///////////////////========
// // var nodes = [];
// // // console.log(data)
// // for (var i = 0; i<n; i++){
// //     nodes.push(create_nodes(nationalityCount.length,i));
// // }

// // var force = d3.layout.force()
//     // .nodes(nodes)
//     // .size([width, height])
//     // .gravity(.02)
//     // .charge(0)
//     // .on("tick", tick)
//     // .start();

// // var svg = d3.select("body").append("svg")
// //     .attr("width", width)
// //     .attr("height", height);


// // var node = svg.selectAll("circle")
// //     .nationalityCount(nodes)
// //     .enter().append("g").call(force.drag);


// // node.append("circle")
// //     .style("fill", function (d) {
// //     return color(d.cluster);
// //     })
// //     .attr("r", function(d){return d.radius})
    
// // node.append("text")
// //       .attr("dy", ".3em")
// //       .style("text-anchor", "middle")
// //       .text(function(d) { return d.text.substring(0, d.radius / 3); });
      
// // ////////radius or sqroot?
// // console.log(nationalityCount.count)

// // function create_nodes(nationalityCount,node_counter) {
// // //   var i = nationalityCount.indexOf(nationalityCount[node_counter].group),
// //   var i = nationalityCount.length,
// //       r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
// //       d = {
// //         cluster: i,
// //         // radius: nationalityCount[node_counter].size*1.5,
// //          radius: nationalityCount.count[node_counter].size*1.5,
// //         text: nationalityCount[node_counter].text,
// //         x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
// //         y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
// //       };
// //   if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
// //   return d;
// // }



// // function tick(e) {
// //     node.each(cluster(10 * e.alpha * e.alpha))
// //         .each(collide(.5))
// //     .attr("transform", function (d) {
// //         var k = "translate(" + d.x + "," + d.y + ")";
// //         return k;
// //     })

// // }

// // // Move d to be adjacent to the cluster node.
// // function cluster(alpha) {
// //     return function (d) {
// //         var cluster = clusters[d.cluster];
// //         if (cluster === d) return;
// //         var x = d.x - cluster.x,
// //             y = d.y - cluster.y,
// //             l = Math.sqrt(x * x + y * y),
// //             r = d.radius + cluster.radius;
// //         if (l != r) {
// //             l = (l - r) / l * alpha;
// //             d.x -= x *= l;
// //             d.y -= y *= l;
// //             cluster.x += x;
// //             cluster.y += y;
// //         }
// //     };
// // }

// // // Resolves collisions between d and all other circles.
// // function collide(alpha) {
// //     var quadtree = d3.geom.quadtree(nodes);
// //     return function (d) {
// //         // var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
// //         var r = d.radius + maxRadius + Math.max(padding),
// //             nx1 = d.x - r,
// //             nx2 = d.x + r,
// //             ny1 = d.y - r,
// //             ny2 = d.y + r;
// //         quadtree.visit(function (quad, x1, y1, x2, y2) {
// //             if (quad.point && (quad.point !== d)) {
// //                 var x = d.x - quad.point.x,
// //                     y = d.y - quad.point.y,
// //                     l = Math.sqrt(x * x + y * y),
// //                     // r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
// //                     r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster );
// //                 if (l < r) {
// //                     l = (l - r) / l * alpha;
// //                     d.x -= x *= l;
// //                     d.y -= y *= l;
// //                     quad.point.x += x;
// //                     quad.point.y += y;
// //                 }
// //             }
// //             return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
// //         });
// //     };
// // }


// // Array.prototype.contains = function(v) {
// //     for(var i = 0; i < this.length; i++) {
// //         if(this[i] === v) return true;
// //     }
// //     return false;
// // };


 
            
// ///////////=====================   
// ////callout
//     //   let heading = g.append('text')  //// append text to global
//     //                 .text('artworks Brooklyn Museum contemporary collection')
//     //                 .attr('x', 50)
//     //                 .attr('y', 50)
//     //                 .attr('font-size', '100%'); 
                
//     //////THIS Appends text to #svg1 - to the browser    
//         //   let svg1 = data.forEach((d, i) => { ///////
//         //             d3.select('#svg1')
//         //                 // .append('text') ////this writes text in the browser
//         //                 // .text(d.artists)
//         //                 // .text(d.artists.name + '   |   ' + d.artists[0].nationality + ' | ' + d.artists[0].dates + '------ ')
//         //                 // .text(d.artists[0].nationality + ' | ' + '--')
//         //                 // .text(d.artists[0].name + '--')
//         //                 // .text(d.artists[0].id)
//         //                 .attr("x", 30)
//         //                 .attr("y", 30)
//         //                 // .attr('fill', 'red')
//         //                 .attr('font-size', '14px')
//         //                 // console.log(d.artists[0].name + ' | ' + d.artists[0].nationality + ' | ' + d.artists[0].dates) /////works to list each name with nationality
//         //                 // console.log(d.artists[0])  ////works to return array 
//         //                 // console.log(d.artists[0].dates) ////works to return just the info within dates
//         //                 // console.log(d.artists[0].nationality); ////WORKS to return nationality within artist array
//         //                 // console.log(d.length)
//         //         });
             
// //// preprocess the data with array.filter to NOT include empty artists arrays
//                             // const filtered = data.filter((d)=>{
//                             //     return d.artists[0] !== "[]";
//                             // });
//                             // console.log(filtered);

// //////not needed here with exported NationalityCount                     
//                 //  const filtered = data.filter((d)=>{
//                 //         return d.artists[0] //////THIS WORKS TO FILTER
//                 //         })
//                 //         console.log(filtered.length);

                            
   
//             //   	var newData = filtered;  ////arrays that contain artist data
            
// //////not needed here with exported NationalityCount    
//                 // let nested_data = d3.nest()
//                 //         .key(function(newData) { 
//                 //             return newData.artists[0].nationality; 
//                 //         })
//                 //         .entries(newData);
//                 //         console.log(nested_data); //// THIS WORKS TO RETURN NATIONALITY DATA and COUNTS
                    
//       //// map is a very useful method in JavaScript to re-arrange arrays
//                 // it takes a bit to get used to it, but then it’s really helpful for tasks like this
//                 // https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
                
//                 // The new variable nationalityCount is the result of the map method
//                 // I’m applying the map method on the nested_data array
//                 // I can define a arrow function that is applied to every element in the array
//                 // In parentheses I define the parameters (e,i) which are arbitrary, but work like (d,i) in d3
//                 // Every element in the array is replace by what I *return* in the function
//                 // In this case a new object, with the nationality name and the length of the nested array

// //////not needed here with exported NationalityCount 
//                 // var nationalityCount = nested_data.map((e,i) => { 
//                 //     return {nationality: e.key, count: e.values.length};
//                 // });
//                 // // console.log(nationalityCount[0].count)
//                 // // console.log(nationalityCount)  
//                 // console.log(nationalityCount.length);
// /////then sort to order by number
//               // Sort works similar, but the sorting logic is a bit unintuitive
//                 // You have to define to parameters, and a comparison like '>' that returns a boolean
//                 // the ? -1 : 1 is just a very concise ways to write an if else statement
//                 // It’s not necessary to remember this syntax, I look it up, when I need it, too
                
//             // let nationalityCount = data;
//             //     nationalityCount = nationalityCount.sort((a, b) => (a.count > b.count) ? -1 : 1); // This is to sort the array large to small
//             // //   nationalityCount = nationalityCount.sort((a, b) => (a.count > b.count) ? 1 : -1); // small to large

                
//             //   console.log(nationalityCount);   /////returns the count of each group in order      
  

  
//   ////to get max number
//             // let nat = nested_data.map((e,i) => { 
// //             let nat = data.map((e,i) => { 
// //                     // return {count: e.values.length}; /////returns count: value
// //                     return {count: e.count};
// //                 });
// //             console.log(nat);  //////just the counts
               
               
// //               var maxnatctun = nat.map(function (art) {
// //                   return art.count;   ////returns just the values
// //                     });
            
// //             // console.log(maxnatctun);
// //             // d3.max(nat);
            
// //             let maxnatct = maxnatctun.sort((a, b) => (a > b) ? -1 : 1);
            
// //             console.log(maxnatct)
            
// //              let maxnatcount = d3.max(maxnatct);
// //             console.log(maxnatcount);   //////max number
            
            
// //           //////dataset too large for AWS
          
// // /////circles, use square root to get the area 
// //             let radarea = d3.scaleSqrt()    ////to get area of circles need square root 
// //                                 .domain([0, (maxnatcount)])  
// //                                 .range([0, 300]);
// //                             console.log(radarea(maxnatcount))
                            
// // ////// CALCULATE DIAMETER HERE or radius of circle plus radius of circle next to it???
// //circles, use r x 2 to get diameter 
//         // let diameter = d3.radius(d,i) 
//         // var diameter = nationalityCount.map((e,i) => { 
//         //             return {nationality: e.key, count: e.values.radius};
//         //         });                        

// //         let diameter = d3.nest(nationalityCount)
// //                         .key(function(radius) { 
// //                             return (i*(nationalityCount.count)); 
// //                         })
// //                         .entries(nationalityCount);
                        
//             // let diameter = function(d,i)  {   //////for radius use relative area of circles pass sqrt scale function
//             //                 /////TRYING TO RETURN radius x 2 for each number
//             //                     return ("r"(i(d.count)));  ////pass in radius x 2
//             //                 };
//             //                 console.log(diameter)
                
//                 ///////need to get radius of one circle and radius of circle next to it
//                 // let diameter = d3.scaleLinear()  ////HOW TO GET DIAMETER - radius of circle x 2
//                 //                 .domain([0, (maxnatcount)])  
//                 //                 .range([0, 600]);
//                 //             // console.log(diameter)
      
// //             let circles = graph.selectAll("g") ///// selectAll selects every child in the selection
// //                                 .data(nationalityCount)
// //                                 .enter()
// //                                 .append("g")
// // ///////////////HOW TO SELECT JUST ONE FOR NATIONALITY?                                
// //                         //         .on('mouseover', (d) =>  {       ///// get text on hover  
// //   	                    //                   text                         
// //                 			     //   .text(d.nationality + ' - ' + d.count + '------ ')
// //                 			 //    .on('mouseenter', (d,i,j) =>  {       ///// get text on hover 
// //                 			 //    console.log('hover');
// //   	                //                       text                         
// //                 			 //    // .text(d.nationality + ' - ' + d.count + '------ ')
                                   
// //                 				// // d3.select(j[i]).select('text')
// //                 				// // d3.select(j[i])
// //                 				//     .text(d.nationality + ' - ' + d.count + '------ ')
// //                 				//     d3.select(j[i])
// //                     //  			// 	.text((d) => { return d.nationality + ' | ' + d.count + '------ '; })
// // 	                   //            // d3.select('circle')      //////makes hover bar a diff color
// //                     // 				.style('fill', 'blue');
// //                     //             	})
// // ///////////////HOW TO SELECT JUST ONE FOR NATIONALITY?                                 	
// //                             .on('mouseover', function(d) {
// //                     			   text
// //                     			        .text(d.nationality + d.count);
            
// //                     				d3.select(this).select('text')
// //                         				.text((d) => { return d.nationality + ' - ' + d.count + '------ '; });
                        				
// //                         			d3.select(this).select('circle')
// //                         				.style('fill', 'gray');
// //                             	})    	
// //                             	.on('mouseout', function(d) {
// //                             	   // text
// //                             // 	    .text(d.nationality + ' - ' + d.count + '------ ')
// //                             // 	   // .text(d.nationality + ' - ' + d.count + '------ ')
// //                             // // 	    .text(function (d) { 
// //                             		d3.select(this)
// //                             		    .select('text')
// //                                         .remove()
// //                             // 		    .text((d)=> { return ""})
// //                             		  //  .text((d) => { return (d.nationality + ' - ' + d.count + '------ ')
                            		   
// //                             		d3.select(this)
// //                             		    .select('circle')
// //                         				.style('fill', 'none')
// //                         				.select("text").remove()
                        				
// //                         				// .text((d)=> { return "none"})
// //                             	})
                            
// //                 //             	.on('mouseout', function(d) {
// //                 // 		d3.select(this).select('text')
// //                 // 		    .text((d) => { return d.name; })

// //                 // 		d3.select(this).select('rect')
// //             				// .style('fill', 'black');
// //                 //     });
   
   
// //   ////text for circles
// //     let text = graph.append("text")
// //                     .data(nationalityCount)
// //                     .enter()
// //                     .append("g"); /////THIS MAKES IT APPEAR ON THE BROWSER
// //         /////BUT also makes a set of global under the circles not with each circle
// //                     //   .attr("cx", (d, i) => { 
// //                     //                 // return d[1].count/20;
// //                     //                 // return(d.nationality + ' | ' + d.count + '------ ')
// //                     //                 return (i);
// //                     //                 // return (i + 1) + 100;  
// //                     //                 // return (i * 50 + 200);
// //                     //             })
// //                     //   .attr("cy", height/2.5)  /////this is for below the circle or do i do this to area radius?
// //                     //   .text(d.nationality + ' | ' + d.count + '------ ');
// //                     //   .text((d, i) => i)
// //                 //       .text(function (d, i) { 
// //                 //                     return(d.nationality + ' - ' + d.count + '------ ')
// //                 // });                                                                     
 
// //   //////draw circles
// //                 circles.append("circle")
// //                     .attr("cx", (d, i) => { // for horizontal use diameter for spacing circles 
// //                                     // return ((i + (radarea(d.count))*8) + 150);
// //                                     return ((i + (radarea(d.count)*6)));  ///////for SPACING circles
// //                                     // return (i + ("r"(d.count)));  //////space by diameter of circle
// //                                     // d3.radius
// //                                     // return diameter(d.count)*2;   //////?????
// //                          })
// //                     .attr("cy", 300)
// //                     .attr("r", (d, i) => {   //////for radius use relative area of circles pass sqrt scale function
// //                                 return radarea(d.count);  //////for DRAWING this works to return circle area
// //                             })
// //                     .attr("value", (d) => {
// //                         return d.count;
// //                     })
// //                     .text(function(d) {
// //                     return d.key; 
// //                     })
// //                     .attr('fill', 'none')
// //                     .attr('stroke', 'green')
// //                     // .attr('fill', 'orange')
// //                     ;        
             
    
// //         // name label
// //     ///////HOW TO GET THIS TEXT TO READ BY EACH CIRCLE?????
// //     //////ON MOUSEOUT HOW TO GET NO TEXT
// //                     circles.append("text")
// //                             .attr('font-size', "30px")
// //                             .style('fill', 'green')
// //                     //          .attr("cx", (d, i) => { 
// //                     // //                 return (d.count);  /////this gives the count for each 
// //                     // //                 //////but count is probably not correct for the x and y
// //                     //                 return ((i * 8) + 5000);
// //                     //                 // return ((i / 5) );
// //                     //          })
// //                     //         // .attr("cy", (d, i) => { 
// //                     //         // //                 return (d.count);  /////this gives the count for each 
// //                     //         // //                 //////but count is probably not correct for the x and y
// //                     //         //                 return (100);
// //                     //         //      })   
// //                     //         .attr("cy", 5000)
// //                     // 		.text((d) => { 
// //                     // 		    return d.nationality + ' | ' + d.count + '------ ' 
// //                     // 		}
// //                     		.attr("transform", (d, i)=> { 
// //                     // 		 let r = radarea(d.count);
// //                     // 		 let x = (i * 8) + 5000;
// //                     		 let x = (i + (radarea(d.count)*6)); 
// //                     		 let y = 300;
// //                     // 		 return "translate(" + r + ',' + x + ',' + y +')'
// //                     		  return "translate(" + x + ',' + y +')'
// //                                 })
// //                             .text((d) => { 
// //                     		    return d.nationality + ' | ' + d.count + '------ ' 
// //                     		});
// //                     // 		});
// //                     // 		.attr('transform', (d) => { return "translate(" + this.margin.left + "," + this.margin.top + ")"; }); // concatinating strings

// };

// ////===============
 