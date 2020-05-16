// works with indexDCLAcirclegrid2.html
// 		d3.json("alljobtypes2.json").then((data)=>{
//                 svgPlot(data);
//             });


d3.json("data/alljobtypes.json").then((data) => {
    svgPlot1(data);
});

let svgPlot1 = (data) => { ////need to call a different svgPlot 
    console.log(data); ////with each chart for multiple charts
    ////grid
    // const startv = 250; ////vertical
    const startv = 300; ////vertical
    // const rowheight = 70;
    const rowheight = 60;
    // const starth = 320; ////horizontal
    const starth = 380; ////horizontal
    const colwidth = 60;
    // const linevstart = 295;
    const linevstart = 350;

    ////margin
    var margin = { top: 180, right: 10, bottom: 110, left: 170 };
    // var margin.right = 100;
    // 	var width = 1200 - margin.left - margin.right; // Use the window's width 
    // 	var height = 1500 - margin.top - margin.bottom; // Use the window's height   

    var width = starth + colwidth * 7 + margin.right + margin.left;
    var height = startv + rowheight * 22 + margin.bottom;

    let svg = d3.select('#svg2').append('svg')
        .attr("width", width)
        .attr("height", height)
        .style("background", "#877c74")
    

    let g = svg.append('g') ////then append to global g 
    //////this is how to move the chart to the correct position
    // 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    const filtered = data.filter((d) => {
        return d.dat //////to filter
    })
    // console.log(filtered.length);
    // console.log(filtered);


    var newData = filtered; ////arrays that contain artist data

    let nested_data = d3.nest()
        .key(function (newData) {
            return newData.dat;
        })
        .entries(newData);
    //         console.log(nested_data);

    ////return just the data and numbers                
    var dclajobtypes = nested_data.map((e, i) => {
        return { jobtype: e.values[0].jobtype, dat: e.key }
    });
    //             console.log(dclajobtypes)
    // console.log(dclajobtypes.length)
    // console.log(dclajobtypes[0].dat)


    /////js string split() method to return a string into an array of substrings
    var dclajob = dclajobtypes.map((e, i) => {
        // console.log(e)
        return { dat: e.dat.split(",") } // Here is the split method
    });
    // console.log(dclajob)
    // console.log(dclajob.length)
    //             console.log(data)

    //////////for the separate numbers in the arrays - double for loop 
    let datacircles = [];

    for (let i = 0; i < data.length; i++) {
        let childdat = data[i].dat;
        for (let j = 0; j < childdat.length; j++) {
            //   console.log(childdat[j]);   /////returns the separate numbers in each of the arrays
            datacircles.push(childdat[j]);
        }
    }
    // console.log(datacircles)

    /////=====heading
    let heading = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('NYC DCLA Grantees')
        .attr('x', margin.left / 15)
        .attr('y', margin.top / 2.6)
        .style('font-size', '1.8em');

    let subheading = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('NYC Museum Staff')
        .attr('x', margin.left / 15)
        .attr('y', margin.top / 1.4)
        .style('font-size', '1.8em');

    let subheading2 = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('at museums with budgets $999,999+')
        .attr('x', margin.left / 15)
        .attr('y', margin.top/1.07)
        .style('font-size', '0.8em');

    let subheading3 = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('paid staff + board members: 7,346 people')
        .attr('x', margin.left / 15)
        .attr('y', margin.top*1.1 )
        .style('font-size', '0.68em');

    let endnote = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('Data: New York City Department of Cultural Affairs (NYC DCLA)')
        .attr('x', margin.left / 15)
        .attr('y', height - margin.bottom / 1.2)
        .style('font-size', '0.5em');

    let endnote2 = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('8,094 staff at museums; 7,647 are at museums with budgets $999,999+, Board volunteers + 6,768 non-volunteer staff totals 7,346')
        .attr('x', margin.left / 15)
        .attr('y', height - margin.bottom / 1.7)
        .style('font-size', '0.47em');

    let endnote3 = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('Schonfeld, Roger, Sweeney, Liam. Diversity Survey of the NYC DCLA Grantees, 2015. Ann Arbor, MI: Inter-university Consortium')
        .attr('x', margin.left / 15)
        .attr('y', height - margin.bottom / 2.9)
        .style('font-size', '0.47em');

    let endnote4 = g.append('g') //// append text to global
        .append('text')
        .attr("class", "textpink")
        .text('for Political and Social Research [distributor], 2017-01-10. https://doi.org/10.3886/ICPSR36606.v2')
        .attr('x', margin.left / 15)
        .attr('y', height - margin.bottom / 8.8)
        .style('font-size', '0.47em');

    ////====horizontal lines
    let linesh = svg.append('g')
    linesh.selectAll('line')
        .data(data)
        .enter()
        .append('line')
        .attr("class", "linegrid")
        .attr('x1', linevstart)
        .attr('x2', linevstart + colwidth * 7)
        .attr('y1', (d, i) => {
            return i * rowheight + startv;
        })
        .attr('y2', (d, i) => {
            return i * rowheight + startv;
        })
        .attr('stroke', 'pink')
        .attr('stroke.width', 1)
    // console.log(data)

    ////====vertical lines
    let linesv = svg.append('g')
    linesv.selectAll('line')
        .data(data[0].dat)
        .enter()
        .append('line')
        .attr("class", "linegrid")
        .attr('x1', (d, i) => {
            // return starth+i*colwidth;
            return starth + i * colwidth;
            // return starth+i+colwidth; /////cool receeding grid
        })
        .attr('x2', (d, i) => {
            return starth + i * colwidth;
        })
        .attr('y1', startv - 25)
        .attr('y2', height - margin.bottom * 1.5)
        .style('stroke', 'pink')
        .style('stroke-width', 0.7);


    ////====jobtype labels
    let jobtype = svg.append('g')
    jobtype.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr("class", "textpink")
        .text((d, i) => { return d.jobtype })
        .attr('x', starth / 1.11)
        .attr('y', (d, i) => {
            return i * rowheight + startv + 5;
        })
        .attr('transform', (d, i) => {
            //   let a = 55;
            let x = 0;
            let y = i * rowheight + startv + x
        })
        .style('font-size', '64%')
        .style("text-anchor", "end");


    //////////for labels 
    let datalabels = ["American Indian or Alaskan Native & Native Hawaiian or Pacific Islander", "Asian", "Black or African American", "Hispanic", "Two Or More Races", "White", "Declined to State"]


    let raceethlable = svg.append('g')
    raceethlable.selectAll('text')
        .data(datalabels)
        .enter()
        .append('text')
        .attr("class", "textpink")
        .text((d) => { return d })
        .attr('y', startv - 30)
        .attr('x', (d, i) => {
            return i * colwidth + starth;
        })
        .attr('transform', (d, i) => {
            let a = -20;
            let x = i * colwidth + starth;
            let y = startv - 25;
            return `rotate(${a}, ${x}, ${y})`;
        })
        .style('font-size', '55%');
    // console.log(data)

    // /////circles, use square root to get the area 
    let radarea = d3.scaleSqrt() ////to get area of circles need square root 
        .domain([0, (636)])
        .range([0, 55]);
    // console.log(radarea(636))

    ///////wrap the circles into rows
    // https://stackoverflow.com/questions/27105991/how-to-uniformly-distribute-svg-circles-in-d3

    let circles = svg.append("g") ///// selectAll selects every child in the selection
    circles.selectAll("circles")
        .data(datacircles, (d, i) => {
            return d, i;
        })
        .enter()
        .append("g")
        .attr("class", "circlepink")
        .attr('x', (d, i) => { // for horizontal use diameter for spacing circles 
            return (i % 7) * colwidth + starth; //// MOVE TO NEXT ROW
        })
        .attr('y', (d, i) => {
            return (startv + rowheight * parseInt(i / 7));
        })

        .append("circle")
        .attr("cx", (d, i) => { // for horizontal use diameter for spacing circles 
            return (i % 7) * colwidth + starth;
        })

        .attr("cy", (d, i) => {
            return (startv + rowheight * parseInt(i / 7)); ///vertical

        })
        .attr("r", (d, i) => {
            return radarea(d); ////returns circle area

        })
        .style('fill', '#fdd2f5')
        .on('mouseenter', (d, i, j) => {
            console.log('hover');
            // console.log(d);
            subheading.text(d + ' people');
            d3.select(j[i])
                .style('fill', 'purple')
                .style('opacity', '0.6');
        })
        .on('mouseout', (d, i, j) => {
            // console.log(d);
            subheading.text((d) => { return "NYC Museum Staff"; });
            d3.select(j[i])
                .style('fill', '#fdd2f5')
                .style('opacity', '0.9');
        });
};




