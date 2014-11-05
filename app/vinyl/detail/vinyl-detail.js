/*jshint newcap:false*/
(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .controller('VinylDetail', VinylDetail);

  /* @ngInject */
  function VinylDetail(record) {

    /*jshint validthis: true */
    var vm = this;

    vm.record = record;
  }
})();