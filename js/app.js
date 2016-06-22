var app = angular.module('myApp', ['ngRoute', 'firebase','ngTouch', 'ui.grid','ui.bootstrap','ui.grid.resizeColumns','ui.grid.selection','ui.grid.autoResize','ui.grid.pagination']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/login");
  }
});
}]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://migrantisanfrancescoonlus.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

app.config(function($routeProvider,$locationProvider,$provide){
  $routeProvider
  .when('/list', {
    controller: 'ListController',
    templateUrl: 'views/list.html',
	  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'views/login.html'
  })
  
  .when('/logout', {
    controller: 'LogoutController',
    templateUrl: 'views/logout.html'
  })
  
  .when('/add', {
    controller: 'AddController',
    templateUrl: 'views/add.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }
  })
  .when('/edit/:id', {
    controller: 'EditController',
    templateUrl: 'views/edit.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
    .when('/stampa/:id', {
    controller: 'StampaController',
    templateUrl: 'views/stampa.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
   .when('/pocketmoney', {
    controller: 'PocketMoneyController',
    templateUrl: 'views/pocketmoney.html',
	 	  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
  
   .when('/stampapocketmoney', {
    controller: 'StampaPocketMoneyController',
    templateUrl: 'views/stampapocketmoney.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
  .when('/listcentri', {
    controller: 'ListCentriController',
    templateUrl: 'views/listcentri.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
  .when('/addcentri', {
    controller: 'AddCentriController',
    templateUrl: 'views/addcentri.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
  .when('/editcentri/:id', {
    controller: 'EditCentriController',
    templateUrl: 'views/editcentri.html',
		  resolve: {
    "currentAuth": ["Auth", function(Auth) {
      return Auth.$requireAuth();
    }]
  }

  })
  .otherwise({
    redirectTo: '/login'
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

app.constant('FBURLUserProfile', 
  'https://migrantisanfrancescoonlus.firebaseio.com/userProfile/' 
  //Use the URL of your project here with the trailing slash                                                   
);

app.controller('TabsCtrl',['$scope','$location', function($scope,$location){
  $scope.tabs = [
      { link : '#/login', label : 'Login' },
	   { link : '#/logout', label : 'Logout' },
      { link : '#/listcentri', label : 'Centri Accoglianza' },
      { link : '#/list', label : 'Anagrafica Migranti' },
	  { link : '#/pocketmoney', label : 'Pocket Money' },
	  
	  
    ]; 
    
  $scope.currentSelectedTab ={};
  $scope.currentSelectedTab.selectedTab = $scope.tabs[0];    
  $scope.setSelectedTab = function(tab) {
    $scope.currentSelectedTab.selectedTab = tab;
  }
  
  $scope.tabClass = function(tab) {
    if ($scope.currentSelectedTab.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
}]);