window.onload = function(){
  
  if (document.getElementById('quotes_container') !== null){
    
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var start = null,
        quote = 0,
        quote_sentence = document.getElementById("quote_sentence"),
        quote_author = document.getElementById("quote_author"),
        progress_bar = document.getElementById('progress'),
        quotes = [
          {
            'sentence': 'Real web designers write code. <br/>Always have, always will.',
            'author': 'Jeffrey Zeldman'
          },
          {
            'sentence': 'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.',
            'author': 'Douglas Adams'
          },
          {
            'sentence': 'Simplicity isn\'t simple',
            'author': 'Jonathan Ive'
          },
          {
            'sentence': 'Design is like a mom, nobody notices when she\'s around, but everybody misses her when she\'s not.',
            'author': 'Santiago Borray'
          },
          {
            'sentence': 'Good design means never having to say "Click Here".',
            'author': 'Shawn Leslie'
          },
          {
            'sentence': ' Design should never say, "Look at me". <br/>It should always say, "Look at this".',
            'author': 'David Craib'
          },
          {
            'sentence': 'Remember it takes a lot of shit, <br/>to create a beautiful flower.',
            'author': 'Jacob Cass'
          }
        ];

    function progress(timestamp) {
      if (start === null) start = timestamp;
      var t = timestamp - start;
      if (t > 6000) {
        t = 6000;
        start = timestamp;
        quote ++;
        if(quote == quotes.length) quote = 0;
        quote_sentence.innerHTML = quotes[quote].sentence;
        quote_author.innerHTML = quotes[quote].author;
      }
      progress_bar.style.width = t/6000*100 + '%';
      requestAnimationFrame(progress);
    }
    
    quote_sentence.innerHTML = quotes[quote].sentence;
    quote_author.innerHTML = quotes[quote].author;
    requestAnimationFrame(progress);
 
  }

};