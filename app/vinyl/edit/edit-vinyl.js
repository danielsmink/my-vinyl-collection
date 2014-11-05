/*jshint newcap:false*/
(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .controller('EditVinyl', EditVinyl);

  /* @ngInject */
  function EditVinyl($state, record, vinylService) {

    /*jshint validthis: true */
    var vm = this;

    vm.record = record;
    vm.saveRecord = saveRecord;

    function saveRecord() {
      vinylService.update({ vinyl_id:record._id }, record).$promise.then(function() {
        $state.go('vinyl');
      });
    }
  }
})();