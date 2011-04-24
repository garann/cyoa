
$(document).ready(function() {
	
	$.get("pages/title.html",function(r) {
		$(".page_text").html(r);
	}, "html");
	
	setInterval(function() {
		var currentpage = parseInt($("#currentpage").val()),
			num = window.location.hash.substring(1) || 0;
		if (currentpage != num) {
			goToPage(num);
		}
	}, 100);
	
	$(".continue a").click(function(e) {
		e.preventDefault();
		goToPage(parseInt($("#currentpage").val())+1);
	});
	
	$(".choose a").click(function(e) {
		e.preventDefault();
		var newpage = $(this).attr("rel");
		goToPage(newpage);
	});
	
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
	
	$('.pancontainer').each(function(){
		var $this=$(this).css({position:'relative', overflow:'hidden', cursor:'move'})
		var $img=$this.children().eq(0) //image to pan
		var options={$pancontainer:$this, pos:$this.attr('data-orient'), curzoom:1, canzoom:$this.attr('data-canzoom'), wrappersize:[$this.width(), $this.height()]}
		$img.imgmover(options)
	})	

});

var newpage = "";
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

function goToPage(pagenum, pagetext, pageimg) {

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
	
	newpage = "";
	parseInt(pagenum) ? $("h3 span").text(pagenum) : $("h3 span").text("");	
	
	$.get("pages/" + pagetext,function(r) {
		$(".page_text").html(r);
		
		pageimg ? $(".page_image").html('<img src="img/' + pageimg + '" />') : $(".page_image").html("");
		if ($(".page_image").children().length) {
			$(".page_image").children().each(function() {
				$(this).zoomin({
					bgcolor: "#999"
				});
			});
		}
		
		$(".continue a").click(function(e) {
			e.preventDefault();
			goToPage(parseInt($("#currentpage").val())+1);
		});
		
		$(".choose a").click(function(e) {
			e.preventDefault();
			var newpage = $(this).attr("rel");
			goToPage(newpage);
		});
		
		$('.pancontainer').each(function(){
			var $this=$(this).css({position:'relative', overflow:'hidden', cursor:'move'})
			var $img=$this.children().eq(0) //image to pan
			var options={$pancontainer:$this, pos:$this.attr('data-orient'), curzoom:1, canzoom:$this.attr('data-canzoom'), wrappersize:[$this.width(), $this.height()]}
			$img.imgmover(options)
		})	
		
	}, "html");
	
}

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

