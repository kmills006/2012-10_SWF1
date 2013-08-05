/* 
	Kristy Miller
	SFW1 - October 4th, 2012

	Regular Expressions 

	First Name - /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
	Last Name - /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
	Username - /^[a-z0-9_-]{6,16}$/
	Password - /^[a-z0-9_-]{6,18}$/
	Email Address - /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	Phone Number - /^[2-9]\d{2}-\d{3}-\d{4}$/
*/

(function(){

	var form = document.querySelector("#myform");
	form.onsubmit = function(e){
		e.preventDefault();
		return false;
	};

	// Input Fields
	var fName_input = document.querySelector("#firstName"),
		lName_input = document.querySelector("#lastName"),
		username_input = document.querySelector("#username"),
		password_input = document.querySelector("#password"),
		cPassword_input = document.querySelector("#cPassword"),
		email_input = document.querySelector("#email"),
		phone_input = document.querySelector("#phoneNumber");

	// Patterns
	var namePattern = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/,
		usernamePattern = /^[a-z0-9_-]{6,16}$/,
		passwordPattern = /^[a-z0-9_-]{6,18}$/,
		emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		phonePattern =  /^[2-9]\d{2}-\d{3}-\d{4}$/;

	// Validation Icon
	var icons = document.querySelectorAll(".icon");

	// Validation Check
	var userInput = function(inputField, pattern, icon){
		inputField.onkeyup = function(e){
			var pass = pattern.test(inputField.value);
			var errorMsg = inputField.nextSibling.nextSibling.nextSibling.nextSibling;

			// Checking if inputs pass and setting the errorMsg accordingly
			if(!pass){
				errorMsg.style.display = "block";
				icon.setAttribute("src", "imgs/icons/x.png");
				icon.style.display = "inline";
			}else{
				errorMsg.style.display = "none";
				icon.setAttribute("src", "imgs/icons/check.png");
				icon.style.display = "inline";
			};

			// Checking if passwords match
			if(inputField == cPassword_input && cPassword_input.value != password_input.value){
				errorMsg.style.display = "block";
				icon.setAttribute("src", "imgs/icons/x.png");
			};

			// Checking if TAB was clicked so errorMsg won't fire
			if(e.keyCode == 9){
				errorMsg.style.display = "none";
				icon.style.display = "none";
			};

			e.preventDefault();
			return false;
		};
	}; // End of userInput

	// Testing Users Input
	userInput(fName_input, namePattern, icons[0]); // First Name
	userInput(lName_input, namePattern, icons[1]); // Last Name
	userInput(username_input, usernamePattern, icons[2]); // Username
	userInput(password_input, passwordPattern, icons[3]); // Password
	userInput(cPassword_input, passwordPattern, icons[4]); // Confirm Password
	userInput(email_input, emailPattern, icons[5]); // Email
	userInput(phone_input, phonePattern, icons[6]); // Phone Number

})();  // End