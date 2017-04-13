$(document).ready(function() {
    $('#us_map').usmap({
      stateHoverAnimation: 100,
      showLabels: true,
      stateHoverStyles: {fill: '#83cdac'},
      stateStyles: {fill: '#f3f4f4'},
      // send the 2 letter id to our backend for something interesting
      // We need the 2 letter state id for our functions
      click: function(event, data) {
        document.getElementById('text').innerHTML = "State Selected: " + data.name;
      }
    });

  });


