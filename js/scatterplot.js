/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

d3.csv("data/scatter.csv").then(function(data) {

    // Add an svg to csv-scatter div  
    let svg3 = d3
      .select("#csv-scatter")
      .append("svg")
      .attr("width", width-margin.left-margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);
  
    //Axes 
  
    // Find max y value to plot  
    let maxY3 = d3.max(data, function(d) { return d.score; });
  
    // Create y scale   
    let yScale3 = d3.scaleLinear()
                .domain([0,maxY3])
                .range([height-margin.bottom,margin.top]); 
  
    // Find max x value to plot  
    let maxX3 = d3.max(data, function(d) { return d.day; });
  
    // Create x scale
    let xScale3 = d3.scaleLinear()
                .domain([0,maxX3])
                .range([margin.left,width-margin.right]);
  
    // Add y axis to webpage 
    svg3.append("g")
       .attr("transform", `translate(${margin.left}, 0)`) 
       .call(d3.axisLeft(yScale3)) 
       .attr("font-size", '20px'); 
  
    // Add x axis to webpage  
    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale3))   
        .attr("font-size", '20px'); 
  
  
    /* 
  
      Tooltip Set-up  
  
    */
  
    // Add div for tooltip to webpage
    const tooltip3 = d3.select("body") 
                    .append("div") 
                    .attr('id', "tooltip3") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 
  
    // Add values to tooltip on mouseover, make tooltip div opaque  
    const mouseover3 = function(event, d) {
      tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
              .style("opacity", 1);  
    }
  
    // Position tooltip to follow mouse 
    const mousemove3 = function(event, d) {
      tooltip3.style("left", (event.pageX)+"px") 
              .style("top", (event.pageY + yTooltipOffset)+"px"); 
    }
  
    // Return tooltip to transparant when mouse leaves
    const mouseleave3 = function(event, d) { 
      tooltip3.style("opacity", 0); 
    }
  
  
    //Points
  
    // Add points to the webpage, bind events needed for tooltips 
    svg3.selectAll(".point") 
       .data(data) 
       .enter()  
       .append("circle") 
         .attr("class", "point") 
         .attr("cx", (d) => xScale3(d.day)) 
         .attr("cy", (d) => yScale3(d.score)) 
         .attr("r", 10) 
         .on("mouseover", mouseover3) 
         .on("mousemove", mousemove3)
         .on("mouseleave", mouseleave3);
  }); 