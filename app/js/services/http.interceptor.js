app.factory('HttpInterceptor', ['$q', '$rootScope', 'Session', function($q, $rootScope, Session) {
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
      /*if (response.data && response.data.success === false) {
        Session.flush();
      }*/
      $rootScope.$loading = false;
      return response || $q.when(response);
    },
    responseError: function(response) {
      /*if (response.status === 403) {
        Session.flush();
      }*/
      $rootScope.$loading = false;
      return $q.reject(response);
    }
  };
}]);
