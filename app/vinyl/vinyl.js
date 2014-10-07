/*jshint newcap:false*/
(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .controller('Vinyl', Vinyl);

  /* @ngInject */
  function Vinyl($filter, ngTableParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.records = [{
      title: 'test',
      artist: 'test'
    }];
    vm.record = {
      title: '',
      artist: ''
    };
    vm.submitRecord = submitRecord;

    function submitRecord() {
      vm.records.push(vm.record);
      vm.record = {
        title: '',
        artist: ''
      };
      vm.tableParams.reload();
    }

    vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        title: 'asc'     // initial sorting
      }
    }, {
      total: vm.records.length, // length of data
      getData: function($defer, params) {
        // use build-in angular filter
        var orderedData = params.sorting() ?
          $filter('orderBy')(vm.records, params.orderBy()) :
          vm.records;

        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

  }
})();