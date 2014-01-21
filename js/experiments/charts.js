function Charts(container){

  this.container = document.getElementById(container);

  this.xmlns = "http://www.w3.org/2000/svg";


  this.maxScore = function(obj, l){
    var out = 0;
    for (var i = 0; i < l; i++)
      for(var key in obj)
        out = obj[key].points[i] > out ? obj[key].points[i] : out;
    return Math.ceil(out / 10000) * 10000;
  };


  this.displayLegend = function(color, member, counter){
    var txt = document.createElementNS(this.xmlns, "text");
    $(txt).attr({
      'x': counter * 8 + 2 + '%',
      'y': "4%"
    }).html('&#9632; ' + member).css('fill', color);
    this.container.appendChild(txt);
  };


  this.displayAxis = function(min, max, num){

    for (var i = 0; i < num; i++) {

      var line = document.createElementNS(this.xmlns, "line"),
          txt = document.createElementNS(this.xmlns, "text");

      $(line).attr({
        'x1':  0,
        'x2': '100%',
        'y1': 100/num*i + "%",
        'y2': 100/num*i + "%"
      });

      $(txt).attr({
        'x': '0.5%',
        'y': 100/num*i - 1 + "%"
      }).text(max-max/num*i);

      if( i > 0){
        this.container.appendChild(line);
        this.container.appendChild(txt);
      }

    }

  };


  this.verticalCharts = function(res) {

    var length    = res.data.WEEKLY.dates.length,
        data      = res.data.WEEKLY,
        metric    = res.settings.dictionary.dictionary.metricLabels.points,
        maxScore  = this.maxScore(data.dataByMember, length),
        nbMembers = Object.keys(data.dataByMember).length,
        colors    = ["#191970", "#DC143C" ];

    for (var i = 0; i < length; i++) {

      var counter = 0;

      for(var member in data.dataByMember){

        var chart       = document.createElementNS(this.xmlns, "rect"),
            score       = data.dataByMember[member].points[i],
            height      = score / maxScore * 100,
            width       = 95 / length/ nbMembers,
            dateString  = res.data.WEEKLY.dates[i];

        $(chart).attr({
          'height'  :  height + "%",
          'width'   : width + "%",
          'x'       : (i / length * 95) + (width * counter) + 5 + "%",
          'y'       : 100 - height + "%",
          'fill'    : colors[counter],
        }).data( "details", {
          score     : score + ' ' + metric,
          player    : member,
          date      : dateString.substring(6,8) + '/' + dateString.substring(4,6) + '/' + dateString.substring(0,4)
        });

        this.container.appendChild(chart);

        if( i === 0 ) this.displayLegend(colors[counter], member, counter);

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