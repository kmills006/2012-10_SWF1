/* 

	Regular Expressions 

	First Name - /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
	Last Name - /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
	Username - /^[a-z0-9_-]{6,16}$/
	Password - /^[a-z0-9_-]{6,18}$/
	Email Address - /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	Phone Number - /^[2-9]\d{2}-\d{3}-\d{4}$/

*/

(function(){

	var regForm = document.querySelector("#myform");
	regForm.onsubmit = function(e){
		e.perventDefault();
		return false;
	};

	// Patterns
	var namePattern = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/; // Used for both first and last names
	var usernamePattern = /^[a-z0-9_-]{6,16}$/;
	var passwordPattern = /^[a-z0-9_-]{6,18}$/;
	var emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	var phonePattern =  /^[2-9]\d{2}-\d{3}-\d{4}$/;

	// First Name
	var fName_input = document.querySelector("#firstName");

	fName_input.onkeyup = function(e){
		var pass = namePattern.test(fName_input.value);
		var errorMsg = fName_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};
	};

	// Last Name
	var lName_input = document.querySelector("#lastName");

	lName_input.onkeyup = function(e){
		var pass = namePattern.test(lName_input.value);
		var errorMsg = lName_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};
	};

	// Username
	var username_input = document.querySelector("#username");

	username_input.onkeyup = function(e){
		var pass = usernamePattern.test(username_input.value);
		var errorMsg = username_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};		
	};

	// Password
	var password_input = document.querySelector("#password");

	password_input.onkeyup = function(e){
		var pass = passwordPattern.test(password_input.value);
		var errorMsg = password_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};
	};

	// Confirm Password 
	var cPassword_input = document.querySelector("#cPassword");

	cPassword_input.onkeyup = function(e){
		var errorMsg = cPassword_input.nextSibling.nextSibling;

		if(password_input.value != cPassword_input.value){
			errorMsg.style.display = "block";	
		}else{
			errorMsg.style.display = "none";
		}
	};

	// Email
	var email_input = document.querySelector("#email");

	email_input.onkeyup = function(e){
		var pass = emailPattern.test(email_input.value);
		var errorMsg = email_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};		
	};
	
	// Phone Number
	var phone_input = document.querySelector("#phoneNumber");

	phone_input.onkeyup = function(e){
		var pass = phonePattern.test(phone_input.value);
		var errorMsg = phone_input.nextSibling.nextSibling;

		if(!pass){
			errorMsg.style.display = "block";
		}else{
			errorMsg.style.display = "none";
		};		
	};

})();  // End