app.controller('LogoutController', ['$scope','$firebaseAuth','$location',function($scope,$firebaseAuth,$location) {
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
				}).catch(function(error){
					console.log(error);
				});
	
}

$scope.Logout = function()
{
console.log("I am trying to logout");
console.log(authUser);
 authUser.$unauth();
  $location.path('/login');
}

}]);