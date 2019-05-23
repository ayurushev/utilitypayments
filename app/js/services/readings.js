app.factory('Readings', ['$http', 'API_URL', function($http, API_URL) {
  let api = `${ API_URL }/readings`;
  return {
    data: {},
    get: function() {
      let data = this.data;
      $http.get(api).then(function(response) {
        if (response.data.success === true) {
          angular.extend(data, response.data.readings);
        }
      }, function(error) {
        console.error(error);
      });
    },
    save: function(id) {
      let self = this;
      $http.post(api, { paymentId: id }).then(function(response) {
        if (response.data.success === true) {
          // refetch data
          self.load();
        }
      });
    }
  }
}]);
