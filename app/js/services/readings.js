app.factory('Readings', ['$http', 'API_URL', function($http, API_URL) {
  let api = `${ API_URL }/readings`;
  return {
    paymentId: undefined,
    data: {},
    get: function() {
      let self = this;
      return $http.get(api).then(function(response) {
        if (response.data.success === true) {
          // paymentId is used to track if currently selected payment
          // is the one with "last readings"
          self.paymentId = response.data.paymentId;
          angular.extend(self.data, response.data.readings);
          return self.data;
        }
      }, function(error) {
        return error;
      });
    },
    save: function(id) {
      let self = this;
      return $http.post(api, { paymentId: id }).then(function(response) {
        if (response.data.success === true) {
          // refetch data
          self.load();
        }
      });
    }
  }
}]);
