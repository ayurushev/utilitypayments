app.factory('Session', ['$window', 'LS_KEY', function($window, LS_KEY) {
  let init = function() {
    return LS_KEY in $window.localStorage ? angular.fromJson($window.localStorage.getItem(LS_KEY)) : {};
  };
  return {
    data: init(),
    isAuthenticated: function() {
      return this.data && this.data.token && this.data.token.length > 0;
    },
    set: function(data) {
      this.data = data;
      $window.localStorage.setItem(LS_KEY, angular.toJson(data));
    },
    flush: function() {
      this.data = undefined;
      $window.localStorage.removeItem(LS_KEY);
    }
  };
}]);
