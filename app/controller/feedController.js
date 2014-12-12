myapp.controller('feedCtrl',function($scope,feedService){
	$scope.feeds = [];
	$scope.postText = '';
	var count = 0;
	var type = '';
	var getDatetime = new Date;
	$scope.createFeed = function(){
		var postData = $scope.postText.toLowerCase();
		if(postData != ''){
			debugger;
			if((/:\/\//.test(postData)) || (/www\.+[a-z]+\.+[a-z]/i.test(postData))){
				type = 'url';
				if(postData.indexOf('www') == 0){
					postData = 'http://'+postData;
				};
			}else{
				type = 'text';
			}
			tempFeed = {
				id:count++,
				type:type,
				postData:postData,
				date:getDatetime
			};
			$scope.feeds = feedService.add(tempFeed);
			$scope.postText = '';
		}
	}
	$scope.deleteFeed = function(index){
		$scope.feeds = feedService.delete(index);
	}
});