/* 
	Kristy Miller
	SFW1 - October 2nd, 2012
*/

(function(){

	// Active Thumb
	var activeThumb = 0;

	// Large Image
	var largeImg = document.querySelector("#largeImg");

	// Thumbnail Anchors
	var tn = document.querySelectorAll("#tn a");

		// Setting all the thumbnails to the not active class
		for(var i=0, max=tn.length; i<max; i++){
			tn[i].firstChild.setAttribute("class", "notActive");
		};

		// Setting the first thumbnail to active
		tn[0].firstChild.setAttribute("class", "activeTN");

	// Back Button
	var prev = document.querySelector("#prev a");

	// Next Button
	var next = document.querySelector("#next a");

	// Looping through the thumbnal anchors
	for(var i=0, max=tn.length; i<max; i++){

		tn[i].setAttribute("data-index", i);

		//Thumbnail Clicked
		tn[i].onclick = function(e){
			var dataIndex = this.getAttribute("data-index", this);
			var href = this.getAttribute("href", this);

			for(var ii=0, max=tn.length; ii<max; ii++){
				tn[ii].firstChild.setAttribute("class", "notActive");
			};

			this.firstChild.setAttribute("class", "activeTN");

			largeImg.setAttribute("src", href);
			activeThumb = dataIndex;

			e.preventDefault();
			return false;
		};
	};

	// Next Button Click
	next.onclick = function(e){

		if(activeThumb == tn.length - 1){
			activeThumb = 0;
		}else{
			activeThumb = parseInt(activeThumb) + 1;
		};

		for(var i=0, max=tn.length; i<max; i++){
			tn[i].firstChild.setAttribute("class", "notActive");
		};

		// Setting active to the thumbnail that is at the index of activeThumb
		var newActive = tn[activeThumb];
		newActive.firstChild.setAttribute("class", "activeTN");

		var href = newActive.getAttribute("href");
		largeImg.setAttribute("src", href);

		e.preventDefault();
		return false;

	};

	//Prev Button Clicked
	prev.onclick = function(e){
		
		if(activeThumb == 0){
			activeThumb = tn.length - 1;
		}else{
			activeThumb = parseInt(activeThumb) - 1;
		};

		for(var i=0, max=tn.length; i<max; i++){
			tn[i].firstChild.setAttribute("class", "notActive");
		};

		// Setting active to the thumbnail that is at the index of activeThumb
		var newActive = tn[activeThumb];
		newActive.firstChild.setAttribute("class", "activeTN");

		var href = newActive.getAttribute("href");
		largeImg.setAttribute("src", href);

		e.preventDefault();
		return false;
	};

})(); //End