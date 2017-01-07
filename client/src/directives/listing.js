angular.module('app').directive('listing', function() {
  return {
		restrict: 'E',
transclude: true,
		scope: {
      discription: '@',
      name: '@'
		 },
    templateUrl: 'directives/listing'
  };
});
