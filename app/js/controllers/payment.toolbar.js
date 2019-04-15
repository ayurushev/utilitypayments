app.controller('PaymentToolbarController', ['$scope', '$state', '$window', '$filter', '$mdDialog', 'Payment', 'UTILITIES', function($scope, $state, $window, $filter, $mdDialog, Payment, UTILITIES) {
  $scope.Payment = Payment;

  $scope.copyToClipboard = function($event) {
    let model = Payment.model;
    let result = `${ $filter('mdate')(model.date, 'L') }${ model.comment ? ', ' + model.comment : '' }\n`;
    let commission = false;
    angular.forEach(model.bills, function(bill) {
      if (bill.commission) {
        commission = true;
      }
      result += `${ UTILITIES[bill.utility] }${ bill.readings ? '=>' + bill.readings : '' }${ bill.amount ? '=' + bill.amount : '' }${ bill.commission ? '+ком' : '' }${ bill.comment ? ' (' + bill.comment + ')' : '' }\n`;
    });
    result += `${ '-'.repeat(20) }\n=${ Payment.summarize(model) }${ commission ? '+ком' : '' } RUB`;
    $window.navigator.clipboard.writeText(result).then(function() {
      $mdDialog.show($mdDialog.alert({
        targetEvent: $event,
        title: 'Успешно',
        textContent: 'Данные скопированы в буфер обмена.',
        ok: 'Ok'
      }));
    }, function(error) {
    });
  }

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
