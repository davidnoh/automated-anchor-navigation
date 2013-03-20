;(function ($) {

	var defaults = {
		wrapper: "body",
		selector: "section",
		anchorTitle: "h2",
		class: "anchornav",
		speed: "fast"
	};

	function Anchornav(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Anchornav.prototype = {
		init: function () {
			this.selectors = this.element.find(this.options.selector);

			if (this.selectors.length) {
				this.build();
				this.bindings();
			}
		},
		build: function() {
			var self = this;

			self.navlist = $('<nav class="'+self.options.navId+'"><ul/></nav>').prependTo(el);

			self.selectors.each(function() {
				var $this = $(this),
					id = $this.attr('id'),
					str = $this.find(self.options.anchorTitle).text(),
					navEl = null;

				if (!id) {
					id = "anchor-" + self.selectors.index($this);
					$this.attr('id', id);
				}

				self.navlist.append('<li class="'+id+'"><a href="#'+id+'" class="jumpto">'+str+'</a></li>');
			});
		},
		bindings: function () {
			var self = this;

			self.navlist.find('a.jumpto').bind('click.anchornav', function(e) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top
				}, self.options.speed);
				return false;
			});
		},
		destroy: function () {
			this.navlist.remove();
		},
		refresh: function () {
			this.destroy();
			this.init();
		}
	};

	$.fn.anchornav = function (options) {
		return this.each(function () {
			if (!$.data(this, "anchornav")) {
				$.data(this, "anchornav", new Anchornav(this, options));
			}
		});
	};

})(jQuery);