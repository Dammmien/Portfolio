function buildChart(res) {

  var length = res.data.WEEKLY.dates.length,
      data = res.data.WEEKLY,
      metric = res.settings.dictionary.dictionary.metricLabels.points,
      maxScore = 30000,
      nbMembers = Object.keys(data.dataByMember).length,
      colors = ["#191970", "#DC143C" ];

  for (var i = 0; i < length; i++) {

    var counter = 0;

    for(var member in data.dataByMember){

      var chart = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
          score = data.dataByMember[member].points[i],
          height = score / maxScore * 100,
          width = 100 / length/ nbMembers,
          dateString = res.data.WEEKLY.dates[i];

      $(chart).attr({
        'height':  height + "%",
        'width': width + "%",
        'x': (i / length * 100) + (width * counter) + "%",
        'y': 100 - height + "%",
        'fill': colors[counter],
      }).data( "details", { 
        score: score + ' ' + metric,
        player: member,
        date : dateString.substring(6,8) + '/' + dateString.substring(4,6) + '/' + dateString.substring(0,4)
      });

      document.getElementById("container-charts").appendChild(chart);

      counter ++;
    }

  }

}

function displayStats (url){
  $.ajax({
    crossDomain : true,
    url: url,
    success: function(res) {
      buildChart(res);
    }
  });
}

function displayDetails(details){
  for( var key in details ){
    $('#detail-' + key).html('<strong>' + key + ' : </strong>' + details[key]);
  }
  if( $('#container-details').hasClass('hidden') ){
    $('#container-charts').animate({'width': '71%'}, 500, 'swing');
    $('#container-details').animate({'width': '25%'}, 500, 'swing', function(){
      $('#container-details').removeClass('hidden');
    });
  }
}

$('#container-charts').on('click', 'rect', function(){
  displayDetails( $(this).data("details") );
});

displayStats('http://demo55.apiary.io/data');