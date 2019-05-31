app.factory('Rates', ['$http', 'API_URL', 'LocalSettings', function($http, API_URL, LocalSettings) {
  let api = `${ API_URL }/rates`;
  let originalData = {};
  return {
    data: {},
    get: function() {
      let data = this.data;
      return $http.get(api).then(function(response) {
        if (response.data.success === true) {
          angular.extend(data, response.data.rates);
          angular.extend(originalData, angular.copy(data));
          return data;
        }
      }, function(error) {
        return error;
      });
    },
    save: function() {
      let data = this.data;
      return $http.post(api, data).then(function(response) {
        if (response.data.success === true) {
          angular.extend(originalData, data);
        }
      }, function(error) {
        return error;
      });
    },
    isPristine: function() {
      return angular.equals(this.data, originalData);
    }
  }
}]);
