angular.module('app').controller('feedController', function($scope, $listing) {

$scope.listings = [];

$listing.list().then(function(listings){
  $scope.listings = listings;
});

});
