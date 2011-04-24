
$(document).ready(function() {
	
	
	// r0: removed repeated code (+ link wireups)
	cyoa.goToPage(0);
	
	// TODO: find something less icky
	setInterval(function() {
		var num = window.location.hash.substring(1) || 0;
		if (cyoa.currentPage != num) {
			cyoa.goToPage(num);
		}
	}, 100);
	
	// TODO: rethink this whole thing
	$(document).bind("keydown",function(e) {
		
		clearTimeout(cyoa.typingPause);
		
		var k = cyoa.keys[e.keyCode];
		if (k == "left") {
			cyoa.goToPage(cyoa.currentPage-1);
		} else if (k == "right") {
			cyoa.goToPage(cyoa.currentPage+1);
		} else if (k) {
			cyoa.newpage += "" + k;
			cyoa.typingPause = setTimeout(
				function() {
					cyoa.goToPage(newpage);
				}, 500
			);
		}
		
	});
	
	// TODO: what is this i don't even
	$('div.pancontainer').each(function(){
		var $this=$(this).css({position:'relative', overflow:'hidden', cursor:'move'})
		var $img=$this.children().eq(0) //image to pan
		var options={$pancontainer:$this, pos:$this.attr('data-orient'), curzoom:1, canzoom:$this.attr('data-canzoom'), wrappersize:[$this.width(), $this.height()]}
		$img.imgmover(options)
	})	

});

// r1: added this namespace
var cyoa = cyoa || {
		newpage: "",
		// TODO: is this necessary?
		keys: {
			"37": "left",
			"39": "right",
			"48": 0,
			"49": 1,
			"50": 2,
			"51": 3,
			"52": 4,
			"53": 5,
			"54": 6,
			"55": 7,
			"56": 8,
			"57": 9
		},
		typingPause: null,
		// r2: stop keeping this in an input field
		currentPage: 0
	};

// TODO: fewer arguments
cyoa.goToPage = function(pagenum, pagetext, pageimg) {

	// TODO: put this logic someplace else
	if (!pagetext) {
		switch (parseInt(pagenum)) {
			case 0:
				cyoa.goToPage0();
				break;
			case 1:
				cyoa.goToPage1();
				break;
			case 2:
				cyoa.goToPage2();
				break;
			case 3:
				cyoa.goToPage3();
				break;
			case 4:
				cyoa.goToPage4();
				break;
			default: 
				return;
		}
	}

	cyoa.currentPage = pagenum;
	window.location.hash = pagenum;
	
	// r0: saved .page_image selector
	var $h = $("h3 span"),
		$p = $("div.page_image");
	
	newpage = "";
	parseInt(pagenum) ? $h.text(pagenum) : $h.text("");	
	
	$.get("pages/" + pagetext,function(r) {
		$("div.page_text").html(r);
		
		pageimg ? $p.html('<img src="img/' + pageimg + '" />') : $p.html("");
		var imgs = $p.children();
		if (imgs.length) {
			$.each(imgs,function() {
				$(this).zoomin({
					bgcolor: "#999"
				});
			});
		}
		
		$("div.continue a").click(function(e) {
			e.preventDefault();
			cyoa.goToPage(cyoa.currentPage+1);
		});
		
		$('div.pancontainer').each(function(){
			var $this=$(this).css({position:'relative', overflow:'hidden', cursor:'move'})
			var $img=$this.children().eq(0) //image to pan
			var options={$pancontainer:$this, pos:$this.attr('data-orient'), curzoom:1, canzoom:$this.attr('data-canzoom'), wrappersize:[$this.width(), $this.height()]}
			$img.imgmover(options)
		})	
		
	}, "html");
	
}

// TODO: NOT THIS.
cyoa.goToPage0 = function() {
	cyoa.goToPage(0,"title.html");
}

cyoa.goToPage1 = function() {
	cyoa.goToPage(1,"whatToDo.html");
}

cyoa.goToPage2 = function() {
	cyoa.goToPage(2,"youHaveDied.html","explosion.jpg");
}

cyoa.goToPage3 = function() {
	cyoa.goToPage(3,"youHaveDied.html","sisyphus.jpg");
}

cyoa.goToPage4 = function() {
	cyoa.goToPage(4,"sellIt.html");
}

