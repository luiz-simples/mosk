(function() {
  'use strict';

  var fieldText = '';
  fieldText += '<div class="form-group" ng-class="{ \'has-success\': ({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$valid, \'has-error\': ({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$invalid }">';
  fieldText += '  <label class="control-label" for="id{{id}}">{{label}}</label>';
  fieldText += '  <text-angular name="{{name}}" ng-required="{{required}}" ng-model="{{model}}"></text-angular>';
  fieldText += '';
  fieldText += '  <div ng-show="({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$invalid" class="alert alert-danger" role="alert">';
  fieldText += '    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
  fieldText += '    <span class="sr-only">Erro:</span>';
  fieldText += '    <span ng-repeat="(error, val) in {{form}}.{{name}}.$error" >{{error}}</span>';
  fieldText += '  </div>';
  fieldText += '</div>';

  angular
    .module('mosk')
    .value('$fieldText', fieldText);
})();
