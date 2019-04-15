app.factory('Auth', ['$http', '$mdToast', '$rootScope', 'Payments', 'Payment', 'Session', 'API_URL', function($http, $mdToast, $rootScope, Payments, Payment, Session, API_URL) {
  return {
    login: function(username, password, callback) {
      $http.post(`${ API_URL }/authenticate`, { username: username, password: password }).then(function(response) {
        if (response.data.success) {
          Session.set({
            username: username,
            token: response.data.token
          });
          $rootScope.$broadcast('auth-logged-in');
          $mdToast.show($mdToast.simple({ textContent: 'Выполнен вход (' + username + ')' }));
          callback(true);
        } else {
          callback(false);
        }
      }, function(error) {
        callback(error);
      });
    },
    logout: function() {
      Session.flush();
      Payments.flush();
      Payment.flush();
      $rootScope.$broadcast('auth-logged-out');
      $mdToast.show($mdToast.simple({ textContent: 'Выполнен выход' }));
    }
  };
}]);
