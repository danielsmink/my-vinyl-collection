(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .factory('vinylService', vinylService);

  /* @ngInject */
  function vinylService($resource, API_URL) {
    // Our API returns the JSON object inside an array so we have to override all methods
    return $resource(API_URL + 'vinyl/:vinyl_id', {vinyl_id:'@id'},
      {
        'get':    {method:'GET'},
        'save':   {method:'POST', isArray:true},
        'query':  {method:'GET', isArray:true},
        'delete': {method:'DELETE', isArray:true},
        'update': { method:'PUT', isArray:true}
      }
    );
  }
})();