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

    // Get records
    vinylService.query(function(data) {
      vm.albums = data;
    });

    // Delete a record
    function deleteRecord(record) {
      //vinylService.delete(record);
    }

  }
})();