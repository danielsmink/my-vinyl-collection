(function() {
  'use strict';

  angular
    .module('my-vinyl.vinyl')
    .factory('vinylService', vinylService);

  /* @ngInject */
  function vinylService($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'records'),
      records = $firebase(ref).$asArray();

    var service = {
      all: records,
      get: function(params, lastId) {
        var limit = parseInt(params.count),
          limitedRecords = $firebase(ref.startAt(null, lastId).limit(limit)).$asArray();

        return limitedRecords;
      },
      create: function (record) {
        return records.$add(record);
      },
      find: function (recordId) {
        return $firebase(ref.child(recordId)).$asObject();
      },
      delete: function (record) {
        return records.$remove(record);
      }
    };

    return service;
  }
})();