// // works with indexDCLAcirclegrid2.html
// // 		d3.json("alljobtypes2.json").then((data)=>{
// //                 svgPlot(data);
// //             });


// d3.json("alljobtypes.json").then((data) => {
//     svgPlot(data);
// });
// let svgPlot = (data) => { ////need to call a different svgPlot 
//     console.log(data); ////with each chart for multiple charts
//     ////grid
//     const startv = 250; ////vertical
//     const rowheight = 70;
//     const starth = 320; ////horizontal
//     const colwidth = 60;
//     const linevstart = 295;

//     ////margin
//     var margin = { top: 120, right: 70, bottom: 110, left: 120 };
//     // var margin.right = 100;
//     // 	var width = 1200 - margin.left - margin.right; // Use the window's width 
//     // 	var height = 1500 - margin.top - margin.bottom; // Use the window's height   

//     var width = starth + colwidth * 7 + margin.right + margin.left;
//     var height = startv + rowheight * 22 + margin.bottom;

//     var svg = d3.select('#svg1').append('svg')
//         .attr("width", width)
//         .attr("height", height)

//     var g = svg.append('g') ////then append to global g 
//     //////this is how to move the chart to the correct position
//     // 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//     const filtered = data.filter((d) => {
//         return d.dat //////to filter
//     })
//     console.log(filtered.length);
//     console.log(filtered);


