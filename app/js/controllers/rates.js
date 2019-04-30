app.controller('RatesController', ['$scope', 'UTILITIES', 'Rates', 'data', function($scope, UTILITIES, Rates, data) {
  $scope.UTILITIES = UTILITIES;
  $scope.Rates = Rates;
  $scope.data = data;
}]);
