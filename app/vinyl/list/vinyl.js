/*jshint newcap:false*/
(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .controller('Vinyl', Vinyl);

  /* @ngInject */
  function Vinyl(vinylService) {

    /*jshint validthis: true */
    var vm = this;

    vm.deleteRecord = deleteRecord;
    vm.submitRecord = submitRecord;

    // Get records
    vinylService.query(function(data) {
      vm.albums = data;
    });

    // Delete a record
    function deleteRecord(record) {
      vinylService.delete({ vinyl_id:record._id }, function(data) {
        vm.albums = data;
      });
    }

    // Create a new record
    function submitRecord() {
      vinylService.save(vm.record).$promise.then(function(data) {
        vm.record = null;
        vm.albums = data;
      });
    }

  }
})();