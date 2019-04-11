app.controller('MainLayoutController', ['$scope', '$mdSidenav', 'Auth', 'Session', function($scope, $mdSidenav, Auth, Session) {
  $scope.Auth = Auth;
  $scope.Session = Session;

  $scope.toggleSidenav = function() {
    $mdSidenav('sidenav').toggle();
  }
}]);
