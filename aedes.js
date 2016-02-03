$(window).ready(function() {

	$('head').append('<style type="text/css">' +
	'.flipAE { transform: scaleX(-1); }' +
	'.aegypti { display: block; z-index:9999; position:absolute; width: 60px; height: 50px; margin: 2% auto; background: url("http://hackerativismo.github.io/viral-aedes-aegypti/aedes.png")' +
	'left center; }' +
	'.flyAE { animation: play .2s steps(6) infinite; }' +
	'.aegypti { cursor: url("http://hackerativismo.github.io/viral-aedes-aegypti/raquete.png") 30 35, pointer; }' +
	'@keyframes play { 100% { background-position: -360px; } }' +
	'.rotateAE { background-position: 180px; }' +
	'@media (min-width: 940px) { body #aegypti-intervencao #aegypti-close { width: 42px; height: 42px; margin-left: 348px; top: 42px; left: 50%; } }' +
	'#aegypti-intervencao { width: 100%; margin-top: -140px; position: fixed; top: 50%; text-align: center; }' +
	'#aegypti-intervencao #aegypti-banner:focus { outline: none !important; }' +
	'#aegypti-intervencao #aegypti-close { width: 4.4%; height: 12%; display: block; position: absolute; top: 12.4%; left: 87.2%; overflow: hidden; text-indent: -999999px; }' +
	'#aegypti-intervencao img { width: 100%; max-width: 939px;' +
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

                // Caso a estrutura não tenha sido criada
                if (!$('#aegypti-intervencao').length) {
                    $(document.body).append('<div id="aegypti-intervencao"><a href="http://combateaedes.saude.gov.br/" id="aegypti-banner" target="_blank" title="Faça sua parte"><img src="http://hackerativismo.github.io/viral-aedes-aegypti/aviso.png" alt="Não adianta apenas matar o mosquito. Não podemos deixar ele nascer. E isso depende de todos nós." /></a><a href="#" id="aegypti-close" title="Fechar">Fechar</a></div>');

                    $('#aegypti-intervencao #aegypti-banner').focus();
                    $('#aegypti-intervencao a').on("click", function() {
                        $(this).parent().fadeOut();
                    });
                }
                // Senão, apenas exibe
                else {
                    $('#aegypti-intervencao').fadeIn();
                    $('#aegypti-intervencao #aegypti-banner').focus();
                }

	                mosquito.remove();  // Mata o mosquito, remove da página.
	                mosquito[0] = null; // facilita o fim da animação.

                return false;

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

