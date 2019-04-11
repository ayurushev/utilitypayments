app.controller('PaymentToolbarController', ['$scope', '$state', '$window', '$mdDialog', 'Payment', function($scope, $state, $window, $mdDialog, Payment) {
  $scope.Payment = Payment;

  /*$scope.newPayment = function() {
    return Payments.add(function(newId) {
      $state.go('payments.detail', { id: newId });
    });
  }*/

  $scope.delete = function() {
    return $mdDialog.show($mdDialog.confirm({
      title: 'Удалить?',
      textContent: 'Данные будут безвозвратно удалены.',
      ariaLabel: 'Удалить',
      targetEvent: event,
      ok: 'Удалить',
      cancel: 'Отмена'
    })).then(function() {
      return Payment.delete().then(function() {
        $window.history.back();
      });
    }, function() {
    });
  }
}]);
