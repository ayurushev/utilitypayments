app.factory('Readings', ['$window', 'UTILITIES', 'LS_KEY', function($window, UTILITIES, LS_KEY) {
  let key = `${ LS_KEY }_readings`;
  let init = function() {
    return key in $window.localStorage ? angular.fromJson($window.localStorage.getItem(key)) : {};
  };
  return {
    data: init(),
    save: function(bills) {
      let data = this.data;
      try {
        angular.forEach(bills, function(bill) {
          data[bill.utility] = bill.readings;
        });
        $window.localStorage.setItem(key, angular.toJson(data));
        return true;
      } catch(e) {
        console.error('Readings: exception');
        return false;
      }
    }
  };
}]);
