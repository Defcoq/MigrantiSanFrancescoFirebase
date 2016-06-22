app.controller('LoginController', ['$scope','$firebaseAuth','$location',function($scope,$firebaseAuth,$location) {
$scope.data = {};
 var ref = new Firebase("https://migrantisanfrancescoonlus.firebaseio.com"); 
	var authUser = $firebaseAuth(ref);
	
 $scope.SignIn = function() {
 event.preventDefault();  // To prevent form refresh
    var username = $scope.data.email;
    var password = $scope.data.password;
     console.log(username);
	 console.log(password);
    // Auth Logic will be here
	authUser.$authWithPassword({
					"email": username,
					"password": password
				}).then (function(authData){
					console.log("loggatto con sucessooooooooo");
					console.log("tab dal controller di base =>");
					console.log($scope.tabs);
					 $scope.currentSelectedTab.selectedTab = $scope.tabs[3];
					$location.path('/list');
					
				}).catch(function(error){
					console.log(error);
					 $location.path('/login');
				});
	
}

$scope.Logout = function()
{
console.log("I am trying to logout");
console.log(authUser);
authUser.$unauth();
$scope.currentSelectedTab.selectedTab = $scope.tabs[0];
  $location.path('/login');
}

}]);