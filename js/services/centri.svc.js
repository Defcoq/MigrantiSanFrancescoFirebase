'use strict';

app.service('centriSvc', ['FBURLCentri', '$firebaseArray',
  function (FBURLCentri, $firebaseArray) {

    var centriRef = new Firebase(FBURLCentri);
    var centri = $firebaseArray(centriRef);

    var currentCentro = null;

    var findAll = function () {
      return centri;
    };

    var setCurrentCentro = function (centro) {
      currentCentro = centro;
    };

	//getApartmentsForCurrentBuilding
     var getAnagraficaForCurrentCentro = function (curr) {
      var anagraficaRef = centriRef.child(curr + '/anagrafiche');
      return $firebaseArray(anagraficaRef);
    };

	//addApartmentForCurrentBuilding
    var addAnagraficaForCurrentCentro = function (anagraficaRef) {
      var child = centriRef.child(currentCentro + '/anagrafiche/' + anagraficaRef.key());
      child.set(true);
    };
    //removeApartmentForCurrentBuilding
    var removeAnagraficaForCurrentCentro = function (anagraficaRef) {
      var child = centriRef.child(currentCentro + '/anagrafiche/' + anagraficaRef);
      child.remove();
    };

    var insert = function (item) {
      centri.$add(item);
    };

    var update = function (id) {
      centri.$save(id);
    };

    var remove = function (id) {
      centri.$remove(id);
    };

    return {
      findAll: findAll,
      insert: insert,
      update: update,
      remove: remove,
      setCurrentCentro: setCurrentCentro,
      addAnagraficaForCurrentCentro: addAnagraficaForCurrentCentro,
      removeAnagraficaForCurrentCentro: removeAnagraficaForCurrentCentro,
      getAnagraficaForCurrentCentro: getAnagraficaForCurrentCentro
    }
  }]);