//     var newData = filtered; ////arrays that contain artist data

//     let nested_data = d3.nest()
//         .key(function (newData) {
//             return newData.dat;
//         })
//         .entries(newData);
//     //         console.log(nested_data);

//     ////return just the data and numbers                
//     var dclajobtypes = nested_data.map((e, i) => {
//         return { jobtype: e.values[0].jobtype, dat: e.key }
//     });
//     //             console.log(dclajobtypes)
//     console.log(dclajobtypes.length)
//     // console.log(dclajobtypes[0].dat)


//     /////js string split() method to return a string into an array of substrings
//     var dclajob = dclajobtypes.map((e, i) => {
//         // console.log(e)
//         return { dat: e.dat.split(",") } // Here is the split method
//     });
//     // console.log(dclajob)
//     console.log(dclajob.length)
//     //             console.log(data)

//     //////////for the separate numbers in the arrays - double for loop 
//     let datacircles = [];

//     for (let i = 0; i < data.length; i++) {
//         let childdat = data[i].dat;
//         for (let j = 0; j < childdat.length; j++) {
//             //   console.log(childdat[j]);   /////returns the separate numbers in each of the arrays
//             datacircles.push(childdat[j]);
//         }
//     }
//     console.log(datacircles)

//     /////=====heading
//     let heading = g.append('g') //// append text to global
//         .append('text')
//         .text('NYC DCLA Grantees')
//         .attr('x', margin.left / 15)
//         .attr('y', margin.top / 2.2)
//         .style('font-size', '2em');

//     let subheading = g.append('g') //// append text to global
//         .append('text')
//         .text('NYC Museum Staff')
//         .attr('x', margin.left / 15)
//         .attr('y', margin.top / 1.1)
//         .style('font-size', '2em');

//     let subheading2 = g.append('g') //// append text to global
//         .append('text')
//         .text('at museums with budgets $999,999+')
//         .attr('x', margin.left / 15)
//         .attr('y', margin.top * 1.2)
//         .style('font-size', '1em');

//     let subheading3 = g.append('g') //// append text to global
//         .append('text')
//         .text('paid staff + board members: 7,346 people')
//         .attr('x', margin.left / 15)
//         .attr('y', margin.top * 1.4)
//         .style('font-size', '0.675em');

//     let endnote = g.append('g') //// append text to global
//         .append('text')
//         .text('Data: New York City Department of Cultural Affairs (NYC DCLA)')
//         .attr('x', margin.left / 15)
//         .attr('y', height - margin.bottom / 1.2)
//         .style('font-size', '0.675em');

//     let endnote2 = g.append('g') //// append text to global
//         .append('text')
//         .text('8,094 staff at museums; 7,647 are at museums with budgets $999,999+, Board volunteers + 6,768 non-volunteer staff totals 7,346')
//         .attr('x', margin.left / 15)
//         .attr('y', height - margin.bottom / 1.7)
//         .style('font-size', '0.675em');

//     let endnote3 = g.append('g') //// append text to global
//         .append('text')
//         .text('Schonfeld, Roger, Sweeney, Liam. Diversity Survey of the NYC DCLA Grantees, 2015. Ann Arbor, MI: Inter-university Consortium')
//         .attr('x', margin.left / 15)
//         .attr('y', height - margin.bottom / 2.9)
//         .style('font-size', '0.675em');

//     let endnote4 = g.append('g') //// append text to global
//         .append('text')
//         .text('for Political and Social Research [distributor], 2017-01-10. https://doi.org/10.3886/ICPSR36606.v2')
//         .attr('x', margin.left / 15)
//         .attr('y', height - margin.bottom / 8)
//         .style('font-size', '0.675em');

