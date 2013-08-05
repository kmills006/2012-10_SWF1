/* 
	Kristy Miller
	SFW1 - October 9th, 2012
*/

(function(){

	var posts = document.querySelector("#posts");
	var categories = document.querySelectorAll("#categories li a");
	var limitPosts = document.querySelector("#postsPerPage");
	var limit = limitPosts.options[limitPosts.selectedIndex].value;
	var category = "";

	//postLimit onchange
	limitPosts.onchange = function(e){
		posts.innerHTML = "";
		limit = this.options[this.selectedIndex].value;

		ajaxCall(category, limit);

		e.preventDefault();
		return false;
	};

	//createPosts
	var createPosts = function(results){
		var jsonData = results.data;
		
		kam(jsonData).each(function(){
			posts.innerHTML += "<h2 class=\'bTitle'\>" + this.title + "</h2><p class=\'postedBy'\>Posted by  <span class=\'un'\>" + this.author + "</span> on " + this.datetime + "</p><p class=\'post'\>" + this.content + "</p>";
		});
	};

	// Looping though each of the links and adding an onclick to them. 
	kam(categories).each(function(){
		this.onclick = function(e){
			posts.innerHTML = "";
			category = this.getAttribute("id");

			// Checking if the category clicked was all
			if(category == "all"){
				category = "";
			};

			ajaxCall(category, limit);

			e.preventDefault();
			return false;
		};
	});

	//ajaxCall
	var ajaxCall = function(category, limit){
		kam.ajax({
			url: "xhr/getposts.php",
			data: {
				category: category,
				limit: limit
			},
			success: function(results){
				createPosts(results);
			}
		}); // End of Ajax
	};

	ajaxCall(category, limit);

})();  // End