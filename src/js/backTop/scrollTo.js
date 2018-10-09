import $ from 'jquery';

var ScrollTo = function (options){
	this.options = $.extend({},ScrollTo.DEFAULTS, options || {});
	this.$el = $('html,body');
}

ScrollTo.prototype = {
	move: function() {
		var option = this.options;
		var dest = option.dest;
		if($(window).scrollTop() != dest && !this.$el.is(':animated')){
			this.$el.animate({
				scrollTop:dest
			},option.speed);
		}
	},
	go: function () {
		this.$el.scrollTop(this.options.dest);
	}
}

ScrollTo.DEFAULTS = {
	dest: 0,
	speed: 400
}

export default ScrollTo