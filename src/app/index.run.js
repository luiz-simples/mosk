(function() {
  'use strict';

  angular
    .module('mosk')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
