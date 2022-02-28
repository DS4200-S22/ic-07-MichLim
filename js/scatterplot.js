/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg2 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

  d3.csv("/data/scatter.csv").then((data) => {

    // Sets maxY2 to the max y value in the y-axis
    let maxY2 = d3.max(data, function(d) { return d.score; });  
    // Sets yScale2 from 0 to the maxY2 value previously determined.
    let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]);
  
    // Sets maxX2 to the max x value in the x-axis
    let maxX2 = d3.max(data, function(d) { return d.day; });
  
    // Sets xScale1 x-axis to be based on the data1
    let xScale2 = d3.scaleLinear()
        .domain([0,maxX2])
        .range([margin.left, width - margin.right]); 
  
    // Plot the points
    svg2.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
          .attr("cx", (d) => xScale3(d.day))
          .attr("cy", (d) => yScale3(d.score))
          .attr("r", 10)
          .attr("fill", "orange")
          .attr("class", "SimpleScatter")
           .on("mouseover", mouseover3) 
           .on("mousemove", mousemove3)
           .on("mouseleave", mouseleave3);
  
        // Add x axis to svg2
      svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale2))
          .attr("font-size", '20px');
  
      // Add y axis to svg2
      svg2.append("g")
       .attr("transform", `translate(${margin.left}, 0)`) 
       .call(d3.axisLeft(yScale2))
        .attr("font-size", '20px');
  
  });

  // TOOLTIP

// Creates a div for the tooltip
const tooltip2 = d3.select("#csv-scatter") 
    .append("div") 
    .attr('id', "tooltip2") 
    .style("opacity", 0) 
    .attr("class", "tooltip");

// Display name of the bar and score  
const mouseover3 = function(event, d) {
    tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
}

const mousemove3 = function(event, d) {
    tooltip2.style("left", (event.x)+"px") 
    .style("top", (event.y + yTooltipOffset) +"px"); 
}

// When the mouse leaves make the tooltip opacity 0
const mouseleave3 = function(event, d) { 
    tooltip2.style("opacity", 0); 
}



