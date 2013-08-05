/* 
	Kristy Miller
	Lab 8 - Accordian
*/


(function(){
	var toggles = document.querySelectorAll(".toggler");
	
	kam(toggles).each(function(){
		var content = this.nextSibling.nextSibling;

		var height = kam(content).getStyle("height");
		var paddingTop = kam(content).getStyle("paddingTop");
		var paddingBottom = kam(content).getStyle("paddingBottom");

		console.log(height);


		content.style.height = "0px";
		content.style.paddingBottom = "0px";
		content.style.paddingTop = "0px";
		content.style.display = "none";

		var state = false;

		this.onclick = function(e){
			
			if(!state){
				state = "animating";
				content.style.display = "block";
				kam(content).animate({
					duration: 2000,
					easing: "easeOutBounce",
					css: {
						height: parseFloat(height),
						paddingTop: parseFloat(paddingTop),
						paddingBottom: parseFloat(paddingBottom)
					},
					done: function(){
						console.log("Animation Complete");
						state = true;
					}
				});
			}else{
				if(state == true){
					state = "animating";
					// content.style.display = "none";
					kam(content).animate({
						duration: 2000,
						easing: "easeOutBounce",
						css: {
							height: parseFloat(0),
							paddingTop: parseFloat(0),
							paddingBottom: parseFloat(0)
						},
						done: function(){
							console.log("Animation Complete");
							state = false;
						}
					});
				};
			};

			e.preventDefault();
			return false;
		};
	});

})();  // End