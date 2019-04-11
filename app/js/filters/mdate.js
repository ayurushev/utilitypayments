app.filter('mdate', [function() {
  return function(input, format) {
    return moment(input).isValid() ? moment(input).format(format || 'LL') : input;
  };
}]);
