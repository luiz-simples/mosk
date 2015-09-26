(function() {
  'use strict';

  angular
    .module('mosk')
    .directive('mainForm', CategoriaFormDirective);

  function CategoriaFormDirective($formBuilder) {
    var rand = String((new Date()).getTime());

    var campos = [
      { id: rand.concat('paginaTitulo'),   name: 'paginaTitulo',   type: 'string', label: 'Título',   place: 'Informe o título da página', model: 'ngModel.titulo',   required: true },
      { id: rand.concat('paginaConteudo'), name: 'paginaConteudo', type: 'text',   label: 'Conteúdo', place: 'Informe o título da página', model: 'ngModel.conteudo', required: true }
    ];

    return $formBuilder.getForm('pagina', campos);
  }
})();
