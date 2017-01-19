function load {

		var listOfLocalities = [];
		var localities = {};


		Papa.parse('data/total_primary_energy_production.csv', {
		
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function(results) 
			{
				// loop through all the rows in file
				for (var row=0; row < results.data.length; row++)
				{
					var record = results.data[row];
					
					// make an object to store data for the current locality
					var locality = {
						name: record.Locality,
						energyProduction: []
					}

					// loop through all years, from 1980 to 2012
					for (var year=1980; year<=2012; year++) 
					{
						var value = record[year];

						// deal with missing data points
						if (value === '--') {
							value = 0;
						}
						else if (value === 'NA') {
							value = 0;
						}
						else if (value === '(s)') {
							value = 0;
						}
						else if (value === 'W') {
							value = 0;
						}

						// add record of current energy production
						locality.energyProduction.push( value );
					}

					// add the current locality to an index
					localities[ locality.name] = locality;
					listOfLocalities.push( locality.name );
				}
				// make bar chart
				drawBarChart('United States');

				// populate selection list
				d3.select('#selectionWidget').selectAll('option').data(listOfLocalities).enter().append('option')
					.html(function(d) { return d; })
					.attr('value', function(d) { return d; })

				d3.select("#selectionWidget")
					.on('change', function() {

						// clear the contents of the chart
						d3.select("#main").selectAll('g').remove();

						// figure out the newly selected locality
						var selection = document.getElementById('selectionWidget');
						var localityName = selection.options[selection.selectedIndex].value;

						console.log('new locality: ' + localityName);

						// re-draw bar chart for the new locality
						drawBarChart(localityName);
					});

			}
		});

		function drawBarChart(localityName)
		{
			// get energy production for USA
			var energyProductionUSA = localities[localityName].energyProduction;

			// figure out maximum energy production
			var maxProduction = d3.max(energyProductionUSA);

			// chart size 
			var chartWidth = 500;
			var chartHeight = 120;

			// figure out the width of individual bars
			var barWidth = chartWidth / (2012-1980+1);

			// create a y scale
			var yScale = d3.scale.linear()
				.domain([0, maxProduction])
				.range([chartHeight, 0]);

			// create a group for the bar chart
			d3.select("#label")
				.html(localityName + " primary energy production (Quadrillion BTU)");

			var group = d3.select("#main").append("g")
				.attr("transform", "translate(100, 100)");

			group.selectAll("rect").data(energyProductionUSA).enter().append('rect')
				.attr("x", function(d, i) { return i*barWidth })
				.attr("y", function(d, i) { 
					return yScale(d);
				})
				.attr("width", barWidth)
				.attr("height", function(d) { 
					return chartHeight - yScale(d); 
				})
				.style("stroke", "white")
				.style("fill", "#0066cc");

			
			// create x axis
			var timeScale = d3.time.scale()
				.domain([new Date(1980, 1, 1), new Date(2012, 1, 1)])
				.range([0, chartWidth])

			var xAxis = d3.svg.axis()
				.scale(timeScale)
				.orient('bottom');

			// create y axis
			group.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + chartHeight + ')')
				.call(xAxis);

			var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');

			group.append("g")
				.attr('class', 'axis')
				.attr('transform', 'translate(-2,0)')
				.call(yAxis);
		}
}