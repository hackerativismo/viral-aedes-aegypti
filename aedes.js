$(window).ready(function() {

	$('head').append('<style type="text/css">' +
	'.flipAE { transform: scaleX(-1); }' +
	'.aegypti { display: block; z-index:9999; position:absolute; width: 60px; height: 50px; margin: 2% auto; background: url("aedes.png")' +
	'left center; }' +
	'.flyAE { animation: play .2s steps(6) infinite; }' +
	'.aegypti { cursor: url(raquete.png) 30 35, pointer; }' +
	'@keyframes play { 100% { background-position: -360px; } }' +
	'.rotateAE { background-position: 180px; }' +
	'</style>');

  minY = 20;
  maxY = 200;
  minX = 50
	maxX = $(document.body).width() - 100;

	$(document).ready(function() {
	    for (var i=0; i<3; i++) {
	        setTimeout(function(){
	            var mosquito = $('<a href="http://combateaedes.saude.gov.br/"' +
	                             ' target="_blank" class="aegypti flyAE"' +
	                             ' id="aegypti'+i+'" style="top:-90px"></a>')
	                             .appendTo(document.body);
	            mosquito.css({ left: makeNewPosition().left + 'px' });
	            mosquito.click(function(){
	                mosquito.remove();  // Mata o mosquito, remove da página.
	                mosquito[0] = null; // facilita o fim da animação.
	            });
              mosquito.mouseover(function() {
                mosquito.stop();
              });
              mosquito.mouseout(function() {
      	        animateAedes(mosquito);
              });
      	      animateAedes(mosquito);
  	      }, Math.pow(i*2,2)*1000);
	    }
	});

	function makeNewPosition() {
	    var newX = Math.floor((maxX-minX) * Math.random()) + minX;
	    var newY = Math.floor((maxY-minY) * Math.random()) + minY;
	    return {left:newX, top:newY};
	}

  function precisaGirar(newq, oldq, mosquito) {
      return (
          ( newq.left > oldq.left && !mosquito.hasClass('flipAE') ) ||
          ( newq.left < oldq.left && mosquito.hasClass('flipAE') )
      )
  }

	function animateAedes(mosquito) {
	    if (!mosquito[0]) return console.log('Morreu.');
	    var newq = makeNewPosition();
	    var oldq = mosquito.offset();
	    var origAngle = mosquito[0].angle || 0;
	    var angle = ((Math.atan2(newq.top-oldq.top, newq.left-oldq.left)/Math.PI) * 180 ) - 90;

      if ( precisaGirar(newq, oldq, mosquito) )
        mosquito.removeClass('flyAE').addClass('rotateAE');
      setTimeout(function(){
        if ( newq.left > oldq.left ) mosquito.addClass('flipAE');
        else mosquito.removeClass('flipAE');
        mosquito.removeClass('rotateAE').addClass('flyAE');
      }, 60);

	    var speed = calcSpeed(oldq, newq);
	
	    mosquito.animate({
	        left: newq.left,
	        top: newq.top
	    }, speed, function() {
	        setTimeout(function(){ animateAedes(mosquito) }, 100);
	    });
	}

	function calcSpeed(prev, next) {
	    var x = Math.abs(prev.left - next.left);
	    var y = Math.abs(prev.top - next.top);
	    var dist = Math.sqrt(x*x + y*y);
	    return Math.log(dist/10 + 1) * 900;
	}

});

