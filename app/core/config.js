(function() {
  'use strict';

  var core = angular.module('my-vinyl.core');

  var config = {
    appTitle: 'my Vinyl Collection',
    version: '1.0.0'
  };

  core.value('config', config);

  core.config(configure);

  /* @ngInject */
  function configure ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /start
    $urlRouterProvider.otherwise('/');


    // Setup states
    $stateProvider
      .state('vinyl', {
        url: '/vinyl',
        templateUrl: 'js/partials/vinyl/list/vinyl.html',
        controller: 'Vinyl',
        controllerAs: 'vinyl'
      })
      .state('edit-vinyl', {
        url: '/edit-vinyl/:id',
        templateUrl: 'js/partials/vinyl/edit/edit-vinyl.html',
        resolve: {
          record: function($stateParams, vinylService) {
            return vinylService.get({ id: $stateParams.id});
          }
        },
        controller: 'EditVinyl',
        controllerAs: 'edit'
      });
  }
})();