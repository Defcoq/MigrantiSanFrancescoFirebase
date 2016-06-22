app.controller('AddController', ['$scope', '$firebaseArray', '$location', 'FBURL','FBURLCountries','$firebaseArray','FBURLCentri','centriSvc','anagraficaSvc','currentAuth', 'FBURLUserProfile','$firebaseObject',
function($scope, $firebaseArray, $location, FBURL,FBURLCountries,$firebaseArray,FBURLCentri,centriSvc,anagraficaSvc,currentAuth,FBURLUserProfile,$firebaseObject){

 var countriesRef = new Firebase(FBURLCountries);
  var countries = $firebaseArray(countriesRef);
  $scope.states = countries;
  
   var centriAccoglienza = new Firebase(FBURLCentri);
   var centri = $firebaseArray(centriAccoglienza);
   $scope.centri = centri;
  
  $scope.addAnagrafica = function() {
  
  console.log("data nascita ===>");
  console.log($scope.anagrafica.datanascita);
  console.log(moment($scope.anagrafica.datanascita).format('DD/MM/YYYY'));
    var ref = new Firebase(FBURL);
    var anagrafica = $firebaseArray(ref);
	var anagraficaObject = {
	        centro : $scope.centroaccoglienzacorrente,
            cognome: $scope.anagrafica.nome ? $scope.anagrafica.nome :"",
            nome: $scope.anagrafica.cognome ? $scope.anagrafica.cognome : "",
            codicefiscale: $scope.anagrafica.codicefiscale ? $scope.anagrafica.codicefiscale :"",
			
			datanascita: $scope.anagrafica.datanascita ? $scope.anagrafica.datanascita.getTime() : "yyyy-MM-dd",
			datanascitatimestamp:  $scope.anagrafica.datanascita ? $scope.anagrafica.datanascita.getTime() : "yyyy-MM-dd",
			datanascitastring: $scope.anagrafica.datanascita ? moment($scope.anagrafica.datanascita).format('DD/MM/YYYY'):"DD/MM/YYYY",
            luogonascita: $scope.anagrafica.luogonascita ?  $scope.anagrafica.luogonascita: "",
            provenienza: $scope.anagrafica.provenienza ? $scope.anagrafica.provenienza : "",
			
			
			cittadinanza: $scope.anagrafica.cittadinanza ? $scope.anagrafica.cittadinanza :"",
            dataingressoitalia: $scope.anagrafica.dataingressoitalia ? $scope.anagrafica.dataingressoitalia.getTime() : "yyyy-MM-dd",
			dataingressoitaliatimestamp:  $scope.anagrafica.dataingressoitalia ? $scope.anagrafica.dataingressoitalia.getTime() : "yyyy-MM-dd",
			dataingressoitaliastring: $scope.anagrafica.dataingressoitalia ? moment($scope.anagrafica.dataingressoitalia).format('DD/MM/YYYY'):"DD/MM/YYYY",
            cittaingresso: $scope.anagrafica.cittaingresso ? $scope.anagrafica.cittaingresso : "",
			
			paesetransito: $scope.anagrafica.paesetransito ? $scope.anagrafica.paesetransito : "",
            linguaparlata: $scope.anagrafica.linguaparlata ? $scope.anagrafica.linguaparlata : "",
            religione: $scope.anagrafica.religione ? $scope.anagrafica.religione :"",
			
			primocentrodiaccoglienza: $scope.anagrafica.primocentrodiaccoglienza ? $scope.anagrafica.primocentrodiaccoglienza : "",
            indirizzocentro: $scope.anagrafica.indirizzocentro ? $scope.anagrafica.indirizzocentro: "",
            medicocurante: $scope.anagrafica.medicocurante ? $scope.anagrafica.medicocurante : "",
			
			situazionesanitario: $scope.anagrafica.situazionesanitario ? $scope.anagrafica.situazionesanitario : "",
            datacommissione: $scope.anagrafica.datacommissione ? $scope.anagrafica.datacommissione.getTime() : "yyyy-MM-dd",
			datacommissionetimestamp:  $scope.anagrafica.datacommissione ? $scope.anagrafica.datacommissione.getTime() : "yyyy-MM-dd",
			datacommissionestring: $scope.anagrafica.datacommissione ? moment($scope.anagrafica.datacommissione).format('DD/MM/YYYY'):"DD/MM/YYYY",
            esitocommissione: $scope.anagrafica.esitocommissione ? $scope.anagrafica.esitocommissione : "",
			
			ricorso: $scope.anagrafica.ricorso ? $scope.anagrafica.ricorso : "",
            studioavvocato: $scope.anagrafica.studioavvocato ? $scope.anagrafica.studioavvocato: "",
            note: $scope.anagrafica.note ? $scope.anagrafica.note : "",
			createdby: "",
			updateby:  "",
			createdat:moment(new Date()).format("DD/MM/YYYY"),
			updateat:moment(new Date()).format("DD/MM/YYYY"),
    };
    //anagrafica.$add(anagraficaObject);
	 var ref = new Firebase(FBURLUserProfile + currentAuth.uid);
	var userprofile = $firebaseObject(ref);
    	userprofile.$loaded().then(
	function(data)
	{
	 anagraficaObject.createdby = data.name + "-" + data.email;
	 anagraficaObject.updateby = data.name + "-" + data.email;
	 anagraficaSvc.insertAndAddReferenceToCentro(anagraficaObject,$scope.centroaccoglienzacorrente);
      $location.path('/list');
	}).catch(function(err)
	{
	  console.log(err);
	});
	
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
        //$scope.anagrafica.centro = $scope.centroaccoglienzacorrente;
      }
    });
  
  
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
  $scope.popup1 = {
    opened: false
  };
  
  
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
  
   $scope.formats = [ 'dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  

    $scope.dateOptions = {
    //dateDisabled: disabled,
    formatYear: 'yyyy',
    //maxDate: new Date(2020, 5, 22),
    //minDate: new Date(),
    startingDay: 1
  };
  
    // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
  
  
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