
jQuery.fn.zoomin = function(opts) {
	
	var that = this;
	that.opts = $.extend({},opts,{
		zoom: "full",
		bgcolor: "#000"
	});
	
	this.click(function(e) {
		
		var $t = $(this);
		
		if (that.zoomed) {
		
			$("div.mask").hide();
			$t.attr("style","position:relative;top:auto;left:auto;z-index:1;margin:0px;");
			that.origParent.append($t);
			that.zoomed = false;
		
		} else {
			
			$("body").append('<div class="mask" style="background-color:' + that.opts.bgcolor + ';"></div>');
			that.origParent = $t.parent();
			$t.attr("style","position:absolute;top:20px;left:50%;border:20px #fff solid;z-index:10;");
			if (that.opts.zoom == "full") {
				$t.css("marginLeft","-" + $t.width()/2 + "px");
			} else {
				$t.css("left","0px");
			}
			$("body").append($t);
			that.zoomed = true;
			
		}
		
		return false;
		
	});
	
	return that;
};