app.factory('Payment', ['$http', '$q', 'Payments', 'Readings', 'API_URL', function($http, $q, Payments, Readings, API_URL) {
  let originalModel, api = `${ API_URL }/payments`;
  return {
    model: {},
    newBillIndex: -1,
    get: function(id) {
      let model = this.model;
      return $http.get(`${ api }/${ id }`).then(function(response) {
        let data = response.data;
        if (data.success === true && data.payment) {
          angular.extend(model, data.payment);
          originalModel = angular.copy(model);
          // we don't need it here anymore
          // watching model inside PaymentController
          //return data;
        } else {
          return $q.reject('Платеж не найден.');
        }
      }, function(error) {
        return error;
      });
    },
    delete: function() {
      let model = this.model;
      return $http.delete(`${ api }/${ model.id }`).then(function(response) {
        if (response.data.success === true) {
          Payments.remove(model.id);
          model = undefined;
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
          originalModel = angular.copy(model);
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
    summarize: function(externalModel) {
      let i = 0;
      angular.forEach(externalModel ? externalModel.bills : this.model.bills, function(bill) {
        i += bill.amount || 0;
      });
      return i.toFixed(2);
    },
    isPristine: function() {
      return angular.equals(this.model, originalModel);
    },
    restore: function() {
      angular.extend(this.model, originalModel);
      originalModel = angular.copy(this.model);
    }
  };
}]);
