myapp.factory('saveProfileService',function(){
	var ProfileService = [];
	return function(profile){
		ProfileService.push(profile);
		alert('Profile saved successfully');
		console.log(ProfileService);
	}	
});