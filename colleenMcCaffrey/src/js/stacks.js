  //Margin conventions
 //Loads the data

 const clusterNum = 3;
 // const cats = ["cluster", "donors", "raised", "shares", "goal"]
 
     
 //  d3.csv("data/gfm-900.csv", ready);
 d3.csv("data/test-med-15.csv", ready);
 
   
   function ready(err, data) {
     if (err) throw "error loading data";
     //FORMAT data
     data.forEach(function(d) {
       d.cluster = group(+d.cluster)
       d.donors = +d.donors
       d.shares = +d.shares
       d.engagement = +d.engagement
       d.success = +d.success
       d.raised = +d.raised
       d.goal = +d.goal
    //    d.theme = getTheme(d.cluster)
        // console.log("check cluster" + d.cluster);
     })
    function group(cluster) {
        var group;
        if (cluster == 0 || cluster == 7 || cluster == 8  ) {
            // console.log("cluster" + cluster);
            group = 1;
            return group;
        } if (cluster == 1 || cluster == 4 || cluster == 6 || cluster == 9 ) {
            group = 2;
            return group;
        } else {
            group = 3;
        return group;
        }

    }

     for (var i = 1; i <=clusterNum; i++) {
        var cleanData = data.filter(function(d) { 
            return d.cluster == i;
          })
         draw("#g2"  + i + "-chart", "success", i, cleanData);
         // draw("#g1" + i + "-chart", "engagement", i, cleanData );
         // draw("#g3" + i + "-chart", "shares", i, cleanData);
         //  draw("#g4" + i + "-chart", "Cluster", i, cleanData);
     }
     
     
 function draw(selector, col, clust, data){
     console.log(" draw i " + clust);
     
     
   var margin = {top: 0, right: 0, bottom: 30, left: 5};
 
     console.log(selector);
   var constWidth = d3.select(selector).node().clientWidth;
   
   var width = constWidth - margin.left - margin.right,
       height = 175 - margin.top - margin.bottom;
 
   
   //Appends the svg to the chart-container div
   var svg = d3.select(selector).append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
   var div = d3.select(selector).append("div")   
         .attr("class", "tooltip")               
         .style("opacity", 0);   
   
   //Creates the xScale 
   var xScale = d3.scaleTime()
     .range([0, width]);
   
   //Creates the yScale
   var yScale = d3.scaleLinear()
     .range([height, 0]);  
   
   //Defines the y axis styles`
   var xAxis = d3.axisBottom()
     .scale(xScale)
     // .tickPadding(5)
     .ticks(5)
     // .tickValues( xAxis.ticks( 5 ).concat( xAxis.domain() )
     // .tickFormat(function(d) { return xscale + "%"}) 
     .tickFormat(d => (d * 1) + "%")
   
 //     d3.csv("data/gfm-900.csv", ready);
   
 //   function ready(err, data) {
 //     if (err) throw "error loading data";
 //     //FORMAT data
 //     data.filter(function(d){ 
 //         return d.cluster = clusterNum })
     
     
     //Organizes the data  
     var maxX = d3.max(data, function(d) { return d[col]; });
     //Defines the xScale max
     xScale.domain([0, 150]);
   
     //Defines the yScale max
     yScale.domain([0, 175]);  
   
     //Appends the x axis    
     var xAxisGroup = svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(5," + height +  ")")
       .call(xAxis);  
 
     //Binds data to strips
     var drawstrips = svg.selectAll("line.percent")
       .data(data)
       .enter()
       .append("line")
       .attr("class", "percentline")
       .attr("x1", function(d, i) {
           return xScale(d[col]); }) 
       .attr("x2", function(d) { 
           return xScale(d[col]); })  
       .attr("y1", 50)
       .attr("y2", 125)
       .style("stroke", function(d) {
         //sets stroke depending on mean of cluster - will need to reset for theme
         var aves =[];
        //  if (d[col] == "success") {
           aves = [43, 40, 39];
        //  } else {
        //    aves =[21, 21, 18, 17, 17];
        //  }
         var j = aves[d.cluster - 1];
         // var j = maxX/3;
         if (d[col] <= j) {
             return '#c994c7';
         } else if (d[col] > j && d[col] <= 100) {
             return '#df65b0';
         } else {
             return '#980043';
         }
        // "#cc0000");
       })
       .style("stroke-width", 3)
       .style("opacity", 0.2)
       .on("mouseover", function(d) {
         var right = d3.event.pageX > window.innerWidth / 2;
   
         d3.select(this)
           .transition().duration(100)
           .attr("y1", 0)
           .style("stroke-width", 4)
           .style("opacity", 1);
   
         div.transition(300)
           .style("opacity", 1)
         div.html('<p class="small">' + d.cluster + d.title + ' </p><p>' + d[col] + '% ' + col);
         
         //   var offset = top ? div.node().offsetHeight + 1 : -1;
         var offset = this.y;
 
         div
           .style("left", (d3.event.pageX - 175) + "px")
 
           .style("margin-top", (height-350) + "px")  
           // console.log(y);
         // .style("top", (height - 80) + "px")    
       })
       
       //on click to show campaign details
       .on("click", function(d, i){
           var topY = d3.event.pageY;
        //    var detailsPadding = topY - 100 +  "px";
        detailsPadding = 0 + "px";
           console.log("padding" + detailsPadding);
           var detailsBox = d3.select("#details")
               console.log(d);
               // .style("top", detailsPadding + "px")
               detailsBox.html('<div style="top:' + detailsPadding + '; position:absolute; margin-right: 10%; max-width:250px; padding: 1rem;"> <h4><a target=_blank" href="' + d.url + '">' + d.title + '</a></h4><p class="small">Engagement Rate: ' + d.engagement + '%</p><p class="small">Success Rate: ' + d.success + '%</p><p class="small">Amount Raised: $' + d.raised + '</p><p class="small">Campaign Goal: $' + d.goal + '</p><p class="story-scroll">' + d.story + '</p><p class="small"><em> data last updated 4/28/2019, <a href="'+ d.url + '"> see campaign update</a></em></p></div> ');
           console.log(d.cluster);
 
       })
 
       .on("mouseout", function(d) {
         d3.select(this)
           .transition().duration(100)
           .attr("y1", 50)
           .style("stroke-width", 3)
           .style("opacity", 0.2);
   
         div.transition(300)
           .style("opacity", 0)  
       })       
   
   //RESPONSIVENESS
     d3.select(window).on("resize", resized);
   
     function resized() {
   
       //new margin
       var newMargin = {top: 0, right: 0, bottom: 30, left: 5};
   
       var newconstWidth = d3.select(selector).node().clientWidth;
       var newWidth = newconstWidth - newMargin.left - newMargin.right;
   
       //Change the width of the svg
       d3.select("svg")
         .attr("width", newWidth + newMargin.left + newMargin.right)
   
       //Change the xScale
       xScale
         .range([0, newWidth]); 
   
       //Updates xAxis
       d3.selectAll(".x.axis")
            .call(xAxis);     
   
       //Updates ticks
       xAxis
         .scale(xScale);  
   
       drawstrips 
         .attr("x1", function(d,i) { return xScale(d[col]); }) 
         .attr("x2", function(d) { return xScale(d[col]); })  
         
       //Updates xAxis
       d3.selectAll(".x.axis")
            .call(xAxis);     
     }
   }
 }