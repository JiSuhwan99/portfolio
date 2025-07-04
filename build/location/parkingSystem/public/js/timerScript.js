var time = 120;
var min = "";
var sec = "";
var x = setInterval(function() {
	min = parseInt(time/60);
  sec = time;
  
  $('#resetTimer').html(sec + '초');
  time--;
  
  if(time < 0) {
    clearInterval(x);
    location.replace('/main'); 
  }

  $(document).click(function(e) {
    if(!$(e.target).is('#resetTimer')) {
      time = 120;
    }
  })
}, 1000);