app.factory('Payments', ['$http', 'API_URL', function($http, API_URL) {
  let api = `${ API_URL }/payments`;
  return {
    list: [],
    get: function(id) {
      let list = this.list;
      return $http.get(api).then(function(response) {
        if (response.data.success === true) {
          angular.extend(list, response.data.payments);
        }
        return response.data;
      }, function(error) {
        return error;
      });
    },
    add: function(callback) {
      let list = this.list;
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
      let index = this.list.findIndex(x => x.id === id);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
    update: function(model) {
      let index = this.list.findIndex(x => x.id === model.id);
      if (index > -1) {
        angular.extend(this.list[index], model);
      }
    },
    flush: function() {
      this.list = [];
    }
  };
}]);
