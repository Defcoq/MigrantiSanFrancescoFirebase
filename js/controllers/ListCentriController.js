app.controller('ListCentriController', ['$scope', '$firebaseArray', 'FBURL','FBURLCentri','$location','currentAuth', function($scope,$firebaseArray, FBURL,FBURLCentri,$location,currentAuth){
  var anagraficamigranti = new Firebase(FBURL);
  var anagrafica = $firebaseArray(anagraficamigranti);
   $scope.IsDataLOad = false;
  	anagrafica.$loaded().then(
	function(data)
	{
	$scope.anagraficamigranti = data;
	$scope.IsDataLOad = true;
	}
	).catch(function(err)
	{
	  console.log(err);
	});
  //$scope.anagraficamigranti = anagrafica;
  
  var centriAccoglienza = new Firebase(FBURLCentri);
  var centri = $firebaseArray(centriAccoglienza);
  $scope.centri = centri;
  
  $scope.removeCentro = function(id) {
  console.log("inside remove center");
  console.log(id);
    var ref = new Firebase(FBURLCentri + id);
    var centro = $firebaseObject(ref)
    centro.$remove();
	 $location.path('/listcentri');
   };
   
    $scope.gridOptions = {
	data: $scope.centri,
    enableFiltering: true,
	selectionRowHeaderWidth: 35,
	rowHeight:40,
    paginationPageSizes: [10, 20, 30],
    paginationPageSize: 10,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'nome',displayName:'Nome Centro'},
      { field: 'luogo',displayName:'Indirizzo e Luogo Centro'},
	   {
    field: 'Action', enableFiltering: false, displayName:'Azione', enableColumnResizing: false,
    cellTemplate: ' <div class="ui-grid-cell-contents"><a href="#/editcentri/{{row.entity.$id}}" class="btn btn-small btn-primary">Modifica</a>  <a class="btn btn-small btn-danger" ng-click="removeCentro(row.entity.$id)">Elimina</a></div>'
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