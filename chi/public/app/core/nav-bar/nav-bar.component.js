let navBarController = [function() {
  let ctrl = this;
}]

angular.module('app')
.component('navBar', {
  templateUrl: '/app/core/nav-bar/nav-bar.template.html',
  controller: navBarController,
  bindings: {
    hideSearchField: '<?'
  }
});