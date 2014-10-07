/*jshint newcap:false*/
(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .controller('Vinyl', Vinyl);

  /* @ngInject */
  function Vinyl($timeout, vinylService, ngTableParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.record = {
      title: '',
      artist: ''
    };
    vm.submitRecord = submitRecord;
    vm.deleteRecord = deleteRecord;

    // Set table params to use with ngTable
    vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 5,          // count per page
      sorting: {
        title: 'asc'      // initial sorting
      }
    }, {
      total: 10, // length of data
      getData: function ($defer, params) {
        vinylService.get(params.url(), vm.lastId).$loaded().then(function(data) {
          // update table params
          // set new data
          vm.lastId = data[data.length-1].$id;
          $defer.resolve(data);
        });
      }
    });


    // Create a new record
    function submitRecord() {
      vinylService.create(vm.record).then(function () {
        vm.record = {
          title: '',
          artist: ''
        };
        vm.tableParams.reload();
      });

    }

    // Delete a record
    function deleteRecord(record) {
      vinylService.delete(record).then(function () {
        vm.tableParams.reload();
      });
    }

  }
})();