$(window).ready(function() {

	$('head').append('<style type="text/css">div#zona-voo { position: absolute; top: 0px; left: 0px; height:300px; width:100%; } .aegypti { display: block; position:fixed; width: 50px; height: 60px; margin: 2% auto; background: url("http://valessiobrito.github.io/viral-aedes-aegypti/aedes.png") left center; animation: play .2s steps(6) infinite; z-index: 10; } @keyframes play { 100% { background-position: -300px; } }</style>');

	$(document).ready(function() {
		$(document.body).append('<div id="zona-voo"><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti mosq1"></a><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti mosq2"></a><a href="http://combateaedes.saude.gov.br/" target="_blank" class="aegypti mosq3"></a></div>');
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
	    $target[0].angle = angle;

      // jQuery::animate wont work for transform, so we do it by computing frames:
      for ( var step=0; step<=1; step+=.1 ) {
          (function (stepAngle) {
              setTimeout(function(){
                  $target.css({transform: 'rotate('+(origAngle+stepAngle)+'deg)'})
              }, 600*step);
          })((angle-origAngle)*step);
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
	    return Math.log(dist/10 + 1) * 1000;
	}

});

