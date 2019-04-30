app.factory('LocalSettings', ['$window', 'UTILITIES', 'LS_KEY', function($window, UTILITIES, LS_KEY) {
  let lsKey = `${ LS_KEY }_settings`;
  let init = function() {
    return lsKey in $window.localStorage ? angular.fromJson($window.localStorage.getItem(lsKey)) : {};
  };
  return {
    data: init(),
    save: function(key, value) {
      if (value) {
        // update with new value only if value is defined
        // otherwise just save current date to localStorage
        this.data[key] = value;
      }
			$window.localStorage.setItem(lsKey, angular.toJson(this.data));
      console.log('LocalSettings saved.');
		},
		get: function(key) {
      return key in this.data ? this.data[key] : {};
		},
		remove: function(key) {
			if (key in this.data) {
        this.save(key, undefined);
      }
		}
  };
}]);
