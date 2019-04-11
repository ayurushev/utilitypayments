app.controller('PaymentsController', ['$scope', '$state', '$stateParams', 'Payment', 'data', function($scope, $state, $stateParams, Payment, data) {
  $scope.Payment = Payment;
  $scope.payments = data.payments;

  $scope.months = moment.months();
  $scope.selectedMonth = $stateParams.month;
  $scope.monthFilter = function(element) {
    return $scope.selectedMonth === -1 ? true : moment(element.date).month() === $scope.selectedMonth;
  }

  $scope.$watch('selectedMonth', function(newVal, oldVal) {
    if (newVal != oldVal) {
      $state.go('.', { month: newVal });
    }
  });
}]);
