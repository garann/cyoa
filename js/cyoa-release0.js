
$(document).ready(function() {
	
	
	// r0: removed repeated code (+ link wireups)
	goToPage(0);
	
	// TODO: find something less icky
	setInterval(function() {
		var currentpage = parseInt($("#currentpage").val()),
			num = window.location.hash.substring(1) || 0;
		if (currentpage != num) {
			goToPage(num);
		}
	}, 100);
	
	// TODO: rethink this whole thing
	$(document).bind("keydown",function(e) {
		
		clearTimeout(typingPause);
		
		var currentpage = parseInt($("#currentpage").val());
		var k = keys[e.keyCode];
		if (k == "left") {
			currentpage--;
			goToPage(currentpage);
		} else if (k == "right") {
			currentpage++;
			goToPage(currentpage);
		} else if (k) {
			newpage += "" + k;
			typingPause = setTimeout(
				function() {
					goToPage(newpage);
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

var newpage = "";
// TODO: is this necessary?
var keys = {
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
};
var typingPause;

// TODO: fewer arguments
function goToPage(pagenum, pagetext, pageimg) {

	// TODO: put this logic someplace else
	if (!pagetext) {
		switch (parseInt(pagenum)) {
			case 0:
				goToPage0();
				break;
			case 1:
				goToPage1();
				break;
			case 2:
				goToPage2();
				break;
			case 3:
				goToPage3();
				break;
			case 4:
				goToPage4();
				break;
			default: 
				return;
		}
	}

	$("#currentpage").val(pagenum);
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
			goToPage(parseInt($("#currentpage").val())+1);
		});
		
		$("div.choose a").click(function(e) {
			e.preventDefault();
			var newpage = $(this).attr("rel");
			goToPage(newpage);
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
function goToPage0() {
	goToPage(0,"title.html");
}

function goToPage1() {
	goToPage(1,"whatToDo.html");
}

function goToPage2() {
	goToPage(2,"youHaveDied.html","explosion.jpg");
}

function goToPage3() {
	goToPage(3,"youHaveDied.html","sisyphus.jpg");
}

function goToPage4() {
	goToPage(4,"sellIt.html");
}

