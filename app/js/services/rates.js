app.factory('Rates', ['LocalSettings', function(LocalSettings) {
  let originalData = {};
  return {
    data: {},
    get: function() {
      angular.extend(this.data, LocalSettings.get('rates'));
      angular.extend(originalData, angular.copy(this.data));
      return this.data;
    },
    save: function() {
      LocalSettings.save('rates', this.data);
      angular.extend(originalData, this.data);
    },
    isPristine: function() {
      return angular.equals(this.data, originalData);
    }
  }
}]);
