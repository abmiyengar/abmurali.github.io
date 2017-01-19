function drawscatterChart(localities1,localities2,localityName)
		{
			
			//console.log("1:"+localities1);
			// get energy production for first locality
			var energylocalities1 = localities1[localityName].energyProduction;

			// get energy production for first locality
			var energylocalities2 = localities2[localityName].energyProduction;

			// figure out maximum energy production
			var maxProduction1 = d3.max(energylocalities1);

			var maxProduction2 = d3.max(energylocalities2);

			//console.log("maxProduction1:"+maxProduction1);

			// chart size 
			var width = 700;
			var height = 400;

			// figure out the width of individual bars
			//var barWidth = chartWidth / (2012-1980+1);

			var x = d3.scale.linear()
				.domain([0, maxProduction1])
			    .range([height, 0]);

			var y = d3.scale.linear()
				.domain([0, maxProduction2])
			    .range([height, 0]);

			var z = d3.scale.category10();



			var svg = d3.select("#main").append("g")
				.attr("transform", "translate(100, 100)");

			svg.selectAll(".point")
				.data(energylocalities1).enter().append('.point')
				.style("fill", function(d, i) { return z(i); })
			    .selectAll(".point")
			    .data(function(d) { return d; })
			    .enter().append("circle")
			      .attr("class", "point")
			      .attr("r", 4.5)
			      .attr("cx", function(d) { return x(d.x); })
			      .attr("cy", function(d) { return y(d.y); }); 

			
			// create x axis
			//var timeScale = d3.time.scale()
			//	.domain([new Date(1980, 1, 1), new Date(2012, 1, 1)])
			//	.range([0, chartWidth])

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

			// create y axis
			group.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + chartHeight + ')')
				.call(xAxis);

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');

			group.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(-2,0)')
				.call(yAxis);
		}
		
