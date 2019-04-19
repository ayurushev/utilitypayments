app.factory('Payment', ['$http', '$q', 'Payments', 'Readings', 'API_URL', function($http, $q, Payments, Readings, API_URL) {
  let originalModel = {}, api = `${ API_URL }/payments`;
  return {
    model: {},
    newBillIndex: -1,
    get: function(id) {
      let model = this.model;
      return $http.get(`${ api }/${ id }`).then(function(response) {
        let data = response.data;
        if (data.success === true && data.payment) {
          angular.extend(model, data.payment);
          angular.extend(originalModel, angular.copy(model));
        } else {
          return $q.reject('Платеж не найден.');
        }
      }, function(error) {
        return error;
      });
    },
    delete: function() {
      let self = this;
      return $http.delete(`${ api }/${ self.model.id }`).then(function(response) {
        if (response.data.success === true) {
          Payments.remove(self.model.id);
          self.flush();
        }
        return response.data;
      }, function(error) {
        return error;
      });
    },
    save: function() {
      let model = this.model;
      return $http.put(`${ api }/${ model.id }`, model).then(function(response) {
        if (response.data.success === true) {
          angular.extend(originalModel, angular.copy(model));
          Payments.update(originalModel);
          Readings.save(model.bills);
        }
        return response.data;
      }, function(error) {
        return error;
      });
    },
    addBill: function() {
      this.newBillIndex = this.model.bills.push({}) - 1;
    },
    removeBill: function(index) {
      this.model.bills.splice(index, 1);
    },
    summarize: function() {
      let i = 0;
      angular.forEach(this.model.bills, function(bill) {
        i += bill.amount || 0;
      });
      return i.toFixed(2);
    },
    isPristine: function() {
      return angular.equals(this.model, originalModel);
    },
    revertChanges: function() {
      angular.extend(this.model, originalModel);
      angular.extend(originalModel, angular.copy(this.model));
    },
    flush: function() {
      this.model = {};
      this.newBillIndex = -1;
      originalModel = {};
    }
  };
}]);
