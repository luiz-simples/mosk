(function() {
  'use strict';

  var fieldString = '';
  fieldString += '<div class="form-group" ng-class="{ \'has-success\': ({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$valid, \'has-error\': ({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$invalid }">';
  fieldString += '  <label class="control-label" for="id{{id}}">{{label}}</label>';
  fieldString += '  <input name="{{name}}" ng-required="{{required}}" ng-model="{{model}}" type="text" class="form-control " id="{{id}}" placeholder="{{place}}">';
  fieldString += '';
  fieldString += '  <div ng-show="({{form}}.$submitted || {{form}}.{{name}}.$dirty) && {{form}}.{{name}}.$invalid" class="alert alert-danger" role="alert">';
  fieldString += '    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
  fieldString += '    <span class="sr-only">Erro:</span>';
  fieldString += '    <span ng-repeat="(error, val) in {{form}}.{{name}}.$error" >{{error}}</span>';
  fieldString += '  </div>';
  fieldString += '</div>';

  angular
    .module('mosk')
    .value('$fieldString', fieldString);
})();
