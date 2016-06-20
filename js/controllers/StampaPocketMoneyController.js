app.controller('StampaPocketMoneyController', ['$scope', '$firebaseArray', '$location', 'FBURL','FBURLCountries','$firebaseArray','FBURLCentri', function($scope, $firebaseArray, $location, FBURL,FBURLCountries,$firebaseArray,FBURLCentri){

 var queryString = $location.search();
 console.log("roba ricevuto da querystring");
 console.log(queryString);
 $scope.centro = queryString.centro;
 $scope.importo = queryString.importo;
 $scope.dal = moment(queryString.dal).format("DD/MM/YYYY");
 $scope.al = moment(queryString.al).format("DD/MM/YYYY");
 
 console.log($scope.centro);
 
var anagraficamigranti = new Firebase(FBURL);
  var anagrafica = $firebaseArray(anagraficamigranti);
  console.log(anagrafica);
 $scope.anagraficamigranti = anagrafica;
  var utentiCentro = [];
  console.log("prima sono dentro il foreach =====>");
   angular.forEach(anagrafica, function(value, key){
   console.log("sono dentro il foreach");
    console.log(value.centro);
      if(value.centro == $scope.centro)
	  {
	  console.log(value.centro +  value.cognome);
	    utentiCentro.push(value);
	  }
         
   });
   //$scope.anagraficamigranti = utentiCentro;
  
  $scope.pocketmoney = {};
  $scope.pocketmoney.importo ="25353535";
  $scope.pocketmoney.centro ="";
  $scope.pocketmoney.dal ="";
  $scope.pocketmoney.all ="";
  
  $scope.StampaPocketMoney = function(pocket)
  {
  console.log("stampiamo questo pocket money===>");
    console.log(pocket);
    $scope.pocketmoney = pocket;
	$location.path('/stampapocketmoney').search({ redirectFrom: $location.path() });;
  }
  
  
console.log("sono qui dentro PocketMoneyController");
  var countriesRef = new Firebase(FBURLCountries);
  var countries = $firebaseArray(countriesRef);
  $scope.states = countries;
  
   var centriRef = new Firebase(FBURLCentri);
   var centri = $firebaseArray(centriRef);
   $scope.centri = centri;
  
  $scope.addCentro = function() {

    var ref = new Firebase(FBURLCentri);
    var centro = $firebaseArray(ref);
    centro.$add({
            nome: $scope.centro.nome ? $scope.centro.nome :"",
            luogo: $scope.centro.luogo ? $scope.centro.luogo : ""  
    });
    $location.path('/listcentri');
  };
  
  
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
  
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  

    $scope.dateOptions = {
    //dateDisabled: disabled,
    formatYear: 'yyyy',
   // maxDate: new Date(2020, 5, 22),
   // minDate: new Date(),
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