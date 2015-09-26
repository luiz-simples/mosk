(function() {
  'use strict';

  angular
    .module('mosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $moskRest) {
    var vm = this;
    var conexao = $moskRest.getConnection();

    vm.pagina = {};

    vm.salvar = function(form, modelo) {
      conexao.all('paginas').post(modelo).then(function(paginaCadastrada) {
        var idPaginaCriada = paginaCadastrada._id;
        var url  = 'http://localhost:1337/visualizar?id='.concat(idPaginaCriada);

        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
      });
      return false;
    };
  }
})();
