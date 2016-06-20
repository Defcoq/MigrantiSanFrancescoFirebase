var app = angular.module('myApp', ['ngRoute', 'firebase','ngTouch', 'ui.grid','ui.bootstrap','ui.grid.resizeColumns','ui.grid.selection','ui.grid.autoResize','ui.grid.pagination']);

app.config(function($routeProvider,$locationProvider,$provide){
  $routeProvider
  .when('/', {
    controller: 'ListController',
    templateUrl: 'views/list.html'
  })
  .when('/add', {
    controller: 'AddController',
    templateUrl: 'views/add.html'
  })
  .when('/edit/:id', {
    controller: 'EditController',
    templateUrl: 'views/edit.html'

  })
    .when('/stampa/:id', {
    controller: 'StampaController',
    templateUrl: 'views/stampa.html'

  })
   .when('/pocketmoney', {
    controller: 'PocketMoneyController',
    templateUrl: 'views/pocketmoney.html'

  })
  
   .when('/stampapocketmoney', {
    controller: 'StampaPocketMoneyController',
    templateUrl: 'views/stampapocketmoney.html'

  })
  .when('/listcentri', {
    controller: 'ListCentriController',
    templateUrl: 'views/listcentri.html'

  })
  .when('/addcentri', {
    controller: 'AddCentriController',
    templateUrl: 'views/addcentri.html'

  })
  .when('/editcentri/:id', {
    controller: 'EditCentriController',
    templateUrl: 'views/editcentri.html'

  })
  .otherwise({
    redirectTo: '/'
  });
   $locationProvider.html5Mode(false);
   
   $provide.decorator("$firebaseObject", function($delegate) {
    var _super = $delegate.prototype.$save;
    
    $delegate.prototype.$save = function(snap) {

        var changed = _super.call(this, snap);


        if( this.hasOwnProperty("datanascita") ) {
		    console.log("prima la data era =>>");
			console.log(this.datanascita);
            this.datanascita = new Date(this.datanascita).toJSON().slice(0,19);
			console.log("insideeeeeeeeeeeeeee decoratore");
			console.log(this.datanascita);
        }
        return changed;
    };
    
    return $delegate;
});
});

app.constant('FBURL', 
  'https://migrantisanfrancescoonlus.firebaseio.com/anagraficamigranti/' 
  //Use the URL of your project here with the trailing slash                                                   
);

app.constant('FBURLCountries', 
  'https://migrantisanfrancescoonlus.firebaseio.com/countries/' 
  //Use the URL of your project here with the trailing slash                                                   
);

app.constant('FBURLCentri', 
  'https://migrantisanfrancescoonlus.firebaseio.com/centri/' 
  //Use the URL of your project here with the trailing slash                                                   
);

app.controller('TabsCtrl',['$scope','$location', function($scope,$location){
  $scope.tabs = [
      { link : '#/listcentri', label : 'Centri Accoglianza' },
      { link : '#/', label : 'Anagrafica Migranti' },
	  { link : '#/pocketmoney', label : 'Pocket Money' },
    ]; 
    
  $scope.selectedTab = $scope.tabs[1];    
  $scope.setSelectedTab = function(tab) {
    $scope.selectedTab = tab;
  }
  
  $scope.tabClass = function(tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
}]);