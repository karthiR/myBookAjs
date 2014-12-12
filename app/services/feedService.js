myapp.factory('feedService',function(){
	var feeds = [];
	return {
		add:function(tempFeed){
			feeds.push(tempFeed);
			console.log(feeds);
			return feeds;
		},
		delete:function(index){
			for(var i=0;i<= feeds.length;i++){
				if(feeds[i].id == index){
					feeds.splice(i,1);
					return feeds;
				}
			}
		}
	}
});
myapp.filter('dateFilter',function($filter){
	return function(input){
		return $filter('date')(input, 'MM-dd-yyyy h:mm a');
	}
});