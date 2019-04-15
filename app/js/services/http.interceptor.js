app.factory('HttpInterceptor', ['$q', '$rootScope', '$state', 'Session', function($q, $rootScope, $state, Session) {
  return {
    request: function(config) {
      $rootScope.$loading = true;
      config.headers = config.headers || {};
      if (Session.isAuthenticated()) {
        config.headers.Authorization = 'Bearer ' + Session.data.token;
      }
      return config || $q.when(config);
    },
    response: function(response) {
      $rootScope.$loading = false;
      return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 403) {
        // invalid token
        Session.flush();
        // invoke login dialog
        let to = $rootScope.$transition.to;
        $state.go(to.state, to.params);
      }
      $rootScope.$loading = false;
      return $q.reject(response);
    }
  };
}]);
