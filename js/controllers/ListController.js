app.controller('ListController', ['$scope', '$firebaseArray', 'FBURL','FBURLCentri','centriSvc','anagraficaSvc','currentAuth', function($scope,$firebaseArray, FBURL,FBURLCentri,centriSvc,anagraficaSvc,currentAuth){
  var anagraficamigranti = new Firebase(FBURL);
  var anagrafica = $firebaseArray(anagraficamigranti);
  console.log(anagrafica);
  $scope.anagraficamigranti = anagrafica;
  
   var centriAccoglienza = new Firebase(FBURLCentri);
   var centri = $firebaseArray(centriAccoglienza);
   $scope.centri = centri;
  //anagraficaSvc removeAndRemoveReferenceFromCentro
  $scope.removeAnagrafica = function(id) {
    var ref = new Firebase(FBURL + id);
    var anagraficaMigrante = $firebaseObject(ref);
	anagraficaSvc.removeAndRemoveReferenceFromCentro(anagraficaMigrante);
    //anagraficaMigrante.$remove();
   };
   
    $scope.centroaccoglienzacorrente = null;
    $scope.$watch(function () {
	console.log(" 1---il centro corrente è cambiato !!!!!");
      return $scope.centroaccoglienzacorrente;
    }, function () {
      centriSvc.setCurrentCentro($scope.centroaccoglienzacorrente);
        console.log(" 2--il centro corrente è cambiato !!!!!");
		console.log($scope.centroaccoglienzacorrente);
      if ($scope.centroaccoglienzacorrente) {
       
      }
    });
   
    $scope.gridOptions = {
	data: $scope.anagraficamigranti,
    enableFiltering: true,
	selectionRowHeaderWidth: 35,
	rowHeight:40,
    paginationPageSizes: [10, 20, 30],
    paginationPageSize: 10,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'cognome',displayName:'Cognome'},
      { field: 'nome',displayName:'Nome'},
	  { field: 'cittadinanza',displayName:'Cittadinanza'},
	  { field: 'centro',displayName:'Centro Accoglienza'},
	  { field: 'createby',displayName:'Creato da'},
	  { field: 'updateby',displayName:'Modificato da'},
	   {
    field: 'Action', enableFiltering: false, displayName:'Azione', enableColumnResizing: false, width:'30%',
    cellTemplate: ' <div class="ui-grid-cell-contents"><a href="#/stampa/{{row.entity.$id}}" class="btn btn-success btn-primary">Stampa</a><a href="#/edit/{{row.entity.$id}}" class="btn btn-small btn-primary">Modifica</a>  <a class="btn btn-small btn-danger" ng-click="removeAnagrafica(row.entity.$id)">Elimina</a></div>'
    }
 
    ]
  };
  
  $scope.getTableHeight = function() {
       var rowHeight = 40; // your row height
       var headerHeight = 40; // your header height paginationPageSize $scope.gridOptions.data.length
	   if($scope.gridOptions.data.length > $scope.gridOptions.paginationPageSize)
	   {
	    return {
          height: ($scope.gridOptions.paginationPageSize * rowHeight + headerHeight +80) + "px" 
       };
	   }
	   else
	   {
	     return {
          height: ($scope.gridOptions.data.length* rowHeight + headerHeight +80) + "px"
       };
	   }
      
    };
   
  
}]);