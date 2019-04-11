app.directive('mainLayout', [function() {
  return {
    scope: false,
    templateUrl: 'partials/main.layout.html',
    controller: 'MainLayoutController'
  };
}]);
