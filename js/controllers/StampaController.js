app.controller('StampaController', ['$scope','$location', '$routeParams', '$firebaseObject', 'FBURL', 'FBURLCountries', '$firebaseArray', 
    function($scope, $location, $routeParams, $firebaseObject, FBURL,FBURLCountries,$firebaseArray){

  
    var ref = new Firebase(FBURL + $routeParams.id);
    $scope.anagrafica = $firebaseObject(ref);
	
	var countriesRef = new Firebase(FBURLCountries);
  var countries = $firebaseArray(countriesRef);
  $scope.states = countries;
  console.log("state from firebase");
  console.log($scope.states);

    $scope.editAnagrafica = function() {
        $scope.anagrafica.$save({
            cognome: $scope.anagrafica.nome,
            nome: $scope.anagrafica.cognome,
            codicefiscale: $scope.anagrafica.codicefiscale,
			
			datanascita: $scope.anagrafica.datanascita,
            luogonascita: $scope.anagrafica.luogonascita,
            provenienza: $scope.anagrafica.provenienza,
			
			
			cittadinanza: $scope.anagrafica.cittadinanza,
            dataingressoitalia: $scope.anagrafica.dataingressoitalia,
            cittaingresso: $scope.anagrafica.cittaingresso,
			
			paesetransito: $scope.anagrafica.paesetransito,
            linguaparlata: $scope.anagrafica.linguaparlata,
            religione: $scope.anagrafica.religione,
			
			primocentrodiaccoglienza: $scope.anagrafica.primocentrodiaccoglienza,
            indirizzocentro: $scope.anagrafica.indirizzocentro,
            medicocurante: $scope.anagrafica.medicocurante,
			
			situazionesanitario: $scope.anagrafica.situazionesanitario,
            datacommissione: $scope.anagrafica.datacommissione,
            esitocommissione: $scope.anagrafica.esitocommissione,
			
			ricorso: $scope.anagrafica.ricorso,
            studioavvocato: $scope.anagrafica.studioavvocato,
            note: $scope.anagrafica.note,
        });
        $scope.edit_form.$setPristine();
        $scope.anagrafica = {};
        $location.path('/products');

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
  
}]);