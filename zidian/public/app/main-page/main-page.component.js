var mainController = ['$location', 'CacheService',
  function($location, CacheService) {
    var ctrl = this;

    ctrl.isSimplified = CacheService.isSimplified;

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