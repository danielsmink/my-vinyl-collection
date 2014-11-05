(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .factory('vinylService', vinylService);

  /* @ngInject */
  function vinylService($resource, API_URL) {
    return $resource(API_URL + 'vinyl/:vinyl_id', {vinyl_id:'@id'},
      {
        'get':    {method:'GET', isArray:true},
        'save':   {method:'POST', isArray:true},
        'query':  {method:'GET', isArray:true},
        'delete': {method:'DELETE', isArray:true},
        'update': { method:'PUT', isArray:true}
      }
    );
  }
})();