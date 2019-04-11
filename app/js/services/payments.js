app.factory('Payments', ['$http', 'API_URL', function($http, API_URL) {
  let list, api = `${ API_URL }/payments`;
  return {
    get: function(id) {
      return $http.get(api).then(function(response) {
        if (response.data.success === true) {
          list = response.data.payments;
        }
        return response.data;
      }, function(error) {
        return error;
      });
    },
    add: function(callback) {
      return $http.post(api).then(function(response) {
        if (response.data.success === true) {
          let model = response.data.payment;
          list.push(model);
          if (angular.isFunction(callback)) {
            callback(model.id);
          }
        }
        return response.data;
      }, function(error) {
        return error;
      });
    },
    remove: function(id) {
      let index = list.findIndex(x => x.id === id);
      if (index > -1) {
        list.splice(index, 1);
      }
    },
    update: function(model) {
      let index = list.findIndex(x => x.id === model.id);
      if (index > -1) {
        list[index] = model;
      }
    }
  };
}]);
