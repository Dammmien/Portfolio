window.onload = function(){

  'use strict';
  
  if (document.getElementById('quotes_container') !== null){
  
    var nextButton = document.getElementById('nextButton'),
        previousButton = document.getElementById('previousButton'),

    previousQuote = function(){
      var a = document.getElementsByClassName('active')[0];
      if(a.previousSibling !== null)
        a.previousSibling.className = 'quote active';
      else
        document.getElementById('quotes_container').lastChild.className = 'quote active';
      a.className = 'quote';
    },
    
    nextQuote = function(){
      var a = document.getElementsByClassName('active')[0];
      if (a.nextSibling !== null)
        a.nextSibling.className = 'quote active';
      else
        document.getElementById('quotes_container').firstChild.className = 'quote active';
      a.className = 'quote';
    };
    
    nextButton.addEventListener('click', nextQuote, false);
    previousButton.addEventListener('click', previousQuote, false);

  }

};