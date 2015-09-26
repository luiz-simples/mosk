(function() {
  'use strict';

  var formString = '';
  formString += '<form ng-submit="save({{form}}, ngModel)" novalidate class="col-md-12 col-lg-12 col-sm-12" role="form" name="{{form}}">';
  formString += '{{fields}}';
  formString += '<button type="submit" class="btn btn-default">Submit</button>';
  formString += '</form>';

  angular
    .module('mosk')
    .value('$fieldForm', formString);
})();
