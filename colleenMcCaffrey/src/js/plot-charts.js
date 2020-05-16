
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 600 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#plots-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // Initialize the X axis
    var x = d3.scaleLinear()
    .range([ 0, width ]);
    var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    var y = d3.scaleBand()
    .range([height, 0])
    .padding(1);
    var yAxis = svg.append("g")
    .attr("class", "myYaxis")
    // A function that create / update the plot for a given variable:


   

 function update(var1, var2, varA, var3, pre) {

 
    // Parse the Data
    d3.csv("data/med-15-averages-edited.csv", function(data) {
    //   d3.csv("data/group-averages-edited.csv", function(data) {

        // data.forEach(function(d) {
        //     d.cluster = group(+d.cluster)
        // })

        // function group(cluster) {
        //     var group;
        //     if (cluster == 0 || cluster == 7 || cluster == 8  ) {
        //         // console.log("cluster" + cluster);
        //         group = 1;
        //         return group;
        //     } if (cluster == 1 || cluster == 4 || cluster == 6 || cluster == 9 ) {
        //         group = 2;
        //         return group;
        //     } else {
        //         group = 3;
        //     return group;
        //     }

        // }


        // / X axis
        var min = d3.min(data, function(d) { return +d[var1] });

        x.domain([0, d3.max(data, function(d) { return +d[var1]}) * 2.5 - min * 2.5 ]);
        // x.domain([0, d3.max(data, function(d) { return +d[var1] * 1.5 }) ]);
        // x.domain([0, 200]);
        // x.domain(data.map(function(d) { return d.group; }))
        xAxis.transition().duration(1000).call(d3.axisBottom(x))

        // svg.selectAll(".xLabel")  
    //    svg.append("text")  
    //     .attr("class", "xLabel")           
    //     .attr("transform",
    //           "translate(" + (width/2) + " ," + 
    //                          (height + margin.top + 20) + ")")
    //     .style("text-anchor", "middle")
    //     .text(var2);

    //     svg.selectAll(".xLabel").exit().remove();
        // update lines

        // Add Y axis
        // y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
        y.domain(data.map(function(d) { return +d.cluster; }))
        yAxis.transition().duration(1000).call(d3.axisLeft(y));


        // text label for the y axis
          var plots = d3.select("#plots-chart").select("svg");
            
          plots
            //.enter()
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "yLabel")
            .text("Group"); 
            

    //     // Add X axis
    //   var x = d3.scaleLinear()
    //     // .domain([-1, 6])
    //     .domain([0,200])
    //     .range([ 0, width]);
    //     svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x))

    //     // Y axis
    //     var y = d3.scaleBand()
    //     .range([ 0, height ])
    //     .domain(data.map(function(d) { return d.cluster; }))
    //     .padding(1);
    //     svg.append("g")
    //     .call(d3.axisLeft(y))

        // variable u: map data to existing circle
        var j = svg.selectAll(".myLine")
        .data(data)
        // update lines
        j
        .enter()
        .append("line")
        .attr("class", "myLine")
        .merge(j)
        .transition()
        .duration(1000)
            // .attr("x1", function(d) { console.log(x(d[selectedd[var1]])) ; return x(d[selectedd[var1]]); })
            // .attr("x2", function(d) { return x(d[selectedd[var1]]); })
            // .attr("y1", y(0))
            // .attr("y2", function(d) { return y(d.cluster); })
            // .attr("stroke", "grey")
        .attr("x1", x(0))
        .attr("x2", function(d) { return x(d[var1]); })
        .attr("y1", function(d) { return y(d.cluster); })
        .attr("y2", function(d) { return y(d.cluster); })
        .attr("stroke", "grey")
        .attr("stroke-width", "1px")
        
        var xL = svg.selectAll(".xLabel")
        .data(data)
        // update lines
        xL
        .enter()
        .append("text")
        .attr("class", "xLabel")
        .merge(xL)
        //   .duration(1000)
            // .attr("x1", function(d) { console.log(x(d[selectedd[var1]])) ; return x(d[selectedd[var1]]); })
            // .attr("x2", function(d) { return x(d[selectedd[var1]]); })
            // .attr("y1", y(0))
            // .attr("y2", function(d) { return y(d.cluster); })
            // .attr("stroke", "grey")
        //   .attr("x1", x(0))
        //   .attr("x2", function(d) { return x(d[var1]); })
        //   .attr("y1", function(d) { return y(d.cluster); })
        //   .attr("y2", function(d) { return y(d.cluster); })
        //   .attr("stroke", "grey")
        //   .attr("stroke-width", "1px")
        //   svg.append("text")  
        //   .attr("class", "xLabel")           
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(var2);
    
        //   svg.selectAll(".xLabel").exit().remove()

        var plotInfo = d3.select(".plot-information")
        .data(data)
        // update lines
        plotInfo
        .enter()
        .append("text")
        .attr("class", "plot-information")
        .merge(plotInfo)
        .transition()
        .duration(1000)
            // .attr("x1", function(d) { console.log(x(d[selectedd[var1]])) ; return x(d[selectedd[var1]]); })
            // .attr("x2", function(d) { return x(d[selectedd[var1]]); })
            // .attr("y1", y(0))
            // .attr("y2", function(d) { return y(d.cluster); })
            // .attr("stroke", "grey")
        //   .attr("x1", x(0))
        //   .attr("x2", function(d) { return x(d[var1]); })
        //   .attr("y1", function(d) { return y(d.cluster); })
        //   .attr("y2", function(d) { return y(d.cluster); })
        //   .attr("stroke", "grey")
        //   .attr("stroke-width", "1px")
        //   svg.append("text")  
        //   .attr("class", "xLabel")           
        .text(var3);

        // variable u: map data to existing circle
        var bL = svg.selectAll(".circle-label")
        .data(data)
        // update bars
        bL
        .enter()
        .append("text")
        .attr("class", "circle-label")
        .merge(bL)
        .transition()
        .duration(1000)

        //     .attr("cx", function(d) { return x(d[selectedd[var1]]); })
        //     .attr("cy", function(d) { return y(d.cluster); })
        //     .attr("r", 8)
        //     .attr("fill", "#69b3a2");


            // Circles of variable 1
            // .enter()
            // .append("circle")
                .text(function(d) {
                    return pre + d[var1];
                })
                .attr("x", function(d) { return x(d[var1] * 1.1); })
                .attr("y", function(d) { return y(d.cluster); })
                .style("font-size", 12)
                .style("color", function(d) {
                    // var colorsArr = ['#c994c7','#fdbb84','#fc8d59','#ef6548','#f7f4f9','#df65b0','#e7298a','#ce1256','#980043','#67001f'];
                    var colorsArr = ["pink", "hotpink", "orange", "violet",'#ce1256','#980043','#67001f','#ef6548', '#980043', "#fc8d59"];
            
                    console.log(d.cluster);
                    return colorsArr[d.cluster];
                })

        var v = svg.selectAll(".averageLine")
            .data(data)
            // update bars
            v
            .enter()
            .append("line")
            .attr("class", "averageLine")
            .merge(v)
            .transition()
            .duration(1000)
            .attr("x1", x(varA))
            .attr("x2", x(varA))
            .attr("y1", y(0)+ 70)
            .attr("y2", y(10))
            .attr("stroke", "#cdcdcd")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", 2)

            var u = svg.selectAll(".circle-nodes")
                .data(data)
            // update bars
            u
                .enter()
                .append("circle")
                .attr("class", "circle-nodes")
                .merge(u)
                .transition()
                .duration(1000)
            //     .attr("cx", function(d) { return x(d[selectedd[var1]]); })
            //     .attr("cy", function(d) { return y(d.cluster); })
            //     .attr("r", 8)
            //     .attr("fill", "#69b3a2");
        
        
                    // Circles of variable 1
                // .enter()
                // .append("circle")
                    .attr("cx", function(d) { return x(d[var1]); })
                    .attr("cy", function(d) { return y(d.cluster); })
                    .attr("r", "6")
                    .style("fill", function(d) {
                        // var colorsArr = ['#c994c7','#fdbb84','#fc8d59','#ef6548','#f7f4f9','#df65b0','#e7298a','#ce1256','#980043','#67001f'];
                        var colorsArr = ["pink", "hotpink", "orange", "violet",'#ce1256','#980043','#67001f','#ef6548', '#980043', "#fc8d59"];
           
                        // console.log(d.cluster);
                        return colorsArr[d.cluster];
                    })


    // // Circles of variable 2
    //         var z = svg.selectAll("circle")
    //         .data(data)
    //         // update bars
    //         z
    //         .enter()
    //         .append("circle")
    //         .merge(z)
    //         .transition()
    //         .duration(1000)

    //         // .enter()
    //         // .append("circle")
    //             .attr("cx", function(d) { return x(d[var1]); })
    //             .attr("cy", function(d) { return y(d.cluster); })
    //             .attr("r", "6")
    //             .style("fill", "#4C4082")
            })

    }

    // Initialize plot
update('raised_mean','average across all groups $5,449','5449','The average amount raised per campaign is $5,449. The campaigns that raised the most had top terms: cancer, treatment, surgery, work, expenses','$');

// run function on scroll position
// window.addEventListener("scroll", function () {
//     var offsets = document.getElementById('plots').getBoundingClientRect();
//     var top = offsets.top;
//     if (top < 850) {
//         return update('raised_mean','average across all groups $5,449','5449','The average amount raised per campaign is $5,449. The campaigns that raised the most had top terms: cancer, treatment, surgery, work, expenses','$');
//     }
// });