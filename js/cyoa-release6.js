
$(document).ready(function() {
	
	// r0: removed repeated code (+ link wireups)
	// r4: replaced initial page load with init
	cyoa.state.init();
	
	// TODO: find something less icky
	setInterval(function() {
		var num = window.location.hash.substring(1) || 0;
		if (cyoa.currentPage != num) {
			cyoa.currentPage = num;
		}
	}, 100);
	
	// r5: separated recording/changing page from loading
	$(document).bind("keydown",function(e) {
		
		cyoa.event.publish("keyPressed", [e.keyCode]);
		
	});
	
	// r6: don't keep binding this every time the page reloads
	$("div.page_text").delegate("div.continue a","click",function(e) {
		e.preventDefault();
		cyoa.currentPage += 1;
	});
	
	// r5: added subscribers
	cyoa.event.subscribe("pageChanged", function(r) {
		
		cyoa.state.goToPage();
		
	});
	
	cyoa.event.subscribe("pageLoaded", function(r) {	
		
		$("div.page_text").html(r);
			
	});
	
	cyoa.event.subscribe("keyPressed", function(key) {
		clearTimeout(cyoa.typingPause);
			
		var k = cyoa.keys[key];
		if (k == "left") {
			cyoa.currentPage -= 1;
		} else if (k == "right") {
			cyoa.currentPage += 1;
		} else if (k) {
			cyoa.newpage += "" + k;
			cyoa.typingPause = setTimeout(
				function() {
					cyoa.currentPage = cyoa.newpage;
				}, 500
			);
		}
	});
	
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
		_currentPage: 0,
		// r5: getter and setter for currentPage
		get currentPage() { return this._currentPage; },
		set currentPage(n) { 
			if (n < 0 || n >= cyoa.states.length) return;
			this._currentPage = n;
			cyoa.event.publish("pageChanged");
		},
		// r3: pan plugin setup
		setUpPan: function ($t) {
			$t.css({position:'relative', overflow:'hidden', cursor:'move'});
			var $img=$t.children().eq(0), //image to pan
				options={$pancontainer:$t, pos:$t.attr('data-orient'), curzoom:1, canzoom:$t.attr('data-canzoom'), wrappersize:[$t.width(), $t.height()]}
			$img.imgmover(options);
		},
		// r3: zoom image setup
		setUpZoom: function($t) {
			if ($t.length) {
				$t.each(function() {
					cyoa.zoomin($(this), {
						bgcolor: "#999"
					});
				});
			}
		}
	};
	
// r4: created array with page/state info
cyoa.states = [
	{page: "title.html"},	
	{page: "whatToDo.html"},	
	{page: "youHaveDied.html", image: "explosion.jpg"},	
	{page: "youHaveDied.html", image: "sisyphus.jpg"},	
	{page: "sellIt.html"}
];

// r4: added more structured state management 
cyoa.state = {
	init: function() {
		var num = window.location.hash.substring(1) || 0;
		cyoa.state.goToPage();
	},
	
	goToPage: function() {
		
		var pagenum = cyoa.currentPage;
		window.location.hash = pagenum;	
		// r4: get state info
		var state = cyoa.states[pagenum],
		// r0: saved .page_image selector
			$h = $("h3 span"),
			$p = $("div.page_image"),
			img = state.image;
		
		newpage = "";
		parseInt(pagenum) ? $h.text(pagenum) : $h.text("");	
		
		$.get("pages/" + state.page,function(r) {			
			cyoa.event.publish("pageLoaded", [r]);	
		}, "html");
		
		// r5: moved unrelated image code out of on page load callback
		img ? $p.html('<img src="img/' + img + '" />') : $p.html("");
		// r3: removed plugin setup code
		cyoa.setUpZoom($p.children());
		// r3: removed plugin setup code
		cyoa.setUpPan($('div.pancontainer'));
		
	}
};


