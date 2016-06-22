app.controller('EditController', ['$scope','$location', '$routeParams', '$firebaseObject', 'FBURL', 'FBURLCountries', '$firebaseArray', 'currentAuth','FBURLUserProfile',
    function($scope, $location, $routeParams, $firebaseObject, FBURL,FBURLCountries,$firebaseArray,currentAuth,FBURLUserProfile){

    var ref = new Firebase(FBURL + $routeParams.id);
	var anag = $firebaseObject(ref);

    $scope.anagrafica = anag;
	
	 var ref = new Firebase(FBURLUserProfile + currentAuth.uid);
	var userprofile = $firebaseObject(ref);
    	userprofile.$loaded().then(
	function(data)
	{
	 $scope.anagrafica.updateby = data.name + "-" + data.email;
	 $scope.anagrafica.updateat = moment(new Date()).format("DD/MM/YYYY");
	}).catch(function(err)
	{
	  console.log(err);
	});
	
  var countriesRef = new Firebase(FBURLCountries);
  var countries = $firebaseArray(countriesRef);
  $scope.states = countries;
  console.log("state from firebase");
  console.log($scope.states);
  $scope.anagrafica.datanascita = moment($scope.anagrafica.datanascitastring).format('YYYY-MM-DD');
    $scope.editAnagrafica = function() {
	
	  console.log("data nascita ===>");
      console.log($scope.anagrafica.datanascita);
      console.log(moment($scope.anagrafica.datanascita).format('YYYY-MM-DD'));
	  console.log(moment($scope.anagrafica.datanascita).unix());
	  console.log(moment.unix($scope.anagrafica.datanascita).toDate());
	  var isAnumber = isNaN($scope.anagrafica.datanascita);
	  console.log("is a number???");
	  console.log(isAnumber);
	  var isDateObject = $scope.anagrafica.datanascita instanceof Date;
	  console.log("is a date object???");
	  console.log(isDateObject);
	  var dataNascitaDaSalvare = (isNaN($scope.anagrafica.datanascita) || $scope.anagrafica.datanascita instanceof Date)? $scope.anagrafica.datanascita.getTime() : $scope.anagrafica.datanascita;
	  
	  console.log();
  
  // $scope.anagrafica.$save
        $scope.anagrafica.$save({
            cognome: $scope.anagrafica.nome,
            nome: $scope.anagrafica.cognome,
            codicefiscale: $scope.anagrafica.codicefiscale,
			
			datanascita:dataNascitaDaSalvare ,
			datanascitatimestamp:dataNascitaDaSalvare,
			datanascitastring: moment($scope.anagrafica.datanascita).format('DD/MM/YYYY'),
            luogonascita: $scope.anagrafica.luogonascita,
            provenienza: $scope.anagrafica.provenienza,
			
			
			cittadinanza: $scope.anagrafica.cittadinanza,
            dataingressoitalia: moment($scope.anagrafica.dataingressoitalia).format('DD/MM/YYYY'),
			dataingressoitaliastring :$scope.anagrafica.dataingressoitaliastring,
			dataingressoitaliatimestamp :$scope.anagrafica.dataingressoitaliatimestamp,
            cittaingresso: $scope.anagrafica.cittaingresso,
			
			paesetransito: $scope.anagrafica.paesetransito,
            linguaparlata: $scope.anagrafica.linguaparlata,
            religione: $scope.anagrafica.religione,
			
			primocentrodiaccoglienza: $scope.anagrafica.primocentrodiaccoglienza,
            indirizzocentro: $scope.anagrafica.indirizzocentro,
            medicocurante: $scope.anagrafica.medicocurante,
			
			situazionesanitario: $scope.anagrafica.situazionesanitario,
            datacommissione: $scope.anagrafica.datacommissione,
			datacommissionestring : $scope.anagrafica.datacommissionestring,
			datacommissionetimestamp : $scope.anagrafica.datacommissionetimestamp,
            esitocommissione: $scope.anagrafica.esitocommissione,
			
			ricorso: $scope.anagrafica.ricorso,
            studioavvocato: $scope.anagrafica.studioavvocato,
            note: $scope.anagrafica.note,
			updateby: $scope.anagrafica.updateby,
	        updateat: moment(new Date()).format("DD/MM/YYYY"),
        });
        $scope.edit_form.$setPristine();
        $scope.anagrafica = {};
        $location.path('/anagrafiche');

    };
	
	$scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
   $scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

    $scope.dateOptions = {
    //dateDisabled: disabled,
    formatYear: 'yyyy',
    //maxDate: new Date(2020, 5, 22),
   // minDate: new Date(),
    //startingDay: 1
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
  
    if(newValue)
	{
    $scope.anagrafica.datanascitastring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	var dataNascitaDaSalvare ;
	if(newValue)
	{
	if(newValue !="yyyy-MM-dd")
	{
		dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)?  moment(newValue).toDate().getTime() : newValue;
		$scope.anagrafica.datanascitatimestamp = dataNascitaDaSalvare;
		console.log($scope.anagrafica.datanascitastring);
		console.log($scope.anagrafica.datanascitatimestamp);
	}
	}
	}
  
});

$scope.$watch("anagrafica.dataingressoitalia", function(newValue, oldValue) {
   if(newValue)
	{
    $scope.anagrafica.dataingressoitaliastring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	if(newValue)
	{
	if(newValue !="yyyy-MM-dd")
	{
	dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)? moment(newValue).toDate().getTime() : newValue;
	$scope.anagrafica.dataingressoitaliatimestamp = dataNascitaDaSalvare;
	console.log($scope.anagrafica.dataingressoitaliastring);
	console.log($scope.anagrafica.dataingressoitaliatimestamp);
	}
	}
	}
});

$scope.$watch("anagrafica.datacommissione", function(newValue, oldValue) {
  if(newValue )
	{
    $scope.anagrafica.datacommissionestring = moment(newValue).format('DD/MM/YYYY');
	console.log("valore delle date dal watchhhh");
	console.log(newValue);
	console.log(oldValue);
	if(newValue)
	{
	if(newValue !="yyyy-MM-dd")
	{
	dataNascitaDaSalvare = (isNaN(newValue) || newValue instanceof Date)? moment(newValue).toDate().getTime() : newValue;
	$scope.anagrafica.datacommissionetimestamp = dataNascitaDaSalvare;
	console.log($scope.anagrafica.datacommissionestring);
	console.log($scope.anagrafica.datacommissionetimestamp);
	}
	}
  }
});


}]);