app.controller('ChartsToolbarController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  $scope.selectedYear = $stateParams.year;

  $scope.currentYear = function() {
    $scope.selectedYear = moment().year();
  }

  $scope.$watch('selectedYear', function(newVal) {
    if (newVal) {
      $state.go('.', { year: newVal });
    }
  });
}]);
