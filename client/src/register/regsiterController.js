


angular.module('app').controller('registerController', function($scope, $auth, $state) {

$scope.error = '';

$scope.register = function(user){

$auth.register(user).then(function(data){
  if(!data._id){
    $scope.error = data;
  }
})


};



});
