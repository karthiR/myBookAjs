myapp.controller('mainCtrl',function($scope,$location,loginService){
	$scope.loginCredential = loginService();
	$scope.logIn =function(){
		if($scope.loginCredential.userId == ""){
			$scope.loginCredential.inValidMsg = 'Please enter the user name.';
			return;
		}
		if($scope.loginCredential.PassCode == ""){
			$scope.loginCredential.inValidMsg = 'Please enter the Password.';
			return;
		}
		if($scope.loginCredential.PassCode.length < 6){
			$scope.loginCredential.inValidMsg = 'Your Password length is Too low.';
			return;
		}
		$scope.loginCredential.userId = '';
		$scope.loginCredential.PassCode = '';
		$scope.loginCredential.inValidMsg = '';
		$scope.logged = true;
		$location.path('/feed');
	}
	$scope.logOut = function(){
		$scope.logged = false;
		$location.path('/');
	}
});