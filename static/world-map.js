google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

let chart, data;

function drawRegionsMap() {
    data = google.visualization.arrayToDataTable([
        ['Country', 'Years', { role: 'tooltip' }],
        ['Sweden', 1, "2001-2018, 2019-2023"],
        ['France', 1, "2018-2019"],
        ['Switzerland', 1, "2023"]
    ]);

    var container = document.getElementById('regions_div_container');
    var options = {
        region: "150",
        legend: "none",
        backgroundColor: "#A9C7CD",
        colorAxis: { colors: ["#6f8b9e"] },
        keepAspectRatio: true,
        width: container.clientWidth,
        height: container.clientHeight
    };

    chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);

    google.visualization.events.addListener(chart, 'select', function() {
            var selection = chart.getSelection();
            if (selection.length > 0) {
              var selectedCountry = data.getValue(selection[0].row, 0);
  
              var urls = {
                'Sweden': 'map.html#Sweden',
                'France': 'map.html#France',
                'Switzerland': 'map.html#Switzerland'
              };
  
              if (urls[selectedCountry]) {
                window.location.href = urls[selectedCountry];
              }
            }
          });
}

// Redraw map when window is resized
window.addEventListener('resize', drawRegionsMap);
