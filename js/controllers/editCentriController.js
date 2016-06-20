app.controller('EditCentriController', ['$scope','$location', '$routeParams', '$firebaseObject', 'FBURL', 'FBURLCountries', '$firebaseArray', 'FBURLCentri',
    function($scope, $location, $routeParams, $firebaseObject, FBURL,FBURLCountries,$firebaseArray,FBURLCentri){

    var ref = new Firebase(FBURL + $routeParams.id);
	var anag = $firebaseObject(ref);

    $scope.anagrafica = anag;
	
	var refCent = new Firebase(FBURLCentri + $routeParams.id);
	var centr = $firebaseObject(refCent);

    $scope.centro = centr;
	
  var countriesRef = new Firebase(FBURLCountries);
  var countries = $firebaseArray(countriesRef);
  $scope.states = countries;

    $scope.editCentro = function() {
	
        $scope.centro.$save({
            nome: $scope.centro.nome,
            luogo: $scope.centro.luogo
           
        });
        $scope.edit_form.$setPristine();
        $scope.centro = {};
        $location.path('/listcentri');

    };
	
	$scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

    $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yyyy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  
    // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
  
  
    $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  
  $scope.popup2 = {
    opened: false
  };
  
  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  
  $scope.popup3 = {
    opened: false
  };
  
  //lingueparlate
  $scope.paesitransitati = [{id: 'paese1'}, {id: 'paese2'}];
  
  $scope.lingueparlate = [{id: 'lingua1'}, {id: 'lingua2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.paesitransitati.length+1;
    $scope.paesitransitati.push({'id':'paese'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.paesitransitati.length-1;
    $scope.paesitransitati.splice(lastItem);
  };
  
  $scope.addNewLinguaParlato = function() {
    var newItemNo = $scope.lingueparlate.length+1;
    $scope.lingueparlate.push({'id':'lingua'+newItemNo});
  };
    
  $scope.removeLinguaParlato = function() {
    var lastItem = $scope.lingueparlate.length-1;
    $scope.lingueparlate.splice(lastItem);
  };
  
  $scope.$watch("anagrafica.datanascita", function(newValue, oldValue) {
    $scope.anagrafica.datanascitastring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	var dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)? newValue.getTime() : newValue;
	$scope.anagrafica.datanascitatimestamp = dataNascitaDaSalvare;
	console.log($scope.anagrafica.datanascitastring);
	console.log($scope.anagrafica.datanascitatimestamp);
});

$scope.$watch("anagrafica.dataingressoitalia", function(newValue, oldValue) {
    $scope.anagrafica.dataingressoitaliastring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	var dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)? newValue.getTime() : newValue;
	$scope.anagrafica.dataingressoitaliatimestamp = dataNascitaDaSalvare;
	console.log($scope.anagrafica.dataingressoitaliastring);
	console.log($scope.anagrafica.dataingressoitaliatimestamp);
});

$scope.$watch("anagrafica.datacommissione", function(newValue, oldValue) {
    $scope.anagrafica.datacommissionestring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	var dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)? newValue.getTime() : newValue;
	$scope.anagrafica.datacommissionetimestamp = dataNascitaDaSalvare;
	console.log($scope.anagrafica.datacommissionestring);
	console.log($scope.anagrafica.datacommissionetimestamp);
});


}]);