//     ////====horizontal lines
//     let linesh = svg.append('g')
//     linesh.selectAll('line')
//         .data(data)
//         .enter()
//         .append('line')
//         .attr('x1', linevstart)
//         .attr('x2', linevstart + colwidth * 7)
//         .attr('y1', (d, i) => {
//             return i * rowheight + startv;
//         })
//         .attr('y2', (d, i) => {
//             return i * rowheight + startv;
//         })
//         .attr('stroke', 'pink')
//         .attr('stroke.width', 1)
//     console.log(data)

//     ////====vertical lines
//     let linesv = svg.append('g')
//     linesv.selectAll('line')
//         .data(data[0].dat)
//         .enter()
//         .append('line')
//         .attr("class", "line")
//         .attr('x1', (d, i) => {
//             // return starth+i*colwidth;
//             return starth + i * colwidth;
//             // return starth+i+colwidth; /////cool receeding grid
//         })
//         .attr('x2', (d, i) => {
//             return starth + i * colwidth;
//         })
//         .attr('y1', startv - 25)
//         .attr('y2', height - margin.bottom * 1.5)
//         .style('stroke', 'pink')
//         .style('stroke-width', 0.7);


//     ////====jobtype labels
//     let jobtype = svg.append('g')
//     jobtype.selectAll('text')
//         .data(data)
//         .enter()
//         .append('text')
//         .text((d, i) => { return d.jobtype })
//         .attr('x', starth / 1.11)
//         .attr('y', (d, i) => {
//             return i * rowheight + startv + 5;
//         })
//         .attr('transform', (d, i) => {
//             //   let a = 55;
//             let x = 0;
//             let y = i * rowheight + startv + x
//         })
//         .style('font-size', '81%')
//         .style("text-anchor", "end");


//     //////////for labels 
//     let datalabels = ["American Indian or Alaskan Native & Native Hawaiian or Pacific Islander", "Asian", "Black or African American", "Hispanic", "Two Or More Races", "White", "Declined to State"]


//     let raceethlable = svg.append('g')
//     raceethlable.selectAll('text')
//         .data(datalabels)
//         .enter()
//         .append('text')
//         .text((d) => { return d })
//         .attr('y', startv - 30)
//         .attr('x', (d, i) => {
//             return i * colwidth + starth;
//         })
//         .attr('transform', (d, i) => {
//             let a = -20;
//             let x = i * colwidth + starth;
//             let y = startv - 25;
//             return `rotate(${a}, ${x}, ${y})`;
//         })
//         .style('font-size', '80%');
//     // console.log(data)

//     // /////circles, use square root to get the area 
//     let radarea = d3.scaleSqrt() ////to get area of circles need square root 
//         .domain([0, (636)])
//         .range([0, 55]);
//     console.log(radarea(636))

//     ///////wrap the circles into rows
//     // https://stackoverflow.com/questions/27105991/how-to-uniformly-distribute-svg-circles-in-d3

//     let circles = svg.append("g") ///// selectAll selects every child in the selection
//     circles.selectAll("circles")
//         .data(datacircles, (d, i) => {
//             return d, i;
//         })
//         .enter()
//         .append("g")
//         .attr("class", "circle")
//         .attr('x', (d, i) => { // for horizontal use diameter for spacing circles 
//             return (i % 7) * colwidth + starth; //// MOVE TO NEXT ROW
//         })
//         .attr('y', (d, i) => {
//             return (startv + rowheight * parseInt(i / 7));
//         })

//         .append("circle")
//         .attr("cx", (d, i) => { // for horizontal use diameter for spacing circles 
//             return (i % 7) * colwidth + starth;
//         })

//         .attr("cy", (d, i) => {
//             return (startv + rowheight * parseInt(i / 7)); ///vertical

//         })
//         .attr("r", (d, i) => {
//             return radarea(d); ////returns circle area

//         })
//         .style('fill', '#fdd2f5')
//         .on('mouseenter', (d, i, j) => {
//             console.log('hover');
//             console.log(d);
//             subheading.text(d + ' people');
//             d3.select(j[i])
//                 .style('fill', 'purple')
//                 .style('opacity', '0.6');
//         })
//         .on('mouseout', (d, i, j) => {
//             console.log(d);
//             subheading.text((d) => { return "NYC Museum Staff"; });
//             d3.select(j[i])
//                 .style('fill', '#fdd2f5')
//                 .style('opacity', '0.9');
//         });
// };
