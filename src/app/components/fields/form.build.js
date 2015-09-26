
(function() {
  'use strict';

  angular
    .module('mosk')
    .service('$formBuilder', FormBuilderService);

  /** @ngInject */
  function FormBuilderService($fieldBuilder, $fieldForm) {
    var service = this;

    service.getForm = function(formName, fields) {
      var listFields = $fieldBuilder.getFields(fields.map(function(field) {
        field.form = formName;
        return field;
      }));

      var formString = $fieldForm
        .replace(/\{\{form\}\}/g,   formName)
        .replace(/\{\{fields\}\}/g, listFields);

      return {
        restrict: 'EA',
        replace: true,
        template: formString,
        scope: { save: '=', ngModel: '=' }
      };
    };
  }
})();
