app.controller('LoginController', ['$scope', '$mdDialog', 'Auth', function($scope, $mdDialog, Auth) {
  $scope.credentials = {};

  $scope.login = function() {
    $scope.busy = true;
    Auth.login($scope.credentials.username, $scope.credentials.password, function(success) {
      $scope.busy = false;
      if (success === true) {
        $mdDialog.hide({ loggedIn: true });
      } else {
        $mdDialog.show($mdDialog.alert({
          multiple: true,
          title: 'Ошибка',
          textContent: success === false ? 'Неверное имя пользователя или пароль.' : 'Сетевая ошибка. Пожалуйста, попробуйте позже.',
          ok: 'Ok'
        }));
      }
    });
  }

  $scope.cancel = function() {
    $mdDialog.cancel();
  }
}]);
