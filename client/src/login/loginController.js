angular.module('app').controller('loginController', function($scope, $auth, $state, $stateParams) {


$scope.login = function(username, password){


$auth.login(username, password, $stateParams.last).catch(function(e){
  $scope.error = e;
});


};


});
