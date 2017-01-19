//Code created by Abhishek Murali as part of Interactive Visualization Project 1
//Special thanks to Justin Palmer for d3.tip (http://bl.ocks.org/Caged/6476579)


function drawBarChart(localities,localityName,option)
		{
			
			// get energy production for USA
			var energyProductionUSA = localities[localityName].energyProduction;

			// figure out maximum energy production
			var maxProduction = d3.max(energyProductionUSA);

			// chart size 
			var width = 700;
			var height = 400;

			// figure out the width of individual bars
			var barWidth = width / (2012-1980+1);

			// create a y scale
			var y = d3.scale.linear()
				.domain([0, maxProduction])
				.range([height, 0]);

			// create a group for the bar chart
			d3.select("#label")
				.html(localityName + " " + option);
				
			var tip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 0])
                        .html(function(d) 
                        		{ console.log(d.barWidth);
                              return "<strong>Value:</strong> <span style='color:White'>" + y(d) + "</span>";
  								})


			var svg = d3.select("#main")
						.append("g")
						.attr("transform", "translate(100, 100)");


			svg.selectAll("rect")
				.data(energyProductionUSA)
				.enter()
				.append('rect')
				.attr("x", function(d, i) 
							{ 
							return i*barWidth 
							})
				.attr("y", function(d, i) 
							{ 
							return y(d);
							})
				.attr("width", barWidth)
				.attr("height", function(d) 
							{ 
							return height - y(d); 
							})
				.style("stroke", "white")
				.style("fill", "#1b9e77")
				.on('mouseover', tip.show)
      			.on('mouseout', tip.hide);
				
			svg.call(tip);
			
			
			// create x axis
			var x = d3.time.scale()
				.domain([new Date(1980, 1, 1), new Date(2012, 1, 1)])
				.range([0, width])

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

			// call x axis
			svg.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			svg.append("text")      // text label for the x axis
		        .attr("x", 600 )
		        .attr("y", 450 )
		        .style("text-anchor", "middle")
		        .text("Time (in years)");

			// create y axis
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');
				
			// call y axis
			svg.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(-2,0)')
				.call(yAxis);

			// y axis label 
			svg.append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("y", -80)
		        .attr("x", -60)
		        .attr("dy", "1em")
		        .style("text-anchor", "middle")
		        .text(option);
		}
		
function drawlineChart(localities,localityName,option)
		{

			// get energy production for USA
			var energyProductionUSA = localities[localityName].energyProduction;

			// figure out maximum energy production
			var maxProduction = d3.max(energyProductionUSA);

			// chart size 
			var width = 700;
			var height = 400;

			// figure out the width of individual bars
			var barWidth = width / (2012-1980+1);

			// create a y scale
			var y = d3.scale.linear()
					  .domain([0, maxProduction])
					  .range([height, 0]);

			// create a group for the bar chart
			d3.select("#label")
				.html(localityName + " " + option);

			var svg = d3.select("#main")
						  .append("g")
						  .attr("transform", "translate(100, 100)");
			
			
			var linefunction = d3.svg.line()
                    			 .x(function(d,i) 
                    			 		{ 
                    			 		return i*barWidth; 
                    			 		})
                    			 .y(function(d) 
                    			 		{ 
                    			 		return y(d); 
                    			 		});	

			svg.append("path")
                    .attr("class", "line")
                    .attr("d", linefunction(energyProductionUSA))
                    .style("stroke", "#d95f02")
                    .style("stroke-width", 2.5)
                    .style("fill","none");
                    
			// create x axis
			var x = d3.time.scale()
					  .domain([new Date(1980, 1, 1), new Date(2012, 1, 1)])
					  .range([0, width])

			var xAxis = d3.svg.axis()
				          .scale(x)
				          .orient('bottom');

			// call xAxis
			svg.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			// text label for the x axis
			svg.append("text")      
		        .attr("x", 600 )
		        .attr("y", 450 )
		        .style("text-anchor", "middle")
		        .text("Time (in years)");	

			// create y axis
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');

			svg.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(-2,0)')
				.call(yAxis);

			// text label y axis
			svg.append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("y", -80)
		        .attr("x", -60)
		        .attr("dy", "1em")
		        .style("text-anchor", "middle")
		        .text(option);	

		}
