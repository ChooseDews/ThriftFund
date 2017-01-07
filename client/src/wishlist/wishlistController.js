angular.module('app').controller('wishlistController', function($scope, $auth, $state, $wishlist) {


$wishlist.get().then(function(listings){
	$scope.listings = listings;
});


});
