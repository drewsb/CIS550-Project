$(document).ready(function() {
    $("#queryselect").change(function() {
      // find id, set that queryXtable to visible
      console.log("got change");
      var id = $("#queryselect").val();
      console.log("selected id was " + id);
      var ids = ["query1table","query2table","query3table","query4table",
                "query5table","query6table","query7table","query8table",
                "query9table","query10table","query11table","query12table",
                "query13table", "query14table"];

      for (var i = 0; i < ids.length; i++) {
        if (i == id-1){
          $("#" + ids[i]).show();
        } else {
          $("#" + ids[i]).hide();
        }
      }


    });
    $('#us_map').usmap({
      stateHoverAnimation: 100,
      showLabels: true,
      stateHoverStyles: {fill: '#83cdac'},
      stateStyles: {fill: '#f3f4f4'},
      // send the 2 letter id to our backend for something interesting
      // We need the 2 letter state id for our functions
      click: function(event, data) {
        $.post("/index",{state : data.name}, function(data,status,jqXHR) {
          var response_data = data;
          var state_name = response_data.state;
          var table1 = response_data.tbl1;
          var table2 = response_data.tbl2;
          var table3 = response_data.tbl3;
          
          var table4 = response_data.tbl4;
          var table5 = response_data.tbl5;
          var table6 = response_data.tbl6;
          var table7 = response_data.tbl7;
          var table8 = response_data.tbl8;
          var table9 = response_data.tbl9;
          var table10 = response_data.tbl10;
          var table11 = response_data.tbl11;
          var table12 = response_data.tbl12;
          var table13 = response_data.tbl13;
          var table14 = response_data.tbl14;
          console.log(state_name);

          $("#state_text").text("State Selected: " + state_name);
          // Replace all tables
          $("#query1table").html(table1);
          $("#query2table").html(table2);
          $("#query3table").html(table3);
          $("#query4table").html(table4);
          $("#query5table").html(table5);
          $("#query6table").html(table6);
          $("#query7table").html(table7);
          $("#query8table").html(table8);
          $("#query9table").html(table9);
          $("#query10table").html(table10);
          $("#query11table").html(table11);
          $("#query12table").html(table12);
          $("#query13table").html(table13);
          $("#query14table").html(table14);
          console.log(table14);

        });
      }
    });

  });

