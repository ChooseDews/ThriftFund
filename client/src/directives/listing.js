angular.module('app').directive('listing', function() {
  return {
		restrict: 'E',
transclude: true,
		scope: {
      listing: '='
		 },
    templateUrl: 'directives/listing'
  };
});
