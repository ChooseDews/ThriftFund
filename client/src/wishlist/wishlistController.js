angular.module('app').controller('wishlistController', function($scope, $auth, $state, $wishlist) {

$scope.loading = true;

$wishlist.get().then(function(listings){
	$scope.listings = listings;
	$scope.loading = false;

});


});
