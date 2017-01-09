


angular.module('app').controller('registerController', function($scope, $auth, $state, $device) {

  $device.keyboard.showBar();


$scope.error = '';

$scope.register = function(user){

$auth.register(user).catch(function(e){
  $scope.error = e;
});


};



});
