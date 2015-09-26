(function() {
  'use strict';

  angular
    .module('mosk')
    .service('$fieldBuilder', FieldBuilderService);

  /** @ngInject */
  function FieldBuilderService($fieldString, $fieldText) {
    var service = this;
    var allFields  = {
      'text': $fieldText,
      'string': $fieldString
    };

    var getField = function(field) {
      var type = field.type;

      return allFields[type]
        .replace(/\{\{id\}\}/g,       field.id)
        .replace(/\{\{label\}\}/g,    field.label)
        .replace(/\{\{place\}\}/g,    field.place)
        .replace(/\{\{name\}\}/g,     field.name)
        .replace(/\{\{form\}\}/g,     field.form)
        .replace(/\{\{required\}\}/g, field.required)
        .replace(/\{\{model\}\}/g,    field.model);
    };

    service.getFields = function(fields) {
      var quebraLinha = '\r\n\r\n';

      var retornaCamposValidos = function(field) {
        return allFields.hasOwnProperty(field.type);
      };

      return fields.filter(retornaCamposValidos).map(getField).join(quebraLinha);
    };
  }
})();
