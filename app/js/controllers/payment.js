app.controller('PaymentController', ['$scope', '$filter', '$window', '$mdDialog', 'Payment', 'Readings', 'UTILITIES', function($scope, $filter, $window, $mdDialog, Payment, Readings, UTILITIES) {
  $scope.Payment = Payment;
  $scope.Readings = Readings;
  $scope.UTILITIES = UTILITIES;

  $scope.export = function($event) {
    let model = Payment.model;
    let commission = false;
    let result = `${ $filter('mdate')(model.date, 'L') }${ model.comment ? ', ' + model.comment : '' }\n`;
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

  $scope.$watch('Payment.model', function(model) {
    $scope.payment = model;
  });
}]);
