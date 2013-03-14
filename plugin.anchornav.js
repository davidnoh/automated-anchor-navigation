(function($) {
	$.fn.anchornav = function ( options ) {
		var settings = $.extend({
			"wrapper": "body",
			"selector": "section",
			"anchorTitle": "h2",
			"speed": "fast"
		}, options);
		
		var n = $(settings.selector).length;
		
		if ( n > 0) {
			$(settings.wrapper).prepend('<nav id="anchornav"><ul></ul></nav>');

			$(settings.selector).each(function() {
				$this = $(this);
				var currentId = $this.attr('id');
				var str = $this.find(settings.anchorTitle).text();
				
				$('#anchornav ul').append('<li class="'+currentId+'"><a href="#'+currentId+'" class="jumpto">' + str + '</a></li>');
			});
			
			 $('a[href^="#"]').click(function() {
				$('html,body').animate({ scrollTop: $(this.hash).offset().top}, settings.speed);
				return false;
			});
		} else {
			// Error Message:
			console.log('There is no anchorelement with the selector ' + settings.selector);
		}
	}
}(jQuery));