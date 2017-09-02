var searchFieldController = ['$location',
  function($location) {
    var ctrl = this;

    ctrl.search = function(searchTerm) {
      if (!ctrl.searchTerm || ctrl.searchTerm === '') {
        return;
      }

      $location.path('/search/' + ctrl.searchTerm);
      ctrl.searchTerm = '';
    }
  }
]

angular.module('app')
.component('searchField', {
  templateUrl: '/app/core/search-field/search-field.template.html',
  controller: searchFieldController
})