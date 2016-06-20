'use strict';

app.service('anagraficaSvc', ['FBURL', '$firebaseArray', 'centriSvc',
  function (FBURL, $firebaseArray, centriSvc) {

    var anagraficheRef = new Firebase(FBURL);
    var anagrafiche = $firebaseArray(anagraficheRef);

    var findAll = function () {
      return anagrafiche;
    };
 //anagraficaSvc removeAndRemoveReferenceFromCentro
	//insertAndAddReferenceToBuilding
    var insertAndAddReferenceToCentro = function (anagrafica, currentCentro) {
      anagrafiche.$add(anagrafica).then(function (ref) {
        centriSvc.addAnagraficaForCurrentCentro(ref,currentCentro);
      })
    };

    var removeAndRemoveReferenceFromCentro = function (anagraficaRef) {
      var index = anagrafiche.$indexFor(anagraficaRef);
      anagrafiche.$remove(index).then(function () {
        console.log('now remove apartment for building: ' + anagraficaRef);
        centriSvc.removeAnagraficaForCurrentCentro(anagraficaRef);
      }, function (error) {
        console.log('Error: ' + error);
      });
    };

    return {
      findAll: findAll,
      insertAndAddReferenceToCentro: insertAndAddReferenceToCentro,
      removeAndRemoveReferenceFromCentro: removeAndRemoveReferenceFromCentro
    }
  }]);