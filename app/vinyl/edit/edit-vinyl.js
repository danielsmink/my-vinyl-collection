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
      vinylService.save(vm.record).then(function() {
        $state.go('vinyl');
      });
    }
  }
})();