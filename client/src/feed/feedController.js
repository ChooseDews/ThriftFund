angular.module('app').controller('feedController', function($scope, $listing, $timeout) {

$scope.listings = [];

$scope.loading = true;

$scope.currentPage = 1;

$listing.list(1).then(function(listings){
  $scope.listings = listings;
  $scope.loading = false;

});

$timeout(function(){

  $scope.moreProducts = function(){
    var page = $scope.listings.length/5 + 1;
    if(page%1 === 0 && $scope.currentPage != page){
      $scope.currentPage = page;
      $scope.loading = true;
      $listing.list(page).then(function(listings){
        $scope.listings = $scope.listings.concat(listings);
        $scope.loading = false;
      });
    }
  };


},1000);

 $scope.onReload = function() {
   alert('reloading');
 };


});
