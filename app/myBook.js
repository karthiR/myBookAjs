	"use strict";
	//store array of feed objects
	var feedArray = [];
	var count = 0;
	
	//feed constructor and its method
	function feed(){
		this.id;
		this.type;
		this.date;
	};
	feed.prototype.getId = function() {
		return this.id;
	};
	feed.prototype.getType = function() {
		return this.type;
	};
	feed.prototype.getDatetime = function() {
		return this.date;
	};
	
	//url constructor
	function UrlFeed(){
		this.url;
	}	
	//text constructor
	function textFeed(){
		this.text;		
	}
	
	//Extend the feed object
	UrlFeed.prototype = new(feed);
	textFeed.prototype = new(feed);
	
	UrlFeed.prototype.getFeed = function() {
		return this.url;
	};
	textFeed.prototype.getFeed = function() {
		return this.text;
	};	
	
	//Create new Feed record
	function createFeed(){
		count = count + 1;
		var postText = document.getElementById('postText');
		if(postText.value !=''){
			if(/:\/\//.test(postText.value)){
				var newFeed = new UrlFeed();
				newFeed.id = count;
				newFeed.type = 'Url';
				newFeed.url = postText.value;
				newFeed.date = getDate();
				console.log(newFeed instanceof UrlFeed);
			}else{
				var newFeed = new textFeed();
				newFeed.id = count;
				newFeed.type = 'text';
				newFeed.text = postText.value;
				newFeed.date = getDate();
				console.log(newFeed instanceof textFeed);
			}
			postText.value = '';
			feedArray.push(newFeed);
			updateList();
		}
		postText.focus();
	}
	//Delete the Feed record
	function deleteFeed(feedId){
	    var i;
		for(i in feedArray){
		  if(feedArray[i].id == feedId){
			feedArray.splice(i,1);
			updateList();
			return;
		  }
		}			
	}
	// Get Date&Time
	function getDate() {      
		var currentDate = new Date()
		return currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear() +" "+currentDate.getHours()+":"+currentDate.getMinutes();
	}
	//Create Feed List HTML Element
	function updateList(){
		var feedList = '';
		var f;
		var feedContainer = document.getElementById('feedContainer');

		if(!feedArray.length){
			feedContainer.innerHTML = '';
			return;
		}
		for(f in feedArray){
			if(f%2 == 0){
				feedList = feedList + '<li>';
			}else{
				feedList = feedList + '<li class="alt">';
			}
			feedList = feedList + '<div class="profileImg">';
			feedList = feedList + '<img src="../images/male.png">';
			feedList = feedList + '</div>';
			feedList = feedList + '<div class="feedContent">';
			if(feedArray[f].getType()=='Url'){
				feedList = feedList + '<p><a href="'+feedArray[f].getFeed()+'" target="_blank">'+feedArray[f].getFeed()+'</a></p>';
			}else{
				feedList = feedList + '<p>'+feedArray[f].getFeed()+'</p>';
			}
			feedList = feedList + '<time datetime="2008-02-14 20:00">'+feedArray[f].getDatetime()+'</time>';
			feedList = feedList + '</div>';
			feedList = feedList + '<span class="del" onclick="deleteFeed('+feedArray[f].getId()+')">x</span>';				
			feedList = feedList + '</li>';
			feedContainer.innerHTML = feedList;
		}
	}
	//login
	function logIn(){
	    var userName = document.getElementById('userName');
		var Password = document.getElementById('Password');
		var inValidMsg = document.getElementById('inValidMsg');
		if(userName.value == ""){
			inValidMsg.innerHTML = 'Please enter the user name.';
			userName.focus();
			return;
		}
		if(Password.value == ""){
			inValidMsg.innerHTML = 'Please enter the Password.';
			Password.focus();
			return;
		}
		if(Password.value.length < 6){
			inValidMsg.innerHTML = 'Your Password length is Too low.';
			Password.focus();
			return;
		}		
		window.location="feed/feed.html";
	}
	//redirect to home
	function logOut(){
		window.location="../index.html";
	};
	//Name Validation
	var nameFlag = false,phoneFlag = false,ageFlag = false, emailFlag = false;
	try {	
		var firstName = document.getElementById('firstName');
		firstName.onkeyup = function() {
			nameFlag = firstName.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	//Age validation
	var age = document.getElementById('age');
	try {
		age.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
				return true;
			}
			else if ( key < 48 || key > 57 ) {
				ageFlag = false;
				return false;
			}else {
				console.log('A');
				ageFlag = true;
			}
			if (age.value.length > 2){
				ageFlag = false;
				return false;
			}
		}
		age.onkeyup = function(e) {
			if (age.value > 100){
				alert('Please enter the age between 0 to 100');
				age.value = "";
				age.focus();
				ageFlag = false;
			}
			ageFlag = age.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	//Phone validation
	var phone = document.getElementById('phone');
	try {
		phone.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
				return true;
			}
			else if ( key < 48 || key > 57 ) {
				phoneFlag = false;
				return false;
			}else{
				phoneFlag = true;
				console.log('P');
			}
		}
		phone.onkeyup = function(e) {
			phoneFlag = phone.value.length ? true : false;
			checkValidation();
		}
	}
	catch(err) {}
	//Email Validation
	var email = document.getElementById('email');
	try {
		email.onkeyup = function(e) {
			var atpos = email.value.indexOf("@");
			var dotpos = email.value.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.value.length) {
				emailFlag = false;
			}else{
				emailFlag = true;
				console.log('E');
			}
			checkValidation();
		}
	}
	catch(err){}
	//validation success enable submit
	var save = document.getElementById("saveProfile");
	function checkValidation(){
		if(nameFlag== true && ageFlag == true && phoneFlag == true && emailFlag == true){
			save.removeAttribute("disabled");
			console.log('enable');
		}else{
			save.setAttribute("disabled","disabled");
			console.log('disable');
		}
	}
	
	//upload image
	var dataURL = '';
	//var profileImage = document.getElementById('profileImage');
	var openFile = function(event) {
		debugger;
		var input = event.target;
		var reader = new FileReader();
		reader.onload = function(){
		  $scope.dataURL = reader.result;
		  alert($scope.dataURL);
		  //profileImage.src = dataURL;
		};
		reader.readAsDataURL(input.files[0]);
	};
	
	//ProfileService constructor
	function ProfileService(){
		this.name;
		this.age;
		this.phone;
		this.email;
		this.address;
		this.profileImage;
	}
	ProfileService.prototype.save = function(){
		this.name = firstName.value;;
		this.age = age.value;
		this.phone = phone.value;
		this.email = email.value;
		this.address = document.getElementById('address').value;
		this.profileImage = dataURL;
		clearForm();
	}
	//Clear Form
	function clearForm(){
		document.getElementById('myform').reset();
		alert('Profile saved successfully');
		save.setAttribute("disabled","disabled");
		profileImage.src = '';
	}
	
	//Save profile data
	var saveProfile = document.getElementById('saveProfile');
	var saveData = new ProfileService();
	try {
		saveProfile.onclick = function() {
			saveData.save();
			console.log(saveData);
			return false;
		}
	}
	catch(err){}