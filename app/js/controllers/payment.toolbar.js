app.controller('PaymentToolbarController', ['$scope', '$state', '$window', '$filter', '$mdDialog', 'Payment', 'UTILITIES', function($scope, $state, $window, $filter, $mdDialog, Payment, UTILITIES) {
  $scope.Payment = Payment;

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
