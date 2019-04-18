app.controller('ChartsController', ['$scope', '$stateParams', 'Payments', function($scope, $stateParams, Payments) {
  $scope.chart = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    labels: moment.months()
  };

  $scope.year = $stateParams.year;

  Payments.getSummary($stateParams.year).then(function(data) {
    $scope.annualSummary = data.annual;
    angular.forEach(data.monthly, function(sum, month) {
      // populate chart data
      $scope.chart.data[month] = sum;
    });
  });
}]);
