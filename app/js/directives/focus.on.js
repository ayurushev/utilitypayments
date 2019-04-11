app.directive('focusOn', ['$timeout', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusOn, function(value) {
        if (value == true) {
          $timeout(function() {
            element.focus();
          });
        }
      });
    }
  };
}]);
