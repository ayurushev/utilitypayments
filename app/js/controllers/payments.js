app.controller('PaymentsController', ['$scope', '$state', '$stateParams', 'Payments', 'Payment', function($scope, $state, $stateParams, Payments, Payment) {
  $scope.Payments = Payments;
  $scope.Payment = Payment;

  $scope.months = moment.months();
  $scope.selectedMonth = $stateParams.month;
  $scope.monthFilter = function(element) {
    return $scope.selectedMonth === -1 ? true : moment(element.date).month() === $scope.selectedMonth;
  }

  $scope.add = function() {
    return Payments.add(function(newId) {
      $state.go('payments.detail', { id: newId });
    });
  }

  $scope.$watch('Payments.list', function(list) {
    $scope.payments = list;
  });

  $scope.$watch('selectedMonth', function(newVal, oldVal) {
    if (newVal != oldVal) {
      $state.go('.', { month: newVal });
    }
  });

  $scope.$on('auth-logged-out', function() {
    $state.reload();
  });
}]);
