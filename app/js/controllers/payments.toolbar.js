app.controller('PaymentsToolbarController', ['$scope', '$state', 'Payments', function($scope, $state, Payments) {
  $scope.newPayment = function() {
    return Payments.add(function(newId) {
      $state.go('payments.detail', { id: newId });
    });
  }
}]);
