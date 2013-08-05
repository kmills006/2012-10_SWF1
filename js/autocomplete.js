/* 
	Kristy Miller
	Lab 7 - Auto Completer
*/

(function(){
	var searchForm = document.querySelector("#searchForm");
	searchForm.onsubmit = function(e){
		e.preventDefault();
		return false;
	};

	var contactSearch = document.querySelector("#contactSearch");
	contactSearch.autocomplete = "off";

	var searchResults = document.querySelector("#searchResults");

	var callAjax = function(contact){
		kam.ajax({
			url: "xhr/getpeople.php",
			data: {
				search: contact
			},
			success: function(results){
				createResultList(results);
			}
		}); // End of Ajax
	};

	var createResultList = function(results){
		var jsonData = results.data;

		if(jsonData.length < 1){
			console.log("No Results");
			
			while(searchResults.hasChildNodes()){
				searchResults.removeChild(searchResults.firstChild);
			};

			searchResults.style.display = "block";
			searchResults.innerHTML = "<h2>No Results Found</h2>";
		}else{
			kam(jsonData).each(function(){
				// while(searchResults.hasChildNodes()){
				// 	searchResults.removeChild(searchResults.firstChild);
				// };

				searchResults.style.display = "block";
				searchResults.innerHTML += "<div id=\'user'\><p class=\'name'\>" + this.name + "</p><p class =\'userInformation'\>Email: " + this.email + "</p><p class=\'userInformation'\>Friends: " + this.friends + "</p></div>";
				searchResults.firstChild.nextSibling.setAttribute("class", "resultsActive");
				// searchResults.firstChild.setAttribute("class", "resultsActive");
			}); // End of Each
		}; // End of If/Else
	}; // End of createResultList

	contactSearch.onkeyup = function(e){
		var contact = contactSearch.value;
		var keyCode = e.keyCode;

		switch (keyCode){
			case 27:
				searchResults.style.display = "none";
				break;
			case 38:
				var activeContact = document.querySelector(".resultsActive");

				if(activeContact.previousSibling.previousSibling){
					activeContact.setAttribute("class", "");	
					activeContact.previousSibling.setAttribute("class", "resultsActive");
				}else{
					activeContact.setAttribute("class", "");
					activeContact.parentNode.lastChild.setAttribute("class", "resultsActive");
				}
				break;
			case 40:
				var activeContact = document.querySelector(".resultsActive");

				if(activeContact.nextSibling){
					activeContact.setAttribute("class", "");
					activeContact.nextSibling.setAttribute("class", "resultsActive");
				}else{
					activeContact.setAttribute("class", "");
					activeContact.parentNode.firstChild.nextSibling.setAttribute("class", "resultsActive");
				};
				break;
			case 13:
				var activeContact = document.querySelector(".resultsActive");
				var userEmail = activeContact.firstChild.nextSibling.innerHTML;
				var newEmail = userEmail.slice(7);
				contactSearch.value = newEmail;

				searchResults.style.display = "none";
				break;
			default:
				callAjax(contact);
		};

		if(contact.length > 3){
			searchResults.style.display = "none";
		};

		e.preventDefault();
		return false;
	};
})();  // End