app.controller('PaymentController', ['$scope', '$q', 'Payment', 'Readings', 'UTILITIES', function($scope, $q, Payment, Readings, UTILITIES) {
  $scope.Payment = Payment;
  $scope.Readings = Readings;
  $scope.UTILITIES = UTILITIES;

  $scope.$watch('Payment.model', function(model) {
    $scope.payment = model;
  });
}]);
