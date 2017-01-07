angular.module('app').controller('loginController', function($scope, $auth, $state) {

$scope.login = function(username, password){

$auth.login(username, password).catch(function(e){
  $scope.error = e;
});


};


});
