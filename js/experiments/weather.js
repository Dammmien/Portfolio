function displayWeather(weather){
  var out = '';
  for(var key in weather) out += '<p><span class="weather-property">' + key + '</span>' + weather[key] + '</p>';
  $('#weather-result-container').html(out);
}

function displayForecast(weather){
  var out = '';
  $('#weather-forecast-list-container').empty();
  for( var i = 0; i < weather.length; i++){
    var span = document.createElement('span'),
        storage = {};
    $(span).addClass("forecast-day");
    for(var key in weather[i]){
      if( key === 'day' ) $(span).text(weather[i].day);
      else storage[key] = weather[i][key];
    }
    $(span).data( "storage", storage );
    $('#weather-forecast-list-container').append(span);
  }
}

function getWeather (url){
  $.ajax({
    dataType: "jsonp",
    url: url,
    success: function(w) {
      var now = w.list[0],
          forecast = [];
      
      var outNow = {
        temp: now.main.temp + ' °C',
        humidity: now.main.humidity + ' %',
        description: now.weather[0].description,
        wind: now.wind.speed + ' km/h',
        clouds: now.clouds.all + ' %',
        city: w.city.name + ' (' + w.city.country + ')'
      }
      
      displayWeather(outNow);
      
      for(var i = 1; i < w.list.length; i++){
        var day = w.list[i];
        
        if( day.dt_txt.indexOf("12:00:00") != -1 && day.dt_txt.substring(8,10) !== now.dt_txt.substring(8,10)){
          var out = {
            temp: day.main.temp + ' °C',
            humidity: day.main.humidity + ' %',
            description: day.weather[0].description,
            wind: day.wind.speed + ' km/h',
            clouds: day.clouds.all + ' %',
            day: day.dt_txt.substring(8,10) + '/' + day.dt_txt.substring(5,7),
            city: w.city.name + ' (' + w.city.country + ')'
          };
          forecast.push(out);
        }
      }
      
      displayForecast(forecast);
    },
    error: function(err){
      console.log(err);
      var out = '<h1> API ERROR </h1>';
      out += '<p class="apierror">Our weather API seems to have some issues. Thank you to try later.</p>';
      $('#weather-container').html(out);
    }
  });
}

function geolocationWeather(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( function(position){
      getWeather('http://api.openweathermap.org/data/2.5/forecast/weekly?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&mode=json&units=metric&cnt=7');
    });
  }
}

function cityWeather(){
  getWeather('http://api.openweathermap.org/data/2.5/forecast/weekly?q=' + $('#input-city-search').val() + '&mode=json&units=metric&cnt=7');
}

geolocationWeather();

$('#button-city-search').on('click', cityWeather);
$('#weather-forecast-list-container').on('click', '.forecast-day', function(){
    displayWeather($(this).data("storage"));
});