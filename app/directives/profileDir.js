myapp.directive('onlyNum', function() {
	return function(scope, element, attrs) {
		element.on('keydown', function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if (key == 8 || key == 9 || key == 46 || key == 37 || key == 39) {
			}
			else if ( key < 48 || key > 57) {
				e.preventDefault();
			}
		});
	};
});

myapp.directive('validateEmail', function() {
	return function($scope, element, attrs) {
		element.on('keyup', function() {
			var atpos = $scope.profile.email.indexOf("@");
			var dotpos = $scope.profile.email.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=$scope.profile.email.length) {
				$scope.inValidEmail = true;
			}else{
				$scope.inValidEmail = false;
			}
		});
	};
});

myapp.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    }
  }
})