google.charts.load('current', {
        'packages':['geochart'],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Years', { role: 'tooltip' }],
          ['Sweden', 1, "2001-2018, 2019-2023"],
          ['France', 1, "2018-2019"],
          ['Switzerland', 1, "2023-"]
        ]);

        var options = {
            region: "150", // Specify Europe for region
            legend: "none",
            backgroundColor: "#A9C7CD",
            colorAxis: {colors: "#6f8b9e"}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);

        google.visualization.events.addListener(chart, 'select', function() {
            var selection = chart.getSelection();
            if (selection.length > 0) {
              var selectedCountry = data.getValue(selection[0].row, 0);
  
              var urls = {
                'Sweden': 'projects/FSP.html',
                'France': 'projects/FSP.html',
                'Switzerland': 'projects/FSP.html'
              };
  
              if (urls[selectedCountry]) {
                window.location.href = urls[selectedCountry];
              }
            }
          });
      }
      