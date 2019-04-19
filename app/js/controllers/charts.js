app.controller('ChartsController', ['$scope', '$stateParams', 'data', function($scope, $stateParams, data) {
  $scope.chart = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    labels: moment.months()
  };

  $scope.annualSummary = data.annual;
  angular.forEach(data.monthly, function(sum, month) {
    // populate chart data
    $scope.chart.data[month] = sum;
  });

  $scope.year = $stateParams.year;
}]);
