function loadscatter() {

		var listOfLocalities = [];
		var localities = {};

		Papa.parse('data/total_primary_energy_production.csv', {    //Total Primary Energy Production
		
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function(results) 
			{
				console.log(results + " " + localities + " "+ listOfLocalities )
				parse1 (results,localities,listOfLocalities) 

				
				Papa.parse('data/total_primary_energy_consumption.csv', {	//Total Primary Energy Consumption
		
							download: true,
							header: true,
							dynamicTyping: true,
							complete: function(results) 
							{		
								var localitiesPEC = {};
								parse1 (results,localitiesPEC,listOfLocalities)
								
								Papa.parse('data/total_electricity_generation.csv', {	//Total Electricity Generation
		
								download: true,
								header: true,
								dynamicTyping: true,
								complete: function(results) 
								{
									var localitiesTEG = {};
									parse1 (results,localitiesTEG,listOfLocalities) 
									
									Papa.parse('data/total_electricity_consumption.csv', {		//Total Electricity Consumption
							
												download: true,
												header: true,
												dynamicTyping: true,
												complete: function(results) 
												{
													var localitiesTEC = {};		
													parse1 (results,localitiesTEC,listOfLocalities)
													

				// make bar chart
				//drawscatterChart(localitiesPEC,localitiesTEG, localitiesTEC);

				// populate selection list
				/*
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

						drawlineChart(localities,localityName);

				*/
						d3.select('#energywidget1')
						.on('change', function() {

							// clear the contents of the chart
							d3.select("#main").selectAll('g').remove();

							// re-draw bar chart for the new locality and energy type
							var selection = document.getElementById('energywidget1');
							var value = selection.options[selection.selectedIndex].value;
							console.log("Energy Type: "+ value);

							drawscatterChart(localities,localitiesPEC,listOfLocalities);

/*
							if (value == "Total Primary Energy Production") {
								console.log("drawing Production chart");
								drawlineChart(localities,localityName);
									}

							else if (value == "Total Primary Energy Consumption") {
								console.log("drawing consumption chart");
								drawlineChart(localitiesPEC,localityName);
							}

							else if (value == "Total Electricity Generation") {
								console.log("drawing electricity generation chart");
								drawlineChart(localitiesTEG,localityName);
							}

							else if (value == "Total Electricity Consumption") {
								console.log("drawing electricity consumption chart");
								drawlineChart(localitiesTEC,localityName);
							}
*/

						})
					
			//})
			//*/
				}
		});
			}
		});
}
		});
}
		});
		
}


function parse1(results,localities,listOfLocalities) {
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
		return results,localities, listOfLocalities;
}
			
		
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
		
