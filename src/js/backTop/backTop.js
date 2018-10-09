import $ from 'jquery'
import ScrollTo from'./scrollTo.js'

var BackTop = function (el,options){

	this._init(el,options);
}

BackTop.DEFAULTS = {
	mode:'move',
	position:$(window).height(),
	dest:0,
	speed:400
}

BackTop.prototype = {
	_init: function(el,options){

		var option = (this.options = $.extend({}, BackTop.DEFAULTS, options || {}));

		this.$el = $(el);

		this.$w = $(window);

		this.scrollTo = new ScrollTo({dest:option.dest,speed:option.speed})

		this._listen();
	},
	_listen: function () {
		var $el = this.$el;
		var options = this.options;

		this._checkPosition();

		if(options.mode === 'move'){
			this.$el.on('click',$.proxy(this._move,this))
		}else{
			this.$el.on('click',$.proxy(this._go,this))
		}

		this.$w.on('scroll',$.proxy(this._checkPosition,this))
	},
	_move: function(){
		this.scrollTo.move();
	},
	_go: function () {
		this.scrollTo.go();
	},
	_checkPosition: function () {

		var $el = this.$el;
		var pos = this.options.position;

		if(this.$w.scrollTop() > pos){

			$("#backTop").fadeIn();

		}else{
		
			$("#backTop").fadeOut();

		}
	}
}


var backTop = BackTop.constructor;

$.fn.extend({
	backTop: function(options) {
		return this.each(function(){
			new BackTop(this,options);
		});
	}
});
export default BackTop 
