app.directive('progressButton', ['$parse', function($parse) {
  return {
    replace: true,
    transclude: true,
    scope: {
      class: '@',
      diameter: '@',
      onClick: '&',
      ngDisabled: '='
    },
    template: '<div class="progress-button">' +
                '<md-progress-circular style="margin: 0 6px" class="md-hue-3" md-mode="indeterminate" md-diameter="{{ diameter || 40 }}" ng-show="busy"></md-progress-circular>' +
                '<md-button ng-class="class" ng-click="click()" ng-disabled="ngDisabled" ng-hide="busy">' +
                  '<ng-transclude></ng-transclude>' +
                '</md-button>' +
              '</div>',
    link: function(scope, element, attrs) {
      scope.click = function() {
        scope.busy = true;
        let fn = $parse(scope.onClick)(scope);
        if (fn && angular.isFunction(fn.finally)) {
          fn.finally(function() {
            scope.busy = false;
          });
        } else {
          scope.busy = false;
          console.warn('progressButton: onClick no promise.');
        }
      }
    }
  };
}]);
