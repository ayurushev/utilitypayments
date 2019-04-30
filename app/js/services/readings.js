app.factory('Readings', ['LocalSettings', function(LocalSettings) {
  return {
    data: LocalSettings.get('readings'),
    save: function(bills) {
      let data = this.data;
      angular.forEach(bills, function(bill) {
        data[bill.utility] = bill.readings;
      });
      LocalSettings.save('readings', data);
    }
  }
}]);
