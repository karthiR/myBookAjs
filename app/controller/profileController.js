myapp.controller('profileCtrl',function($scope,saveProfileService, fileReader){
	$scope.profile = {};
	$scope.inValidAge = true;
	$scope.inValidEmail = true;
	$scope.profile.img = '';
	$scope.saveProfile = function(){
		saveProfileService($scope.profile);
		$scope.profile = {};
	}
	$scope.checkAge = function(){
		if ($scope.profile.age > 100){
			$scope.inValidAge = true;
			$scope.profile.age = '';
			alert('Please enter the age between 0 to 100');		
		}else{
			$scope.inValidAge = false;
		}	
	}
    console.log(fileReader)
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
            $scope.imageSrc = result;
			$scope.profile.img = result;
			console.log($scope.profile.img);
        });
    };
});