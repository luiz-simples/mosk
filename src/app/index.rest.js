(function() {
  'use strict';

  angular
    .module('mosk')
    .factory('$moskRest', MoskRestDirective);

  function MoskRestDirective(Restangular) {
    return {
      getConnection: function getConnection () {
        return Restangular.withConfig(function (config) {
          config.setBaseUrl('http://localhost:1337');
          config.setDefaultHeaders({'Accept': 'application/json'});
          //config.setDefaultHeaders({'Authorization': 'Token token='.concat('token-temp')});
        });
      }
    };
  }
})();
