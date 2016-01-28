$(window).ready(function() {

	$('head').append('<style type="text/css">.flipAE { transform: scaleX(-1); } div#zona-voo { position: absolute; z-index:9999; top: -300px; left: 0px; height:300px; width:70%; } .aegypti { display: block; position:fixed; width: 60px; height: 50px; margin: 2% auto; background: url("http://valessiobrito.github.io/viral-aedes-aegypti/aedes.png") left center; animation: play .2s steps(6) infinite; z-index: 10; } @keyframes play { 100% { background-position: -360px; } } .rotateAE { animation: playRotate .3s steps(4) infinite; } @keyframes playRotate { 100% { background-position: 240px; } }</style>');

	$(document).ready(function() {
		$(document.body).append('<div id="zona-voo"><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti"></a><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti"></a><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti"></a></div>');
});

	$(document).ready(function() {
	    $('.aegypti').each(function(num,el){
	        $el = $(el);
	        $parent = $el.parent();
	        // Randomize start point:
	        $(el).css({ top: $parent.height() * Math.random() + 'px' });
  	      animateAedes($(el));
	    });
	});

	function makeNewPosition($container) {
	    var h = $container.height() - 50;
	    var w = $container.width() - 50;
	
	    var nh = Math.floor(Math.random() * h);
	    var nw = Math.floor(Math.random() * w);
	
	    return {left:nw, top:nh};
	}

	function animateAedes($target) {
	    var newq = makeNewPosition($target.parent());
	    var oldq = $target.offset();
	    var origAngle = $target[0].angle || 0;
	    var angle = ((Math.atan2(newq.top-oldq.top, newq.left-oldq.left)/Math.PI) * 180 ) - 90;

      // .flipAE é a animação no sentido contrario, usar somente .aegypti é animação sentido normal
      // .rotateAE são 4 frames para rotação, deve reproduzir somente no limite/retorno 
      for ( var step=0; step<=1; step+=.1 ) {
	setTimeout(function(){
		$target.removeClass('aegypti flipAE').addClass('aegypti')
	}, 50*step);
        (function (stepAngle) {
              setTimeout(function(){
		   $target.removeClass('aegypti rotateAE').addClass('aegypti flipAE')
              }, 50*step);
        })($target.removeClass('aegypti flipAE').addClass('aegypti rotateAE'), 300*step);
      }

	    var speed = calcSpeed(oldq, newq);
	
	    $target.animate({
	        left: newq.left,
	        top: newq.top
	    }, speed, function() {
	        setTimeout(function(){ animateAedes($target) }, 500);
	    });
	}

	function calcSpeed(prev, next) {
	    var x = Math.abs(prev.left - next.left);
	    var y = Math.abs(prev.top - next.top);
	    var dist = Math.sqrt(x*x + y*y);
	    //var speedModifier = 0.1;
	    //var speed = Math.ceil(dist / speedModifier);
	    //return speed;
	    return Math.log(dist/10 + 1) * 900;
	}

});

