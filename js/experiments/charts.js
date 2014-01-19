function Charts(container){
  
  this.container = document.getElementById(container)
  
  this.displayAxis = function(min, max, num){
    var axis = document.createElementNS("http://www.w3.org/2000/svg", "line"),
        i = 0;
    this.container.appendChild(axis);
    while (i <= num){
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line"),
          txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      $(line).attr({
        'x1':  0,
        'x2': '100%',
        'y1': 100/num*i + "%",
        'y2': 100/num*i + "%",
        'stroke': 'rgba(0,0,0,0.2)',
        'stroke-width': '1px',
        'stroke-dasharray': '5px 10px'
      });
      $(txt).attr({
        'x': '0.5%',
        'y': 100/num*i - 1 + "%"
      }).text(max-max/num*i);
      if( i > 0){
        this.container.appendChild(line);
        this.container.appendChild(txt);
      }
      i++;
    }
  };

  this.verticalCharts = function(res) {
  
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
        
        this.container.appendChild(chart);
        
        counter ++;
      }
    }
    this.displayAxis(0, maxScore, 6);
  };
  
  this.displayStats = function (url, callback){
    var self = this;
    $.ajax({
      crossDomain : true,
      url: url,
      success: function(res) {
        self[callback](res);
      }
    });
  };
  
  this.displayDetails = function(details){
    for( var key in details ){
      $('#detail-' + key).html('<strong>' + key + ' : </strong>' + details[key]);
    }
    if( $('#container-details').hasClass('hidden') ){
      $('#container-charts').animate({'width': '71%'}, 500, 'swing');
      $('#container-details').animate({'width': '25%'}, 500, 'swing', function(){
        $('#container-details').removeClass('hidden');
      });
    }
  };
  
};

var test = new Charts("container-charts");
test.displayStats('http://demo55.apiary.io/data', 'verticalCharts');

$('#container-charts').on('click', 'rect', function(){
  test.displayDetails( $(this).data("details") );
});