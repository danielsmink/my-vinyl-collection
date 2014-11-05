(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .factory('vinylService', vinylService);

  /* @ngInject */
  function vinylService($resource, API_URL) {
    return $resource(API_URL + 'vinyl/:vinyl_id');
  }
})();