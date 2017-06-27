var mainController = ['$location', 'PreferencesService',
  function($location, PreferencesService) {
    var ctrl = this;

    ctrl.isSimplified = PreferencesService.isSimplified;

    ctrl.search = function(searchTerm) {
      if (!ctrl.searchTerm || ctrl.searchTerm === '') {
        return;
      }

      $location.path('/search/' + ctrl.searchTerm);
      ctrl.searchTerm = '';
    }
  }
]

angular.module('mainPage')
.component('mainPage', {
  templateUrl: '/app/main-page/main-page.template.html',
  controller: mainController
})