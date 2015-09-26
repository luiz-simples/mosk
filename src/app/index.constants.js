/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('mosk')
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
